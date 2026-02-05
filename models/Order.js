import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [{ productId: String, header: String, price: Number, qty: Number }],
  total: Number,
  name: String,
  email: String,
  phone: String,
  address: String,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
