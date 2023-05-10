import mongoose from "mongoose";
import CategoryProperty from "./categoryProperty.js";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: {
      type: String,
      unique: true,
    },
    categoryProperties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryProperty",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, {
      lower: true,
      replacement: "-",
      remove: /[*+~.()'"!:@]/g,
    });
  }
  next();
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
