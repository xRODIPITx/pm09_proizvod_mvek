import connectDB from "../../../lib/mongodb";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "ID отзыва отсутствует" });
    }

    try {
      const deletedReview = await Review.findByIdAndDelete(id);
      if (!deletedReview) {
        return res.status(404).json({ message: "Отзыв не найден" });
      }

      return res.status(200).json({ message: "Отзыв удалён" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при удалении отзыва",
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
