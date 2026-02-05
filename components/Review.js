export default function Review({ review }) {
  return (
    <div className="review">
      <div className="review-header">
        <span>{review.user}</span>
        <span>Рейтинг: {review.rating} / 5</span>
      </div>
      <p>{review.comment}</p>
      <p>Дата: {new Date(review.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
