import Link from "next/link";
import { useState, useEffect } from "react";

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
  const [averageRating, setAverageRating] = useState(null);

  // Функция для получения отзывов и вычисления среднего рейтинга
  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${id}`);
      const data = await res.json();

      // Если есть отзывы, вычисляем средний рейтинг
      if (data.reviewsData && data.reviewsData.length > 0) {
        const totalRating = data.reviewsData.reduce(
          (acc, review) => acc + review.rating,
          0,
        );
        const avgRating = totalRating / data.reviewsData.length;
        setAverageRating(avgRating.toFixed(1)); // Округляем до 1 знака после запятой
      } else {
        setAverageRating("-"); // Если нет отзывов, показываем прочерк
      }
    } catch (error) {
      console.error("Ошибка получения отзывов:", error);
    }
  };

  // Загружаем отзывы при монтировании компонента
  useEffect(() => {
    fetchReviews();
  }, [id]);

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
        <p className="price">{`${price} руб`}</p>
        <p className="avg-rating">
          Средний рейтинг:{" "}
          {averageRating === null ? "Загрузка..." : averageRating} / 5.0
        </p>
      </Link>

      <AddToCartButton />
    </div>
  );
}
