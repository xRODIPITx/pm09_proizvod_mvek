import BlogPost from "../../../models/BlogPost";
import connectDB from "../../../lib/mongodb";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Все поля обязательны!" });
    }

    const newPost = await BlogPost.create({ title, content });

    return res
      .status(201)
      .json({ message: "Запись опубликована", data: newPost });
  } else {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }
}
