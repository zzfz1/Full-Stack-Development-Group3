import mongoose from "mongoose";
import slugify from "slugify";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  this.slug = slugify(this.username, { lower: true });
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
