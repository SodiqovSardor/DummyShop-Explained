// "Dumb" / presentational component — no state of its own.
// It only displays what it's given (product) and reports clicks (onClick).
function ProductCard({ product, onClick }) {
  return (
    <div
      className="card"
      // Normal mouse click -> forward the product's id up to the parent.
      onClick={() => onClick(product.id)}
      // The next three props are an accessibility (a11y) fix: a plain <div>
      // isn't focusable or announced as clickable by default, so we add:
      role="button"      // tells assistive tech this div acts like a button
      tabIndex={0}        // makes it reachable via Tab key
      onKeyDown={(e) => {
        // Let keyboard users "click" via Enter or Space too.
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(product.id);
        }
      }}
    >
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy" // browser skips downloading until it's near the viewport
        />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">
          <span className="price-badge">${product.price}</span>
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
