import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    Category: { type: String, required: true },
    reviews: [
      {
        comment: { type: String, required: true },
        rate: { type: Number, required: true, min:1, max:5 }
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Product", ProductSchema);
