import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Receives onProductSelect as a prop from App.jsx — the function to call
// when the user clicks a product.
function ProductList({ onProductSelect }) {
  // Three states covering the three stages of any API call:
  const [products, setProducts] = useState([]);   // the fetched data
  const [loading, setLoading] = useState(false);   // is a fetch in progress?
  const [error, setError] = useState(null);        // error message, if any

  // Pulled into its own named function (instead of writing it inline inside
  // useEffect) so the "retry" button below can call it again on failure.
  function fetchProducts() {
    setLoading(true);
    setError(null);

    fetch('https://dummyjson.com/products')
      .then((res) => {
        // fetch() does NOT throw on a bad HTTP status (like 404/500) —
        // it only rejects on a network failure. So res.ok must be checked
        // manually and a matching error thrown ourselves.
        if (!res.ok) {
          throw new Error('Server xatosi: ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        // The DummyJSON API wraps the array inside a "products" field.
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  // Empty dependency array [] -> this effect runs ONCE, right after the
  // component first mounts. It will not run again automatically.
  useEffect(() => {
    fetchProducts();
  }, []);

  // Early returns: show one screen at a time depending on current state.
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

  // If we get here, loading is false and there's no error -> render the grid.
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id} // required by React to track list items
          product={product}
          // When this card is clicked, tell App (via the prop it gave us)
          // which product id was selected.
          onClick={() => onProductSelect(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductList;
