import mongoose from "mongoose";
import slugify from "slugify";
import CategoryPropertySchema from "./categoryProperty.js";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: {
      type: String,
      unique: true,
    },
    allowedProperties: [CategoryPropertySchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Middleware to automatically generate the slug based on the category name before the validation step.
// This ensures that the slug is created or updated whenever the category name is created or modified.

categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, replacement: "-", remove: /[*+~.()'"!:@]/g });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
