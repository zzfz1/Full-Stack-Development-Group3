import mongoose from "mongoose";

const ProductPropertyValueSchema = new mongoose.Schema(
  {
    value: { type: String, required: false },
  },
  { _id: true }
);

const ProductPropertySchema = new mongoose.Schema(
  {
    categoryProperty: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Category.categoryProperties",
    },
    values: [ProductPropertyValueSchema],
  },

  { _id: false }
);

export default ProductPropertySchema;
