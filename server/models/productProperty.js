import mongoose from "mongoose";

const ProductPropertySchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  { _id: false }
);

export default ProductPropertySchema;
