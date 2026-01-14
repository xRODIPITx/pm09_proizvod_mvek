import { useState } from "react";

export default function ProductCart({
  id,
  image,
  header,
  price,
  setCart,
  setCartPrice,
  setCartQty,
}) {
  const [qty, setQty] = useState(1);

  function deleteCart() {
    setCart((current) => current.filter((product) => product.id !== id));
    setCartPrice((current) => current - price * qty);
    setCartQty((current) => current - qty);
  }

  function plus() {
    setQty((current) => current + 1);
    setCartPrice((current) => current + price);
    setCartQty((current) => current + 1);
  }

  function minus() {
    if (qty > 1) {
      setQty((current) => current - 1);
      setCartPrice((current) => current - price);
      setCartQty((current) => current - 1);
    }
  }

  return (
    <div className="ProductCart">
      <img src={image} alt="Изображение товара" />
      <h1>{header}</h1>
      <p>{price} рублей</p>
      <button className="del" onClick={() => deleteCart()}>
        Удалить
      </button>
      <div className="cartQty">
        <button className="minus" onClick={() => minus()}>
          -
        </button>
        <p className="qty">{qty}</p>
        <button className="plus" onClick={() => plus()}>
          +
        </button>
      </div>
    </div>
  );
}
