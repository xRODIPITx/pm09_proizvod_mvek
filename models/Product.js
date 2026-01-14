import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  category: { type: String, required: false },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
