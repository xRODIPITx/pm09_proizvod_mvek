import ProductCart from "../components/ProductCart";

export default function Cart({
  cart,
  cartQty,
  cartPrice,
  setCart,
  setCartQty,
  setCartPrice,
  setMessage,
  setModalBox,
}) {
  function clearCart() {
    setCart([]);
    setCartQty(0);
    setCartPrice(0);
  }

  function ShowOrderButton() {
    if (cartQty > 0) {
      return (
        <>
          <button className="order" onClick={() => setModalBox("OrderForm")}>
            Оформить заказ
          </button>
          <button className="clear-btn" onClick={clearCart}>
            Очистить
          </button>
        </>
      );
    }
  }

  return (
    <div className="Cart">
      <div className="section-title">
        <h1>Корзина</h1>
      </div>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Фото</th>
            <th>Товар</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Итого</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <ProductCart
              key={item.id}
              id={item.id}
              image={item.image}
              header={item.header}
              price={item.price}
              setCart={setCart}
              setCartPrice={setCartPrice}
              setCartQty={setCartQty}
            />
          ))}
        </tbody>
      </table>

      <p>Количество товаров: {cartQty}</p>
      <p>Общая стоимость товаров: {cartPrice}</p>
      <ShowOrderButton />
    </div>
  );
}
