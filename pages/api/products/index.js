import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  // Если запрос на получение конкретного товара
  if (req.method === "GET" && req.query.id) {
    const { id } = req.query;

    try {
      const product = await Product.findById(id); // Получаем один товар по ID
      if (!product) {
        return res.status(404).json({ message: "Товар не найден" });
      }
      return res.status(200).json({ productData: product });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при получении товара",
      });
    }
  }

  // Если запрос на поиск товаров по заголовку
  if (req.method === "GET" && req.query.search) {
    const { search } = req.query;
    let filter = {};
    if (search) {
      filter = { header: { $regex: search, $options: "i" } }; // Поиск по заголовку
    }

    try {
      const products = await Product.find(filter); // Получаем товары по фильтру
      return res.status(200).json({ data: products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при поиске товаров",
      });
    }
  }

  // Если запрос на получение всех товаров
  if (req.method === "GET") {
    try {
      const products = await Product.find(); // Получаем все товары
      return res.status(200).json({ data: products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Ошибка при получении всех товаров",
      });
    }
  }

  // Если метод не поддерживается
  return res.status(405).json({ message: "Метод не поддерживается" });
}
