# `ProductDetail` — Gallery qismi (`detail-layout` / `detail-gallery`)

```js
  return (
    <div className="detail">
```
`ProductDetail` komponentining asosiy JSX qismi shu yerdan boshlanadi. Tashqi `<div className="detail">` — butun detail sahifasini o'rab turgan konteyner.

```js
      <button className="btn-back" onClick={onBack}>← Orqaga</button>
```
Orqaga qaytish tugmasi. `onClick={onBack}` — bosilganda, `App.jsx`dan prop sifatida kelgan `onBack` funksiyasini (ya'ni `handleGoBack`) to'g'ridan-to'g'ri chaqiradi. Eslatma: bu yerda `() => onBack()` emas, faqat `onBack` deb yozilgan — chunki `onBack` argument talab qilmaydi, shuning uchun uni to'g'ridan-to'g'ri `onClick`ka berish mumkin.

```js
      <div className="detail-layout">
```
Ichki konteyner — sahifani ikkiga bo'lish uchun: chap tomonda galereya (rasmlar), o'ng tomonda ma'lumot (`detail-info`, bu qism keyingi kodda ketadi).

```js
        <div className="detail-gallery">
```
Rasm galereyasi bo'limi boshlanadi.

```js
          <img
            className="detail-main-img"
            src={product.thumbnail}
            alt={product.title}
          />
```
Asosiy (katta) rasm — `product.thumbnail`dan olinadi. `alt={product.title}` — rasm yuklanmasa yoki skrin-rider ishlatilsa, o'rniga mahsulot nomi ko'rsatiladi (accessibility uchun ham muhim).

```js
          {product.images.length > 1 && (
```
Shartli render: agar mahsulotning `images` massivida bittadan ko'p rasm bo'lsa (`length > 1`), shundagina quyidagi blok chiqadi. Agar faqat 1ta yoki 0ta rasm bo'lsa, bu blok umuman render bo'lmaydi — foydasiz bo'sh joy qoldirmaslik uchun.

```js
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
Kichik rasmlar qatori (thumbnail'lar). `product.images` massividagi har bir rasm uchun `.map()` orqali bitta `<img>` chiqariladi:
- `key={index}` — React uchun majburiy identifikator (bu yerda `product.id` kabi noyob ID yo'q, shuning uchun massivdagi o'rni — `index` — ishlatilgan).
- `alt={product.title + ' ' + (index + 1)}` — masalan "iPhone 15 1", "iPhone 15 2" kabi tavsif, har bir rasmni farqlash uchun.

Bu blok yopilgach (`</div>` — `detail-gallery` yopiladi), keyingi qismda `detail-info` (nom, narx, reyting, tavsif) ketadi — bu esa allaqachon tushuntirilgan `StarRating` bilan bog'liq bo'lim.

## Xulosa

Bu qism — mahsulotning rasm galereyasini chiqaradi: bitta katta asosiy rasm + (agar bo'lsa) qo'shimcha kichik rasmlar qatori, hammasi `product` obyektidagi ma'lumotlarga qarab dinamik tarzda quriladi.
