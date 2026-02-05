import Link from "next/link";

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
  function addToCart(e) {
    e.stopPropagation();
    const index = cart.findIndex((value) => value.id === id);

    if (index === -1) {
      setCart((prevState) => [
        ...prevState,
        { id, image, header, price, qty: 1 },
      ]);
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
          <button className="buy" onClick={(e) => addToCart(e)}>
            В корзину
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
      <Link href={`/product/${id}`}>
        <img src={image} alt={header} />
        <h1 title={header}>{header}</h1>
        <p>{`${price} руб`}</p>
      </Link>
      <AddToCartButton />
    </div>
  );
}
