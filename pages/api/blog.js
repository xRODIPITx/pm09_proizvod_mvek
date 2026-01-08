import BlogPost from "../../models/BlogPost";
import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  try {
    // =======================
    // GET — получение статей
    // =======================
    if (req.method === "GET") {
      // Для главной страницы — последние 3 статьи
      if (req.query.page === "home") {
        const posts = await BlogPost.find().sort({ createdAt: -1 }).limit(3);

        return res.status(200).json({ data: posts });
      }

      // Для страницы блога — все статьи
      const posts = await BlogPost.find().sort({ createdAt: -1 });
      return res.status(200).json({ data: posts });
    }

    // =======================
    // POST — добавление статьи
    // =======================
    if (req.method === "POST") {
      const { title, content } = req.body;

      if (!title || !content) {
        return res
          .status(400)
          .json({ message: "Заголовок и текст статьи обязательны" });
      }

      const newPost = new BlogPost({
        title,
        content,
      });

      await newPost.save();

      return res.status(201).json({
        message: "Статья успешно добавлена",
        data: newPost,
      });
    }

    // =======================
    // Остальные методы
    // =======================
    return res.status(405).json({ message: "Метод не поддерживается" });
  } catch (error) {
    return res.status(500).json({
      message: "Ошибка при работе с блогом",
      error: error.message,
    });
  }
}
