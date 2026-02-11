import connectDB from "../../../lib/mongodb";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  await connectDB();

  const { productId } = req.query;

  try {
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 }); // Сортировка по дате, новые первыми
    res.status(200).json({ reviewsData: reviews });
  } catch (err) {
    res.status(500).json({ message: "Ошибка получения отзывов", err });
  }
}
