# React Projects

I am following the "Modern React with Redux" course from Stephen Grider. This repo contains a collection of small React apps from the course. 

## How to run any project

```bash
cd  <project name>
npm install
npm start
```

Then run locally at `http://localhost:3000`.

---

## Projects 

### 1. IntroProject

**Concepts:** project architecture and setup.

The most basic project. A single `index.js` walks through how React takes control of a DOM element and renders one `App` component to the screen. 

### 2. Props 

**Concepts:** props, reusable components, importing images as modules, styling
with Bulma.

Renders profile cards for voice assistants (Alexa, Siri). The `App` component
passes a `title`, `user`, and `image` as props into a reusable `ProfileCard`
component, showing how the same component renders different data.

### 3. Animals 

**Concepts:** the `useState` hook, event handlers , rendering listscwith `.map()`, the `key` prop.

Click a button to add a random animal to the page. Each click updates state with
a new animal, and the list re-renders. Each `AnimalShow` also has its own local
state (clicking a heart grows it), demonstrating independent component state.

### 4. ImageSearch 

**Concepts:** async data fetching with `axios`, passing
callbacks between components (child → parent communication), controlled form
input.

A `SearchBar` takes a search term and calls back up to `App`, which requests
images from an external API (`api.js`) and stores the results in state. The
`ImageList` component then renders the returned images.

### 5. Comps 

**Concepts:** building flexible and reusable components, `prop-types` for type
checking, conditional class names `classnames`, Tailwind
CSS and Tailwind merge, page-based organization, ...rest syntax, more conditional rendering.

A mini component library with `Button`, `Accordion`, `Dropdown`, `Panel`, each
with its own demo page. Emphasizes designing components that accept many props
and reusing them consistently across pages.

The `Counter` component also demonstrates the `useReducer` hook. Instead of
juggling several `useState` calls, all of the counter's state (`count` and
`valueToAdd`) lives in one object, and every update goes through a single
`reducer` function. Components dispatch plain action objects (like
`{ type: INCREMENT_COUNT }`), and the reducer's `switch` statement decides how
state changes for each action type. The reducer is wrapped with `produce` from
**Immer**, which lets you write what looks like mutating code
(`state.count = state.count - 1`) while Immer safely produces a new immutable
state behind the scenes.

### 6. Books 

**Concepts:** CRUD app with the Context API, custom hooks,
`useContext`, talking to a fake backend with `json-server` and `axios`.

A book list app where you can add, edit, and delete books that persist to a local `json-server` database (stored in `db.json`). Book data and the functions to change it live in a `BooksContext` (`context/books.js`) and are
consumed via a custom `useBooksContext` hook, so any component can read or update
books without passing props down through every level.

**Note:** To run this, you must start up the fake server alongside Vite:

> ```bash
> npx json-server --watch db.json --port 3001
> ```

### 7. Cars

**Concepts:** global state management with **Redux Toolkit**, `configureStore`,
`createSlice`, `useSelector` and `useDispatch`, the `<Provider>` component,
derived state.

A car-tracking app where you add cars (name + cost), search/filter them, and see
a running total cost. Instead of the Context API, state is managed by a central
Redux **store** (`store/index.js`) built from two **slices**: a `carsSlice` (the
list of cars and the search term) and a `formSlice` (the add-car form inputs).
Each slice (`createSlice`) bundles its starting state together with the reducer
functions that change it, and automatically generates **action creators** like
`addCar` and `removeCar` — and like Comps' counter, slices use Immer under the
hood, so the reducers can "mutate" state directly (`state.data.push(...)`).

Components connect to the store with two hooks from `react-redux`: `useSelector`
reads a slice of state (e.g. `CarValue` selects all cars, filters by the search
term, and `reduce`s them into a total cost — a value *derived* from state rather
than stored), while `useDispatch` sends actions to update it. The whole app is
wrapped in `<Provider store={store}>` so every component can reach the store.

---

## Concept summary

| Project       | Core concept(s) added                          |
|---------------|------------------------------------------------|
| IntroProject  | Components, JSX, rendering                      |
| Props         | Props, reusable components                      |
| Animals       | `useState`, events, lists & keys                |
| ImageSearch   | API fetching, async, child→parent callbacks     |
| Comps         | Configurable components, prop-types, Tailwind, `useReducer` + Immer |
| Books         | Context API, custom hooks, full CRUD, json-server |
| Cars          | Redux Toolkit, slices, `useSelector`/`useDispatch`, derived state |
