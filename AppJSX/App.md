# `src/App.jsx`

The root component. This is the "brain" of the app — the most important file to understand conceptually, even though it's short.

```js
import { useState } from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import './App.css';
```
Imports React's `useState` hook (lets a component remember a value across renders) and the two "screen" components this app switches between.

```js
function App() {
  const [selectedProductId, setSelectedProductId] = useState(null);
```
Declares **one piece of state**: `selectedProductId`. This single variable controls which screen is currently shown. It starts as `null`, meaning "no product selected yet."

```js
  function handleProductSelect(id) {
    setSelectedProductId(id);
  }

  function handleGoBack() {
    setSelectedProductId(null);
  }
```
Two functions that update that state, for two different purposes:
- `handleProductSelect(id)` — called when a product card is clicked. Sets the state to that product's id, e.g. `5`.
- `handleGoBack()` — called from the back button on the detail page. Always resets the state to `null`.

Both functions do the same underlying action (`setSelectedProductId(...)`) with different values — one sets it to *something*, the other resets it to *nothing*.

```js
  return (
    <div className="app">
      <header className="app-header">
        <h1>DummyShop</h1>
      </header>

      <main className="app-main">
        {selectedProductId === null ? (
          <ProductList onProductSelect={handleProductSelect} />
        ) : (
          <ProductDetail id={selectedProductId} onBack={handleGoBack} />
        )}
      </main>
    </div>
  );
}

export default App;
```
The actual "routing" logic — a plain ternary, no router library needed for an app this small:
- `selectedProductId === null` → render `<ProductList />`, and hand it `handleProductSelect` as a prop called `onProductSelect` (so ProductList can tell App when something's clicked).
- otherwise → render `<ProductDetail />`, passing the selected `id` and `handleGoBack` as `onBack`.

**Why this matters:** App doesn't fetch any data itself. It only owns *which screen is active* and gives the child components the tools (functions) to change that. This is the "lift state up, pass handlers down" pattern — a core React idea.
