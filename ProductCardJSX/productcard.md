# `src/ProductCard.jsx`

The smallest and simplest component in the app. One product = one card.

```js
function ProductCard({ product, onClick }) {
```
Takes two props: `product` (the data to display) and `onClick` (a function to call when this card is interacted with). This component has **no state of its own** — it's a "dumb" / presentational component. It just displays what it's given and reports back when something happens.

```js
  return (
    <div
      className="card"
      onClick={() => onClick(product.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(product.id);
        }
      }}
    >
```
The outer wrapper. Two ways to "activate" the card:
- `onClick` — normal mouse click, calls `onClick(product.id)`.
- `onKeyDown` — if the card is focused (via keyboard Tab) and the user presses Enter or Space, it does the same thing.

`role="button"` and `tabIndex={0}` exist because a plain `<div>` isn't a real button — browsers don't make it keyboard-focusable or announce it as clickable to screen readers by default. These three additions are an accessibility (a11y) fix, so keyboard-only users can use the card the same way mouse users can.

```js
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
      </div>
```
The product image. `loading="lazy"` tells the browser to skip downloading this image until it's about to scroll into view — a small performance optimization for pages with many cards.

```js
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
```
Displays the product's title and price. Nothing computed here — just pulling fields straight off the `product` object that was passed in.

**Why this matters:** it's a good example of separating concerns — `ProductList` handles *fetching* data, `ProductCard` only handles *displaying* one item and *reporting clicks*. This split makes each file easy to reason about on its own.
