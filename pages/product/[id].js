import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Review from "../../components/Review";

export default function ProductPage({
  header,
  image,
  price,
  setCart,
  setCartPrice,
  setCartQty,
  cart,
  setMessage,
  setModalBox,
}) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { id } = router.query;

  function addToCart() {
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

  // Загружаем информацию о товаре
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Product Data:", data);
        setProduct(data.data);
      });

    // Получаем отзывы для товара
    fetch(`/api/reviews?productId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data);
      });
  }, [id]);

  // Отправка отзыва
  const handleSubmitReview = async () => {
    const res = await fetch("/api/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id, rating, comment, user: "Гость" }), // Указываем "Гость", если нет авторизации
    });

    const data = await res.json();
    if (res.status === 201) {
      alert("Отзыв добавлен");
      setComment(""); // очищаем форму
      setRating(1);
      // обновляем отзывы
      fetch(`/api/reviews?productId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setReviews(data.data);
        });
    } else {
      alert(data.message);
    }
  };

  if (!product) return <p>Загрузка...</p>;

  return (
    <div className="product-page">
      <div className="product-content">
        <div className="product-image">
          <img
            src={product.image || "/images/placeholder.png"}
            alt={product.header}
          />
        </div>
        <div className="product-info">
          <h1>{product.header}</h1>
          <p>{product.description}</p>
          <p className="price">{product.price} ₽</p>
          <button className="add-to-cart" onClick={() => addToCart()}>
            Добавить в корзину
          </button>
        </div>
      </div>

      {/* Отзывы */}
      <h2>Отзывы</h2>
      {reviews.length === 0 && <p>Отзывов пока нет</p>}
      {reviews.map((review) => (
        <Review key={review._id} review={review} />
      ))}

      {/* Форма для оставления отзыва */}
      <div className="review-form">
        <h3>Оставьте отзыв</h3>
        <div>
          <label>Рейтинг:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            {[1, 2, 3, 4, 5].map((rate) => (
              <option key={rate} value={rate}>
                {rate} {rate === 1 ? "звезда" : "звезды"}
              </option>
            ))}
          </select>
        </div>
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш отзыв"
          />
        </div>
        <button onClick={handleSubmitReview}>Отправить</button>
      </div>
    </div>
  );
}
