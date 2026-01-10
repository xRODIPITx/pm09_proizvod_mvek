import BlogPost from "../../models/BlogPost";
import connectDB from "../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  const { id, page } = req.query;

  try {
    // 1) Если есть id — возвращаем один пост
    if (id) {
      const post = await BlogPost.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Пост не найден" });
      }
      return res.status(200).json({ data: post });
    }

    // 2) Если главная страница — последние 3
    if (page === "home") {
      const posts = await BlogPost.find().sort({ _id: -1 }).limit(3);
      return res.status(200).json({ data: posts });
    }

    // 3) Иначе — все посты
    const posts = await BlogPost.find().sort({ _id: -1 });
    return res.status(200).json({ data: posts });
  } catch (err) {
    return res.status(500).json({ message: "Ошибка сервера", err });
  }
}
