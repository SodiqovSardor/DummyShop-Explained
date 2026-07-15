import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

// Small helper component, defined in this file since it's only used here.
// Converts a numeric rating (e.g. 4.6) into full/half/empty star icons.
function StarRating({ rating }) {
  const full = Math.floor(rating);                 // whole stars, e.g. 4
  const half = rating - full >= 0.5 ? 1 : 0;         // 1 if leftover >= .5
  const empty = 5 - full - half;                     // remaining out of 5

  return (
    <span className="stars">
      {/* Array(full).fill(null).map(...) is a common trick to "loop N
          times" in JSX, since you can't .map() over a plain number. */}
      {Array(full).fill(null).map((_, i) => (
        <FaStar key={i} className="star star--full" />
      ))}
      {half === 1 && <FaStarHalfAlt className="star star--half" />}
      {Array(empty).fill(null).map((_, i) => (
        <FaRegStar key={i} className="star star--empty" />
      ))}
      <span className="star-number"> {rating}</span>
    </span>
  );
}

// Receives id (which product to show) and onBack (return-to-list function)
// as props from App.jsx.
function ProductDetail({ id, onBack }) {
  // Same three-state API pattern as ProductList, except product is a
  // single object here instead of an array.
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('https://dummyjson.com/products/' + id)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Server xatosi: ' + res.status);
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    // Dependency array is [id], not [] — this effect re-runs every time
    // the id prop changes, so switching products re-fetches automatically.
  }, [id]);

  if (loading) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="status-error">Xatolik: {error}</div>;
  }

  // Safety net for the brief moment there's no data and no error yet.
  if (!product) {
    return null;
  }

  return (
    <div className="detail">
      {/* Calls onBack directly — the function from App.jsx that resets
          selectedProductId back to null and returns to the list. */}
      <button className="btn-back" onClick={onBack}>← Orqaga</button>

      <div className="detail-layout">
        <div className="detail-gallery">
          <img
            className="detail-main-img"
            src={product.thumbnail}
            alt={product.title}
          />
          {/* Only show the extra thumbnail row if there's more than one image */}
          {product.images.length > 1 && (
            <div className="detail-thumbs">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={product.title + ' ' + (index + 1)}
                  className="detail-thumb"
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-info">
          <h2>{product.title}</h2>
          <p className="detail-brand">{product.brand} — {product.category}</p>
          <p className="detail-price">${product.price}</p>
          <StarRating rating={product.rating} />
          <p className="detail-desc">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
