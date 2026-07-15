# `StarRating` komponenti (`ProductDetail.jsx` ichida)

```js
function StarRating({ rating }) {
```
Bu — alohida, kichik komponent. `ProductDetail.jsx` fayli ichida yozilgan (o'ziga alohida fayl ajratilmagan, chunki faqat shu yerda ishlatiladi). `rating` degan bitta prop qabul qiladi — masalan `4.6` kabi son.

```js
  const full = Math.floor(rating);
```
`Math.floor()` — sonni pastga qarab yaxlitlaydi (kasr qismini tashlab yuboradi). Masalan `rating = 4.6` bo'lsa, `full = 4`. Bu — to'liq (to'lgan) yulduzlar soni.

```js
  const half = rating - full >= 0.5 ? 1 : 0;
```
Qolgan kasr qismini hisoblaydi: `rating - full`. Bizning misolimizda `4.6 - 4 = 0.6`. Agar bu qoldiq `0.5`dan katta yoki teng bo'lsa — demak yarim yulduz kerak, `half = 1`. Aks holda `half = 0` (yarim yulduz kerak emas).

```js
  const empty = 5 - full - half;
```
Jami 5ta yulduz joyi bor (chunki reyting odatda 5 ballik shkalada). Shundan to'liq va yarim yulduzlar sonini ayirib tashlasak, qolgani — bo'sh yulduzlar soni. Bizning misolda: `5 - 4 - 1 = 0`.

Ya'ni `rating = 4.6` uchun: `full=4, half=1, empty=0` — ya'ni 4ta to'liq yulduz + 1ta yarim yulduz + 0ta bo'sh yulduz = jami 5ta.

```js
  return (
    <span className="stars">
```
Endi bu hisob-kitobga qarab, ekranga real yulduzcha ikonkalarini chizish boshlanadi.

```js
      {Array(full).fill(null).map((_, i) => (
        <FaStar key={i} className="star star--full" />
      ))}
```
Bu qator — "N marta takrorlash" trikidan foydalanadi:
- `Array(full)` — `full` o'lchamdagi bo'sh massiv yaratadi (masalan `full=4` bo'lsa, 4ta bo'sh joy).
- `.fill(null)` — har bir joyni `null` bilan to'ldiradi (React'ning `.map()` ishlashi uchun massiv elementlari bo'lishi shart).
- `.map((_, i) => ...)` — shu 4ta elementning har biriga bitta `<FaStar />` (to'liq yulduz ikonkasi) chiqaradi. Bu yerda elementning o'zi (`_`) kerak emas, faqat indeks (`i`) `key` sifatida ishlatilyapti.

```js
      {half === 1 && <FaStarHalfAlt className="star star--half" />}
```
Agar `half === 1` bo'lsa (ya'ni yarim yulduz kerak bo'lsa), bitta `<FaStarHalfAlt />` (yarim to'lgan yulduz ikonkasi) chiqadi. `&&` operatori — JSX'da shartli render qilishning eng sodda usuli: chap tomon `true` bo'lsa, o'ng tomondagi element chiqadi.

```js
      {Array(empty).fill(null).map((_, i) => (
        <FaRegStar key={i} className="star star--empty" />
      ))}
```
Xuddi birinchi qatorga o'xshab, endi `empty` sondagi bo'sh (kontursiz) yulduz ikonkalari chiqadi.

```js
      <span className="star-number"> {rating}</span>
    </span>
  );
}
```
Va nihoyat, yulduzlar yonida asl sonli reyting ham matn sifatida ko'rsatiladi (masalan " 4.6").

## Xulosa

Bu funksiya oddiy matematik hisob-kitob (nechta to'liq, nechta yarim, nechta bo'sh yulduz kerakligini aniqlash) va shu hisobga qarab mos ikonkalarni tsiklda chiqarish orqali ishlaydi — real UI kutubxonalarida (masalan onlayn-do'konlarda) ishlatiladigan klassik "star rating" pattern shu.
