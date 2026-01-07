import connectDB from "../../../lib/mongodb"; // Подключение к базе данных
import Product from "../../../models/Product"; // Модель продукта

export default async function handler(req, res) {
  await connectDB(); // Подключение к базе данных

  if (req.method === "POST") {
    const { header, price } = req.body;

    if (!header || !price) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const product = new Product({
      header,
      price,
    });

    try {
      await product.save(); // Сохранение нового товара в базе данных

      return res.status(201).json({
        message: "Товар добавлен, обновите страницу для отображения",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: "Ошибка при сохранении товара",
        message: error.message,
      });
    }
  } else {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
