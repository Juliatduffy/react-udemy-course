# React Concepts in the Books App — Study Notes

These notes walk through every React concept used in this project, anchored to the
real code. Files referenced:

- `src/index.js` — app entry point
- `src/App.js` — top-level component, owns the data
- `src/components/BookList.js` — renders the list
- `src/components/BookShow.js` — renders one book (with edit toggle)
- `src/components/BookEdit.js` — the edit form
- `src/components/BookCreate.js` — the "add a book" form

---

## 1. Components

A **component** is a JavaScript function that returns JSX (markup). Every file in
`src/components/` exports one. The whole app is a tree of these functions:

```
App
 ├─ BookList
 │   └─ BookShow  (one per book)
 │       └─ BookEdit  (only when editing)
 └─ BookCreate
```

Rules this project follows:
- A component's name is **PascalCase** (`BookShow`, not `bookShow`). React treats
  lowercase tags as raw HTML and uppercase as components.
- Each component lives in its own file and is the **default export**
  (`export default BookShow;`).

---

## 2. JSX

JSX is the HTML-looking syntax inside the `return`. It's not HTML — it compiles to
JavaScript function calls. Things to notice in this project:

- **`className` instead of `class`** — `class` is a reserved word in JS.
  See `BookShow.js`: `<div className="book-show">`.
- **Self-closing tags** must have the slash: `<img ... />`, `<input ... />`.
- **One root element** — a component returns a single parent element. `App` wraps
  everything in `<div className="app">`.
- **`{ }` embeds JavaScript** into markup (next section).

---

## 3. Embedding JavaScript expressions with `{ }`

Curly braces drop a JS *expression* into JSX. Examples in the code:

- `BookShow.js`: `<h3>{book.title}</h3>` — prints a variable.
- `BookShow.js`: the template-literal `src`:
  ```js
  src={`https://picsum.photos/seed/${book.id}/300/200`}
  ```
  A backtick string with `${book.id}` interpolated, all inside `{ }`.
- `App.js`: `<BookList books={books} ... />` — passing a value down as a prop.

Key idea: `{ }` holds an **expression** (something that produces a value), not a
statement. That's why you can't put a full `if` block there — see conditional
rendering below for the workaround.

---

## 4. Props (passing data down)

**Props** are the arguments a parent passes to a child. Data flows **down** the
tree (parent → child). This is "one-way data flow."

- `App` passes `books` to `BookList`:
  ```js
  <BookList onEdit={editBookById} books={books} onDelete={deleteBookById}/>
  ```
- `BookList` receives them via **destructuring** in its parameter list:
  ```js
  function BookList({books, onDelete, onEdit}) { ... }
  ```
  This is the same as `function BookList(props)` then `props.books`, but pulls the
  fields out by name immediately.
- `BookList` then passes a single `book` plus the callbacks further down to
  `BookShow`, and `BookShow` passes `book` to `BookEdit`.

Props are **read-only** — a child never reassigns its props. To change data, it
calls a function the parent gave it (next section).

---

## 5. Passing functions as props ("lifting state up")

The book data lives in `App` (the single source of truth). But the *buttons* that
change it live in the children. The pattern: the parent defines the function and
hands it down; the child calls it.

- `App` defines `deleteBookById`, `editBookById`, `createBook`.
- It passes them down: `onDelete={deleteBookById}`, `onEdit={editBookById}`,
  `onCreate={createBook}`.
- `BookShow` calls `onDelete(book.id)` when the Delete button is clicked.
- `BookEdit` calls `onSubmit(book.id, title)` when the form submits, which
  ultimately runs `App`'s `editBookById`.

This is called **lifting state up**: state lives high in the tree, and children
trigger changes by calling callbacks. The child doesn't know *how* the data
changes — it just reports "the user clicked delete on this id."

Naming convention seen here: the prop the child receives starts with **`on`**
(`onDelete`), and the child's internal handler starts with **`handle`**
(`handleDeleteClick`).

---

## 6. State with `useState`

**State** is data that changes over time and, when it changes, causes the
component to re-render. `useState` is a **Hook** that gives a component memory.

- `App.js`: `const [books, setBooks] = useState([]);`
  - `books` — the current value (starts as an empty array `[]`).
  - `setBooks` — the only correct way to change it.
  - Array destructuring: `useState` returns `[value, setter]`.
- `BookShow.js`: `const [showEdit, setShowEdit] = useState(false);` — a boolean
  flag tracking whether the edit form is visible.
- `BookEdit.js`: `const [title, setTitle] = useState(book.title);` — initialized
  *from a prop* (the book's current title).
- `BookCreate.js`: `const [inputValue, setInputValue] = useState("");`

Critical rules:
- **Never mutate state directly** (`books.push(...)` is wrong). Always call the
  setter with a *new* value. That's why `App` builds new arrays with `.map()`,
  `.filter()`, and spread `[...books, newBook]`.
- Calling the setter **schedules a re-render** with the new value.

---

## 7. Toggling state

`BookShow.js` flips a boolean to show/hide the edit form:

```js
const handleEditClick = () => {
    setShowEdit(!showEdit);
};
```

`!showEdit` is the opposite of the current value, so each click toggles between
showing the title and showing `<BookEdit>`.

---

## 8. Conditional rendering

You can't put an `if` statement directly inside JSX, so the project assigns JSX to
a **variable** and reassigns it conditionally. From `BookShow.js`:

```js
let content = <h3>{book.title}</h3>;   // default: just show the title
if (showEdit) {
    content = <BookEdit onSubmit={handleSubmit} book={book} />;  // editing mode
}
// ...later in the return:
{content}
```

Because JSX is just a value, you can store it in a variable, swap it, and drop it
into the markup with `{content}`. This is one of several conditional-rendering
styles (others: ternary `{cond ? a : b}`, or `{cond && <X/>}`).

---

## 9. Rendering lists with `.map()` and `key`

To render an array of data as an array of components, use `.map()`. From
`BookList.js`:

```js
const renderedBooks = books.map((book) => {
    return <BookShow onEdit={onEdit} key={book.id} book={book} onDelete={onDelete} />;
});
return <div className="book-list">{renderedBooks}</div>;
```

- `.map()` turns each data object into a component.
- **`key={book.id}`** — every item in a rendered list needs a unique, stable
  `key`. React uses it to track which items changed/added/removed so it can update
  the DOM efficiently. Use a real id, **not** the array index when items can be
  added/removed/reordered.

---

## 10. Event handling

React events are camelCase props that take a function:

- **Clicks** — `BookShow.js`: `<button onClick={handleDeleteClick}>`.
  Note: you pass the function *reference* (`handleDeleteClick`), not a call
  (`handleDeleteClick()`), or it would run immediately on render.
- **Form submit** — `BookCreate.js` / `BookEdit.js`: `<form onSubmit={handleSubmit}>`.
- **Input typing** — `<input onChange={handleChange} />`.

---

## 11. Controlled components (forms)

A **controlled input** is one whose value is driven by React state, not the DOM.
The pattern (from `BookCreate.js`):

```js
const [inputValue, setInputValue] = useState("");

const handleChange = (e) => {
    setInputValue(e.target.value);   // state follows what the user types
};

<input value={inputValue} onChange={handleChange} />
```

- `value={inputValue}` — the input always *displays* the state.
- `onChange` — every keystroke updates the state, which re-renders with the new
  value.

This loop (type → onChange → setState → re-render → new value shown) keeps React
state as the single source of truth. `BookEdit.js` does the same with `title`.

> ⚠️ Bug currently in `BookCreate.js`: `handleChange(e)` reads `event.target.value`
> instead of `e.target.value`. The parameter is named `e`, so it should be
> `e.target.value`.

---

## 12. `event.preventDefault()`

By default an HTML form submit **reloads the page**. In a single-page React app you
almost never want that. Both forms stop it:

```js
const handleSubmit = (e) => {
    e.preventDefault();   // stop the full-page reload
    onCreate(inputValue);
};
```

---

## 13. Immutable state updates (map / filter / spread)

Because you must never mutate state, `App.js` always produces a **new** array:

- **Edit** — `.map()` returns a new array, replacing the one matching book:
  ```js
  const updated = books.map((book) => {
      if (book.id === id) {
          return { ...book, title: newTitle };  // copy book, overwrite title
      }
      return book;  // leave others unchanged
  });
  setBooks(updated);
  ```
  `{ ...book, title: newTitle }` spreads the old book's fields, then overrides
  `title`.
- **Delete** — `.filter()` returns a new array without the matching book:
  ```js
  const updated = books.filter((book) => book.id !== id);
  setBooks(updated);
  ```
- **Create** — spread builds a new array with the new book appended:
  ```js
  [...books, response.data]
  ```

---

## 14. Side effects with `useEffect`

`useEffect` runs code *after* render, for things outside React's render cycle —
here, fetching data when the app first loads. From `App.js`:

```js
const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
};

useEffect(() => { fetchBooks() }, []);
```

- First argument: the effect function to run.
- Second argument: the **dependency array**. `[]` (empty) means "run **once**, after
  the first render" — perfect for an initial data load.
- Note the effect itself isn't `async`; it calls a separate async function. An
  effect's callback must not return a Promise (it may only return a cleanup
  function), so the async work is wrapped.

---

## 15. Async data fetching with axios

`axios` is an HTTP client. The app talks to a local `json-server` REST API at
`http://localhost:3001/books`:

- **GET** all books — `axios.get(...)` in `fetchBooks`.
- **POST** a new book — `axios.post(url, { title })` in `createBook`. The created
  record (with its server-assigned `id`) comes back as `response.data`.
- Responses are accessed via `response.data`.
- `async`/`await` pauses until the request resolves, so `response` holds the result.

> ⚠️ Bug currently in `App.js` `createBook`: `updatedBooks = [...]` is missing
> `const`, so it throws in strict mode. Should be `const updatedBooks = [...]`.

---

## 16. The entry point: `ReactDOM.createRoot`

`src/index.js` is where React attaches to the page:

```js
const el = document.getElementById('root');   // a <div id="root"> in index.html
const root = ReactDOM.createRoot(el);          // React 18+/19 root API
root.render(<App/>);                            // render the whole tree into it
```

- `createRoot` is the modern (React 18+) rendering API; this project is on
  **React 19**.
- `import './index.css'` pulls global styles in via the bundler (Vite).
- `<App/>` is the root of the component tree — everything else hangs off it.

---

## 17. Tooling around React (context, not React itself)

- **Vite** — the dev server / bundler (`@vitejs/plugin-react`). It's why imports
  like `import './index.css'` and JSX work.
- **json-server** — a fake REST backend serving the books from a JSON file, so you
  can practice real HTTP calls without writing a backend.
- **ESLint + react-hooks plugin** — lints for mistakes, including the
  **Rules of Hooks** (e.g. don't call `useState`/`useEffect` conditionally or
  inside loops).

---

## Quick reference: concept → where to see it

| Concept                        | File(s) |
|--------------------------------|---------|
| Components & default export    | every component file |
| JSX / `className` / `{ }`      | `BookShow.js`, `App.js` |
| Props (destructured)           | `BookList.js`, `BookShow.js`, `BookEdit.js` |
| Functions as props (lift up)   | `App.js` → children |
| `useState`                     | `App.js`, `BookShow.js`, `BookEdit.js`, `BookCreate.js` |
| Toggling state                 | `BookShow.js` |
| Conditional rendering          | `BookShow.js` |
| `.map()` + `key`               | `BookList.js` |
| Event handlers (`onClick`)     | `BookShow.js` |
| Controlled inputs              | `BookCreate.js`, `BookEdit.js` |
| `preventDefault`               | `BookCreate.js`, `BookEdit.js` |
| Immutable updates (map/filter/spread) | `App.js` |
| `useEffect` (run once)         | `App.js` |
| axios GET / POST               | `App.js` |
| `createRoot` entry point       | `index.js` |

---

## A few practice exercises

1. **Reps on immutability:** without looking, write the `editBookById` function
   from scratch using `.map()` and the spread operator. Why can't you just do
   `book.title = newTitle; setBooks(books);`?
2. **Dependency array:** what would happen if you changed `useEffect(..., [])` to
   `useEffect(..., [books])`? Trace the render → effect → setState loop.
3. **Controlled input:** explain out loud why removing `value={inputValue}` from the
   input would "break" the controlled pattern, and what the input would do instead.
4. **Fix the two bugs** noted above (`createBook`'s missing `const`, and
   `BookCreate`'s `event` vs `e`) and explain why each one slips past the compiler.
