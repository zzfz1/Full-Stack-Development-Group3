// Product
import mongoose from "mongoose";
import reviewSchema from "./review.js";
import ProductPropertySchema from "./productProperty.js";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Category",
    },
    description: {
      type: String,
      required: false,
    },
    properties: [ProductPropertySchema], // selectable from the belonging category
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: false,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Add a pre-save middleware to generate the slug before saving the document
productSchema.pre("save", function (next) {
  if (!this.isModified("name")) {
    return next();
  }

  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
