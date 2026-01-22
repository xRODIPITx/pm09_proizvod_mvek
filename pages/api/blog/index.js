import BlogPost from "../../../models/BlogPost";
import connectDB from "../../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  const { id, page } = req.query;

  try {
    // POST — создание статьи
    if (req.method === "POST") {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Все поля обязательны!" });
      }

      const newPost = await BlogPost.create({ title, content });

      return res
        .status(201)
        .json({ message: "Запись опубликована", data: newPost });
    }

    // GET — получение одного поста
    if (req.method === "GET") {
      if (id) {
        const post = await BlogPost.findById(id);
        if (!post) {
          return res.status(404).json({ message: "Пост не найден" });
        }
        return res.status(200).json({ data: post });
      }

      // GET — последние 3 поста для главной
      if (page === "home") {
        const posts = await BlogPost.find().sort({ _id: -1 }).limit(3);
        return res.status(200).json({ data: posts });
      }

      // GET — все посты
      const posts = await BlogPost.find().sort({ _id: -1 });
      return res.status(200).json({ data: posts });
    }

    // Если метод другой
    return res.status(405).json({ message: "Метод не разрешён" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Ошибка сервера", err });
  }
}
