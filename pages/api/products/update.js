import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "PUT") {
    const { id } = req.query;
    const { header, price, category } = req.body;

    if (!id) return res.status(400).json({ message: "ID товара отсутствует" });

    try {
      await Product.findByIdAndUpdate(id, { header, price, category });
      return res.status(200).json({ message: "Товар обновлён" });
    } catch (error) {
      return res.status(500).json({ message: "Ошибка обновления", error });
    }
  }

  return res.status(405).json({ message: "Метод не поддерживается" });
}
