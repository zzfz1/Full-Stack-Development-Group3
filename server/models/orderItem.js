import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    selectedProperties: [
      {
        categoryProperty: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Category.categoryProperties",
        },
        selectedValue: { type: String, required: true },
      },
    ],
  },
  { _id: false }
);

export default orderItemSchema;
