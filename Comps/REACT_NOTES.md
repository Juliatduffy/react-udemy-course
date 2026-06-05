# React Concepts in the Comps App — Study Notes

These notes walk through every React concept used in this project, anchored to the
real code. Unlike the Books app (which was about state and data), **Comps is about
building one reusable, configurable UI component** — a styled `<Button>` — and the
patterns that make it flexible. Files referenced:

- `src/index.js` — app entry point
- `src/App.js` — top-level component, shows the Button in many configurations
- `src/Button.js` — the reusable Button component (the star of the project)

---

## 1. Reusable components (the whole point of "Comps")

A **reusable component** is one you write once and drop in many times with
different settings. `Button.js` is used **five times** in `App.js`, each time
looking different:

```js
<Button secondary outline rounded onClick={handleClick}> ... </Button>
<Button danger outline> ... </Button>
<Button warning>See Deal!</Button>
<Button secondary outline> ... </Button>
<Button primary rounded> ... </Button>
```

Same component, different **props** → different appearance. This is the core idea
of a component library: one well-designed component covers many cases instead of
copy-pasting a `<button>` with different classes everywhere.

---

## 2. The `children` prop

Whatever you put **between** a component's opening and closing tags arrives as a
special prop called `children`. In `Button.js`:

```js
function Button({ children, ... }) {
  return <button {...rest} className={classes}>{children}</button>;
}
```

So when `App.js` writes:

```js
<Button warning>See Deal!</Button>
```

the text `"See Deal!"` becomes `children`, and the Button renders it inside the
real `<button>`. `children` can be plain text **or** other JSX — notice the first
button passes an icon *and* text:

```js
<Button secondary outline rounded onClick={handleClick}>
  <LuCat/>
  Click me!!
</Button>
```

Both the `<LuCat/>` icon and the text are bundled into `children` together.

---

## 3. Boolean props (flags)

When you write a prop with **no value**, its value is `true`. These are "flags":

```js
<Button danger outline>   // danger === true, outline === true
```

is shorthand for:

```js
<Button danger={true} outline={true}>
```

The Button declares them in its destructured parameter list:

```js
function Button({ children, primary, secondary, success, warning, danger, outline, rounded, ...rest }) {
```

Each flag is just a `true`/`undefined` boolean the component checks to decide which
styles to apply. This is the **variant pattern** — one prop per "look."

---

## 4. The `...rest` parameter (collecting leftover props)

`...rest` in the destructuring gathers **every prop you didn't name** into one
object:

```js
function Button({ children, primary, /* ...the named ones... */, ...rest }) {
```

If `App.js` passes `onClick={handleClick}` or `className={"mb-5"}`, those weren't
pulled out by name, so they land in `rest` as `{ onClick: handleClick, className: "mb-5" }`.

---

## 5. The `...rest` spread (forwarding props through)

Then `...rest` is **spread** back onto the real `<button>`:

```js
return <button {...rest} className={classes}>{children}</button>;
```

`{...rest}` means "take every key in `rest` and apply it as an attribute." So
`onClick` reaches the actual DOM button, even though `Button` never mentioned
`onClick` by name. This is the **pass-through pattern**: your wrapper component
forwards any standard button attribute (`onClick`, `disabled`, `type`, …) without
having to list them all.

> Note the order: `{...rest}` comes **first**, then `className={classes}`. That way
> the component's own computed `className` wins and isn't accidentally overwritten
> by a `className` inside `rest`. (See section 7 for how that one is merged in.)

---

## 6. The `classnames` library (conditional CSS classes)

`classnames` (imported here as `className`) builds a class string from conditions.
You give it strings and an object; each object key is added **only when its value
is truthy**:

```js
className("px-3 py-1.5 border", {
  "border-blue-500 bg-blue-500 text-white": primary,
  "border-gray-900 bg-gray-900 text-white": secondary,
  "rounded-full": rounded,
  "bg-white": outline,
  "text-blue-500": outline && primary,   // both must be true
  ...
})
```

- `"px-3 py-1.5 border"` — always applied (base styles).
- `"...": primary` — applied only if `primary` is true.
- `"text-blue-500": outline && primary` — combined condition: an outline button
  that is *also* primary gets blue text. This is how `outline` "recolors" each
  variant instead of needing a whole separate set of props.

Without this library you'd be doing messy string concatenation with ternaries.

> Naming gotcha in this file: the import is renamed `className`
> (`import className from "classnames"`), which is confusingly also the name of a
> JSX attribute. Many people import it as `cx` or `classNames` to avoid confusion.

---

## 7. `tailwind-merge` (resolving conflicting Tailwind classes)

Tailwind classes can **conflict** — e.g. `bg-blue-500` and `bg-white` both set the
background. If both end up in the string, whichever CSS rule loads last wins, which
is unpredictable. `twMerge` fixes that by keeping only the **last** conflicting
class:

```js
const classes = twMerge(
  className("px-3 py-1.5 border", { ... }, rest.className)
);
```

- `className(...)` first builds the full (possibly conflicting) class string.
- `twMerge(...)` then dedupes conflicts so the intended one wins.
- `rest.className` is passed **into** `classnames` so a caller-supplied class (like
  `"mb-5"` from `App.js`) gets merged in too, and `twMerge` lets that custom class
  override the defaults cleanly.

This is the standard combo for reusable Tailwind components: **classnames to build,
tailwind-merge to resolve.**

---

## 8. Custom prop validation (`propTypes`)

The Button enforces a rule: **only one color variant at a time**. You shouldn't be
able to write `<Button primary secondary>`. A custom validator on `Button.propTypes`
counts how many color flags are true:

```js
Button.propTypes = {
  checkVariationValue: ({ primary, secondary, success, warning, danger }) => {
    const count =
      Number(!!primary) + Number(!!secondary) + Number(!!warning) +
      Number(!!success) + Number(!!danger);

    if (count > 1) {
      return new Error("Only one of primary, secondary, success, warning, danger can be true");
    }
  },
};
```

- `!!primary` turns a value into a real boolean; `Number(true)` is `1`, `Number(false)` is `0`.
- Adding them counts how many variants are on.
- Returning an `Error` makes React log a console warning in development.

> Two things to know: (1) this uses the `prop-types` package (a dependency here),
> the old standard before TypeScript. (2) `success` is missing from the `count`
> sum — a small bug; it's destructured but not added in.

---

## 9. `react-icons` (icons as components)

Icons are imported as **components** and dropped into JSX like any other tag:

```js
import { LuCat } from "react-icons/lu";       // Lucide icon set
import { FaBluesky } from "react-icons/fa6";   // Font Awesome 6 set

<LuCat/>
<FaBluesky/>
```

Each icon is just a React component that renders an `<svg>`. Because they're
components, they're passed as `children` into the Button and styled by inherited
text color (so `text-white` on the button colors the icon too).

---

## 10. The entry point (no `<React.StrictMode>` here)

`src/index.js` is the same `createRoot` pattern as other projects:

```js
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- This project is on **React 18** (`react: 18.3.1`), still using the `createRoot`
  API introduced in React 18.
- Note `<App />` is rendered **without** a `<React.StrictMode>` wrapper here — some
  starters include it, this one doesn't.

---

## Quick reference: concept → where to see it

| Concept                          | File(s) |
|----------------------------------|---------|
| Reusable component, used 5 ways  | `App.js` |
| `children` prop                  | `Button.js`, `App.js` |
| Boolean / flag props             | `App.js` (`danger outline`) |
| `...rest` collecting props       | `Button.js` (param list) |
| `...rest` spreading / forwarding | `Button.js` (`<button {...rest}>`) |
| `classnames` conditional classes | `Button.js` |
| `tailwind-merge` (twMerge)       | `Button.js` |
| Custom `propTypes` validation    | `Button.js` |
| `react-icons` as components      | `App.js` |
| `createRoot` entry point         | `index.js` |

---

## A few practice exercises

1. **Pass-through pattern:** explain out loud why `onClick` from `App.js` reaches
   the real `<button>` even though `Button.js` never destructures `onClick`. Which
   piece of code carries it through?
2. **Order matters:** what would break if you wrote
   `<button className={classes} {...rest}>` (rest *after* className) and a caller
   passed their own `className`? Trace which class string wins.
3. **classnames by hand:** without the library, rewrite the `primary` and
   `rounded` part of the class string using template literals and ternaries. Notice
   how much messier it gets — that's the value classnames adds.
4. **Fix the validator bug:** `success` is destructured but left out of the `count`
   sum in `checkVariationValue`. Add it, then test by rendering
   `<Button success primary>` and watching the console warning appear.
5. **Add a variant:** add an `info` flag (e.g. cyan styling) end-to-end — the
   destructured param, the `classnames` entries (including the `outline && info`
   text color), and the validator count.
