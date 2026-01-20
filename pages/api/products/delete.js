import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) return res.status(400).json({ message: "ID товара отсутствует" });

    try {
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: "Товар удалён" });
    } catch (err) {
      return res.status(500).json({ message: "Ошибка удаления", err });
    }
  }

  return res.status(405).json({ message: "Метод не поддерживается" });
}
