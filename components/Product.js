export default function Product({
  id,
  header,
  image,
  price,
  setCart,
  setCartPrice,
  setCartQty,
  cart,
  setMessage,
  setModalBox,
  token,
}) {
  function addToCart() {
    const index = cart.findIndex((value) => value.id === id);
    console.debug(index);

    if (index === -1) {
      setCart((prevState) => [...prevState, { id, image, header, price }]);
      setCartPrice((current) => current + price);
      setCartQty((current) => current + 1);
    } else {
      return;
    }
    setTimeout(() => {
      setMessage("Товар добавлен в корзину.");
      setModalBox("MessageBox");
    }, 100);
  }

  function AddToCartButton() {
    if (token && token !== null && token !== undefined) {
      return (
        <>
          <button className="buy" onClick={() => addToCart()}>
            Купить
          </button>
        </>
      );
    } else {
      return (
        <>
          <p>Авторизуйтесь для добавления товара в корзину</p>
        </>
      );
    }
  }

  return (
    <div className="Product">
      <img src={image} alt={header} />
      <h1>{header}</h1>
      <p>{`${price} руб`}</p>
      <AddToCartButton />
    </div>
  );
}
