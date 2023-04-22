import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const updatePassword = async (req, res, next) => {
  const newPassword = req.body.password;
  const oldPassword = req.body.oldPassword;
  const user = await User.findOne({ email: req.body.email });

  if (newPassword && newPassword.trim()) {
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      req.body.password = await bcrypt.hash(newPassword, 10);
      next();
    } else {
      res.status(400).json({ message: "Wrong Password!" });
    }
  } else {
    delete req.body.password; // remove password from the request body if not updating
    next();
  }
};

export const resetPassword = async (req, res, next) => {
  // TODO: Email Verification
  console.log(" inside the resetpassword func", req.body);
  const user = User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }

    if (!user) {
      console.log("User not found");
      res.status(404).json({ message: "User Not Found" });
    }
    console.log("the user info", user.email);
  });
  /* next(); */
};
