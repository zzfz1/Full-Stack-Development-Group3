// CategoryPropertySchema
import mongoose from "mongoose";

const CategoryPropertySchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
  },
  { _id: true }
);

export default CategoryPropertySchema;
