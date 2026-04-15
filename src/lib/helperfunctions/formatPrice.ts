export default function formatPrice(
  price: number,
  locale = "en-US",
  currency = "EGB",
) {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    price,
  );
}
