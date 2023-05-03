import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);
reviewSchema.pre("save", async function (next) {
  try {
    await validateReferences(reviewSchema, this);
    next();
  } catch (err) {
    next(err);
  }
});
export default reviewSchema;
