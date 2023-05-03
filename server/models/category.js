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
    categoryProperties: [CategoryPropertySchema], // Properties from here should be selectable in the product
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, replacement: "-", remove: /[*+~.()'"!:@]/g });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
