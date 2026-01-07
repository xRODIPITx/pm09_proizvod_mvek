import ProductCart from "../components/ProductCart";

function Cart({
  cart,
  setCart,
  cartPrice,
  setCartPrice,
  cartQty,
  setCartQty,
  setMessage,
  setModalBox,
}) {
  function orderCart() {
    setCart([]);
    setCartQty(0);
    setCartPrice(0);
    setMessage("Заказ оформлен");
    setModalBox("MessageBox");
  }

  function ShowOrderButton() {
    if (cartQty > 0) {
      return (
        <>
          <button className="order" onClick={orderCart}>
            Оформить заказ
          </button>
        </>
      );
    }
  }

  return (
    <div className="Cart">
      <h1>Корзина</h1>
      <div className="CartContent">
        {cart.map((item) => (
          <ProductCart
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.header}
            price={item.price}
            setCart={setCart}
            setCartPrice={setCartPrice}
            setCartQty={setCartQty}
          />
        ))}
      </div>
      <p>Количество товаров: {cartQty}</p>
      <p>Общая стоимость товаров: {cartPrice}</p>
      <ShowOrderButton />
    </div>
  );
}

export default Cart;
