import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Review({
  review,
  setMessage,
  setModalBox,
  fetchReviews,
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode(storedToken);
        if (decoded.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Ошибка декодирования токена:", err);
      }
    }
  }, []); // При первом рендере компонента, извлекает токен из localStorage

  const deleteReview = async () => {
    if (window.confirm("Вы уверены, что хотите удалить этот отзыв?")) {
      const res = await fetch(`/api/reviews/delete?id=${review._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage("Отзыв удалён успешно!");
        setModalBox("MessageBox");
        fetchReviews();
      } else {
        alert(data.message || "Ошибка при удалении отзыва.");
      }
    }
  };

  return (
    <div className="review">
      <div className="review-header">
        <span>{review.user}</span>
        <span>Рейтинг: {review.rating} / 5</span>
      </div>
      <p>{review.comment}</p>
      <p>Дата: {new Date(review.createdAt).toLocaleDateString()}</p>

      {isAdmin && (
        <button className="delete-review" onClick={deleteReview}>
          Удалить отзыв
        </button>
      )}
    </div>
  );
}
