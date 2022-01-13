export function calculateTotal(products, cart) {
  let total = 0;
  cart.forEach((arr) => {
    let requiredProduct = products.filter(
      (product) => product.id == arr.productId
    )[0];
    total = total + requiredProduct.price * arr.count;
  });
  total = total.toFixed(2);
  return total;
}
