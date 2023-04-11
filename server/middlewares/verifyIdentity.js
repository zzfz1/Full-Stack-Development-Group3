import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const updatePassword = async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const user = await User.findOne({ email: req.body.email });
  if (user && (await bcrypt.compare(oldPassword, user.password))) {
    next();
  } else {
    res.status(400).json({ message: "Wrong Password!" });
  }
};

export const resetPassword = async (req, res, next) => {
  //TODO:Email Verification
  const user = User.findOne({ _id: req.user._id });
};
