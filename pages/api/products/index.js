import connectDB from "../../../lib/mongodb"; // Подключение к базе данных
import Product from "../../../models/Product"; // Модель продукта

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  const { search } = req.query;
  let filter = {};
  if (search) {
    filter = { header: { $regex: search, $options: "i" } };
  }

  const products = await Product.find(filter);
  res.status(200).json({ data: products });

  if (req.method === "GET") {
    try {
      const products = await Product.find(); // Получение всех товаров из базы данных

      return res.status(200).json({
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при получении товаров",
      });
    }
  } else {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
