import mongoose from "mongoose";

const ProductPropertySchema = new mongoose.Schema(
  {
    categoryProperty: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category.categoryProperties",
    },
    values: [{ type: String, required: true }],
  },

  { _id: false }
);

export default ProductPropertySchema;
