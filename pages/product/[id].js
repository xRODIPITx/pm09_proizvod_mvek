import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Review from "../../components/Review";
import { jwtDecode } from "jwt-decode";

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
  token,
}) {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const router = useRouter();
  const { id } = router.query;

  // Загрузка информации о товаре
  useEffect(() => {
    if (!id) return;

    fetch(`/api/products?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Проверка на наличие _id
        if (data.productData && data.productData._id) {
          setProduct(data.productData);
        } else {
          console.error("Продукт не найден:", data);
        }
      });
  }, [id]);
  // Загрузка отзывов с сервера
  useEffect(() => {
    // Запрос к API только если id определено
    if (id) {
      fetchReviews();
    }
  }, [id]);

  // Функция для загрузки отзывов
  const fetchReviews = async () => {
    const res = await fetch(`/api/reviews?productId=${id}`);
    const data = await res.json();
    setReviews(data.reviewsData);

    // Рассчитываем средний рейтинг
    if (data.reviewsData.length > 0) {
      const totalRating = data.reviewsData.reduce(
        (acc, review) => acc + review.rating,
        0,
      );
      const avgRating = totalRating / data.reviewsData.length;
      setAverageRating(avgRating.toFixed(1)); // Округляем до одного знака после запятой
    }
  };

  // Отправка отзыва
  const submitReview = async () => {
    let userName = "Гость"; // Значение по умолчанию

    if (token) {
      try {
        userName = jwtDecode(token).login;
      } catch (err) {
        console.log("Ошибка токена:", err);
      }
    }

    const res = await fetch("/api/reviews/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
        rating,
        comment,
        user: userName,
      }),
    });

    const data = await res.json();
    if (res.status === 201) {
      setMessage("Отзыв добавлен!");
      setModalBox("MessageBox");
      setComment(""); // очистка формы
      setRating(1);
      // обновление отзывов
      fetchReviews();
    } else {
      alert(data.message);
    }
  };

  if (!product) return <p>Загрузка...</p>;

  function addToCart() {
    if (!product) return;

    if (
      !product ||
      !product._id ||
      !product.image ||
      !product.header ||
      !product.price
    ) {
      console.error(
        "Недостаточные данные для добавления товара в корзину",
        product,
      );
      return;
    }

    const index = cart.findIndex((value) => value.id === product._id);

    if (index === -1) {
      setCart((prevState) => [
        ...prevState,
        {
          id: product._id,
          image: product.image,
          header: product.header,
          price: product.price,
          qty: 1,
        },
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
          <button className="add-to-cart" onClick={() => addToCart()}>
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
          <AddToCartButton />
        </div>
      </div>

      {/* Отзывы */}
      <h2>Отзывы</h2>
      {reviews.length > 0 && (
        <div>
          <p>Средняя оценка: {averageRating} / 5</p>
        </div>
      )}
      {reviews.length === 0 && <p>Отзывов пока нет</p>}
      {reviews.map((review) => (
        <Review
          key={review._id}
          review={review}
          setMessage={setMessage}
          setModalBox={setModalBox}
          fetchReviews={fetchReviews}
          token={token}
        />
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
        <button onClick={submitReview}>Отправить</button>
      </div>
    </div>
  );
}
