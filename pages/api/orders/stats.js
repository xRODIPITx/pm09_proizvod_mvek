import connectDB from "../../../lib/mongodb";
import Product from "../../../models/Product";
import Order from "../../../models/Order";

export default async function handler(req, res) {
  await connectDB();

  try {
    // Получаем статистику
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);

    res.status(200).json({
      productCount,
      orderCount,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка при получении статистики" });
  }
}
