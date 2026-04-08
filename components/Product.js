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
  onRatingLoaded, // Пропс для передачи рейтинга в родительский компонент
}) {
  const [averageRating, setAverageRating] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(0);

  // Функция для получения отзывов и вычисления среднего рейтинга
  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${id}`);
      const data = await res.json();

      // Если есть отзывы, вычисляет средний рейтинг
      if (data.reviewsData && data.reviewsData.length > 0) {
        const totalRating = data.reviewsData.reduce(
          (acc, review) => acc + review.rating,
          0,
        );
        const avgRating = totalRating / data.reviewsData.length;
        const avgRatingRounded = Number(avgRating.toFixed(1));
        setAverageRating(avgRatingRounded); // Округляет до 1 знака после запятой
        setReviewsCount(data.reviewsData.length);

        // Передает рейтинг родительскому компоненту
        onRatingLoaded(id, avgRatingRounded);
      } else {
        setAverageRating("-");
        setReviewsCount(0);
        onRatingLoaded(id, null);
      }
    } catch (error) {
      console.error("Ошибка получения отзывов:", error);
    }
  };

  // Загрузка отзывов при монтировании компонента
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
        <p className="avg-rating">
          Рейтинг: {averageRating === null ? "Загрузка..." : averageRating}
          {reviewsCount > 0 ? ` (${reviewsCount})` : ""}
        </p>
        <p className="price">{`${price} руб`}</p>
      </Link>

      <AddToCartButton />
    </div>
  );
}
