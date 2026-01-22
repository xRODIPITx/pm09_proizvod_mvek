import connectDB from "../../../lib/mongodb";
import BlogPost from "../../../models/BlogPost";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: "ID записи отсутствует" });

    try {
      await BlogPost.findByIdAndDelete(id);
      return res.status(200).json({ message: "Запись блога удалена" });
    } catch (err) {
      return res.status(500).json({ message: "Ошибка удаления", err });
    }
  }

  return res.status(405).json({ message: "Метод не поддерживается" });
}
