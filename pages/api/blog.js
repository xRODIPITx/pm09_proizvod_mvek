import BlogPost from "../../models/BlogPost";
import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  try {
    if (req.method === "GET") {
      // Проверяем параметр page в запросе
      if (req.query.page === "home") {
        // Получаем только последние 3 статьи для главной страницы
        const posts = await BlogPost.find()
          .sort({ createdAt: -1 }) // Сортировка по дате (от самых свежих)
          .limit(3); // Ограничение на 3 статьи
        return res.status(200).json({ data: posts });
      }

      // Если это запрос на страницу блога (или нет параметра page)
      const posts = await BlogPost.find().sort({ createdAt: -1 }); // Сортировка по дате
      return res.status(200).json({ data: posts });
    }

    return res.status(405).json({ message: "Метод не поддерживается" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ошибка при получении статей", error });
  }
}
