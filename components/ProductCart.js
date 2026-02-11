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
    setQty(qty + 1);
    setCart((current) =>
      current.map((p) => (p.id === id ? { ...p, qty: qty + 1 } : p)),
    );
    setCartPrice((current) => current + price);
    setCartQty((current) => current + 1);
  }

  function minus() {
    if (qty > 1) {
      setQty(qty - 1);
      setCart((current) =>
        current.map((p) => (p.id === id ? { ...p, qty: qty - 1 } : p)),
      );
      setCartPrice((current) => current - price);
      setCartQty((current) => current - 1);
    }
  }

  return (
    <tr>
      <td>
        <img src={image} alt={header} style={{ width: "60px" }} />
      </td>
      <td>{header}</td>
      <td>{price} ₽</td>

      <td>
        <div className="qty-control">
          <button onClick={minus}>-</button>
          <span>{qty}</span>
          <button onClick={plus}>+</button>
        </div>
      </td>

      <td>{price * qty} ₽</td>

      <td>
        <button className="danger" onClick={deleteCart}>
          Удалить
        </button>
      </td>
    </tr>
  );
}
