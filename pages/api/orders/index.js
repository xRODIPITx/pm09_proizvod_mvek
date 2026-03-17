import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  const { userId } = req.query;

  if (req.method === "GET") {
    try {
      let orders;

      if (userId) {
        // Если userId присутствует в query, ищем заказы только для этого пользователя
        orders = await Order.find({ userId }).sort({ createdAt: -1 });
      } else {
        // Если userId нет, то возвращаем все заказы
        orders = await Order.find().sort({ createdAt: -1 });
      }

      // Если заказов нет, отправляется пустой массив
      if (!orders) {
        return res.status(404).json({ message: "Заказы не найдены" });
      }

      // Отправляем найденные заказы
      res.status(200).json({ data: orders });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Ошибка при получении заказов", error: err.message });
    }
  } else {
    res.status(405).json({ message: "Метод не поддерживается" });
  }
}
