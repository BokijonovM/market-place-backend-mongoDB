import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    reviews: [
      {
        comment: { type: String, required: true },
        rate: { type: Number, required: true, min: 1, max: 5 },
        productId: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ProductSchema.static("findReviewsWithProducts", async function (mongoQuery) {
//   const total = await this.countDocuments(mongoQuery.criteria);
//   const reviews = await this.find(mongoQuery.criteria)
//     .limit(mongoQuery.options.limit)
//     .skip(mongoQuery.options.skip)
//     .sort(mongoQuery.options.sort)
//     .populate({
//       path: "Product",
//       select: "name brand",
//     });
//   return { total, reviews };
// });

export default model("Product", ProductSchema);
