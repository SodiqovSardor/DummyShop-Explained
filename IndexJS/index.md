# `src/index.js`

The entry point of the whole app. This is the first JS file that actually runs.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
```
Imports React itself, the `ReactDOM` library (which knows how to put React components into an actual HTML page), the global stylesheet, and the root `App` component.

```js
const root = ReactDOM.createRoot(document.getElementById('root'));
```
Finds the empty `<div id="root">` sitting in `public/index.html` and tells React "this is the container you're allowed to control."

```js
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
Renders `<App />` inside that div. `React.StrictMode` is a dev-only wrapper that helps catch bugs early (it double-invokes some functions in development to surface side-effect mistakes) — it does nothing in production and has no effect on what the user sees.

```js
reportWebVitals();
```
Create React App boilerplate for measuring performance metrics (like load time). Not custom app logic — safe to skip when explaining the app itself.

**Why this file matters:** it's the bridge between the plain HTML page and the React component tree. Without it, `<App />` is just a JS function that never gets shown anywhere.
