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
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
