import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, //createdAt, updatedAt
  }
);

const Product = mongoose.model('Product', productSchema); 
//'Product', va en mayuscula, pq mongoDB te lo pone luego en minuscula y plural

export default Product;
