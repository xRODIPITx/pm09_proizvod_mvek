import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  // Логируем весь req.body перед обработкой
  console.log("Request body:", req.body); // Логируем тело запроса

  if (req.method === "POST") {
    const { header, description, price, category } = req.body;
    // Проверяем, что описание действительно есть
    console.log("Extracted data:", { header, description, price, category });

    if (!header || !price || !description) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    const product = new Product({
      header,
      description,
      price,
      category,
    });

    // Логируем объект перед сохранением
    console.log("Product object before save:", product);

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
