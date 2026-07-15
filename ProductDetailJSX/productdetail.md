# `src/ProductDetail.jsx`

The "detail" screen. Fetches and displays one specific product, chosen by id.

```js
import { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
```
Same React hooks as before, plus three star icons from the `react-icons` library, used for the rating display.

## The `StarRating` helper component

```js
function StarRating({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <span className="stars">
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
```
A small component defined right inside this file (not its own file, since it's only used here). Converts a numeric rating like `4.6` into star icons:
- `full` — how many whole stars (`Math.floor(4.6)` = `4`)
- `half` — 1 if the leftover decimal is `.5` or more, otherwise 0 (`4.6 - 4 = 0.6 ≥ 0.5` → `1`)
- `empty` — whatever's left out of 5 total stars

`Array(full).fill(null).map(...)` is a common trick to "loop N times" in JSX — you can't `.map()` over a plain number, so an array of `full` empty slots is created first, then mapped over to render that many icons.

## The main `ProductDetail` component

```js
function ProductDetail({ id, onBack }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
```
Receives `id` (which product to show) and `onBack` (function to call to return to the list) as props from `App.jsx`. Same three-state pattern as `ProductList`, except `product` holds a single object instead of an array.

```js
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
  }, [id]);
```
Fetches the single product matching `id`. The key difference from `ProductList`'s effect: the dependency array here is `[id]`, not `[]`. That means this effect re-runs **every time `id` changes** — so if you somehow navigated from one product straight to another, it would automatically re-fetch for the new id.

```js
  if (loading) {
    return <div className="loading">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="status-error">Xatolik: {error}</div>;
  }

  if (!product) {
    return null;
  }
```
Same early-return pattern: show loading, then error, then a `null` render (renders nothing) as a safety net for the split-second where there's no data yet and no error either.

```js
  return (
    <div className="detail">
      <button className="btn-back" onClick={onBack}>← Orqaga</button>

      <div className="detail-layout">
        <div className="detail-gallery">
          <img
            className="detail-main-img"
            src={product.thumbnail}
            alt={product.title}
          />
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
```
The back button calls `onBack` directly — that's the function from `App.jsx` that resets `selectedProductId` to `null`. The gallery shows the main thumbnail, and if the product has more than one image, it also renders a row of smaller thumbnails.

```js
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
```
The right-hand info panel: title, brand/category, price, the `StarRating` component (passing `product.rating` as its prop), and the full description.

**Why this matters:** this component shows the same fetch/loading/error pattern applied to a *single* item instead of a list, and demonstrates re-fetching in response to a changing prop via the `[id]` dependency array.
