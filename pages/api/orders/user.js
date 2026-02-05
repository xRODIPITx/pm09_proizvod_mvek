import connectDB from "../../../lib/mongodb";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "userId отсутствует" });

  const orders = await Order.find({ userId }).sort({ createdAt: -1 });
  res.status(200).json({ data: orders });
}
