// CategoryPropertySchema
import mongoose from "mongoose";

const CategoryPropertySchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
  },
  { _id: true }
);

const CategoryProperty = mongoose.model(
  "CategoryProperty",
  CategoryPropertySchema
);
export default CategoryProperty;
