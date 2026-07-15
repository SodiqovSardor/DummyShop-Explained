# DummyShop — Codebase Explained

This folder has one `.md` file per source file in `src/`, explaining what it does and why. Read them in this order — it's the same order the app actually runs in.

## File structure

```
DummyShop/
├── package.json          # dependencies + scripts
├── public/
│   └── index.html        # the single HTML page, has empty #root div
└── src/
    ├── index.js           # entry point, renders App into #root
    ├── App.jsx             # root component — holds state that decides List vs Detail screen
    ├── ProductList.jsx     # fetches all products, handles loading/error, renders grid of ProductCards
    ├── ProductCard.jsx     # dumb component, shows one product, forwards clicks up
    ├── ProductDetail.jsx   # fetches one product by id, handles loading/error, shows full detail + star rating
    ├── App.css / index.css # styles
    └── reportWebVitals.js, setupTests.js, App.test.js  # CRA boilerplate, not core app logic
```

## Reading order

1. `01-index.js.md` — where the app boots up
2. `02-App.jsx.md` — the root component, holds the "which screen" state
3. `03-ProductList.jsx.md` — the list screen, fetches all products
4. `04-ProductCard.jsx.md` — one product tile in the grid
5. `05-ProductDetail.jsx.md` — the detail screen, fetches one product

## The one sentence to say to your teacher

State lives in `App.jsx`. Data flows **down** to child components as props. User actions (clicks) flow **back up** to `App` as function calls, which update the state and re-render the right screen. That's React's one-way data flow, and this whole app is a small textbook example of it.
# DummyShop-Explained
