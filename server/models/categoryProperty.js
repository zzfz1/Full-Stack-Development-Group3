import mongoose from "mongoose";

const CategoryPropertySchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    allowedValues: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  },
  { _id: false }
);

export default CategoryPropertySchema;
