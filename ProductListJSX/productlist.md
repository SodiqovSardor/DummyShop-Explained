# `src/ProductList.jsx`

The "list" screen. Fetches every product from the API and renders them as a grid of cards.

```js
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductList({ onProductSelect }) {
```
Receives `onProductSelect` as a prop — this was passed down from `App.jsx`. It's the function to call when the user clicks a product.

```js
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
```
Three states, one for each stage of an API call:
- `products` — the array of results (starts empty)
- `loading` — whether a fetch is currently in progress
- `error` — an error message if something went wrong (starts as `null`, meaning no error)

```js
  function fetchProducts() {
    setLoading(true);
    setError(null);

    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Server xatosi: ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }
```
The actual fetch logic, pulled into its own named function (not written inline) so it can be re-used by a "retry" button, not just on first load.
- Sets `loading` to `true` and clears any old error before starting.
- Calls the DummyJSON API.
- `fetch()` doesn't automatically throw an error on a bad HTTP status (like 404 or 500) — it only rejects on network failure. So `res.ok` is checked manually, and a matching error is thrown if the response wasn't successful.
- On success, `data.products` (the array inside the API's JSON response) is saved into state.
- On failure, the error message is saved into state instead.
- Either way, `loading` is set back to `false` at the end.

```js
  useEffect(() => {
    fetchProducts();
  }, []);
```
Runs `fetchProducts()` once, right after the component first appears on screen. The empty `[]` dependency array means "only run this on mount, never again automatically."

```js
  if (loading) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  if (error) {
    return (
      <div className="status-error">
        <p>Xatolik: {error}</p>
        <button className="btn-retry" onClick={fetchProducts}>
          Qayta urinish
        </button>
      </div>
    );
  }
```
Before rendering the real content, two "early return" checks:
- If still loading, show a loading message and stop there.
- If there was an error, show it along with a retry button that calls `fetchProducts` again.

```js
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductSelect(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
```
If neither loading nor error, render the actual grid: loop over `products` with `.map()` and render one `ProductCard` per item.
- `key={product.id}` — required by React whenever rendering a list, so it can track which item is which.
- `onClick={() => onProductSelect(product.id)}` — when a card is clicked, this calls the function passed down from App, sending that specific product's id up the chain.

**Why this matters:** this is the "data/loading/error" pattern applied to a list of items, and it's the component that connects raw API data to the visual `ProductCard` pieces.
