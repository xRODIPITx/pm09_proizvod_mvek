import ProductCart from "../components/ProductCart";
import { useEffect } from "react";

export default function Cart({
  cart,
  cartQty,
  cartPrice,
  setCart,
  setCartQty,
  setCartPrice,
  setModalBox,
}) {
  // Очищает корзину
  function clearCart() {
    setCart([]);
    setCartQty(0);
    setCartPrice(0);
  }

  // Обновление стоимости корзины
  function updateCartPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setCartPrice(total);
  }

  // Показывает кнопку оформления заказа, если есть товары в корзине
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

  // ОБновление стоимости корзины, если cart изменился
  useEffect(() => {
    updateCartPrice();
  }, [cart]); // Зависит от изменений в cart

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
