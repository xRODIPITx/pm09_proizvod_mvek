import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Метод не поддерживается" });
  }

  const { userId, items, total, name, email, phone, address } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Корзина пуста" });
  }

  const phoneStr = String(phone).trim();
  if (!phone || /^\+?\d{10,15}$/.test(phoneStr)) {
    return res.status(400).json({ message: "Некорректный телефон" });
  }

  try {
    const order = new Order({
      userId: userId,
      items,
      total,
      name,
      email,
      phone,
      address,
    });

    await order.save();

    return res
      .status(201)
      .json({ message: "Заказ оформлен", orderId: order._id });
  } catch (err) {
    return res.status(500).json({ message: "Ошибка", err });
  }
}
