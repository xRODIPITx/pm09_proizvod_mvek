import connectDB from "../../../lib/mongodb";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { productId, rating, comment, user } = req.body;

    if (!productId || !rating || !user) {
      return res.status(400).json({ message: "Данные не указаны" });
    }

    try {
      const newReview = new Review({ productId, rating, comment, user });
      await newReview.save();
      return res.status(201).json({ message: "Отзыв добавлен" });
    } catch (err) {
      return res.status(500).json({ message: "Ошибка добавления отзыва", err });
    }
  } else {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
