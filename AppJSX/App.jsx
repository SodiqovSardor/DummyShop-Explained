import { useState } from 'react';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import './App.css';

function App() {
  // The ONE piece of state that controls which screen is shown.
  // null            -> show the product list
  // an actual id    -> show the detail page for that product
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Called by ProductList (via ProductCard) when a product is clicked.
  // Sets the state to that product's id -> triggers the detail screen.
  function handleProductSelect(id) {
    setSelectedProductId(id);
  }

  // Called by ProductDetail's back button.
  // Resets the state to null -> triggers the list screen again.
  function handleGoBack() {
    setSelectedProductId(null);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>DummyShop</h1>
      </header>

      <main className="app-main">
        {/*
          Simple ternary acting as a mini "router" — no router library needed
          for an app this small. Only one of these two components is ever
          rendered at a time.
        */}
        {selectedProductId === null ? (
          // Pass handleProductSelect down as a prop named onProductSelect,
          // so ProductList can report clicks back up to App.
          <ProductList onProductSelect={handleProductSelect} />
        ) : (
          // Pass the selected id down so ProductDetail knows what to fetch,
          // and handleGoBack down as onBack so it can return to the list.
          <ProductDetail id={selectedProductId} onBack={handleGoBack} />
        )}
      </main>
    </div>
  );
}

export default App;
