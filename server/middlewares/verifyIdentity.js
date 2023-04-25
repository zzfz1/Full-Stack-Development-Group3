import User from "../models/user.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateTokenEmail } from "../utils/generateToken.js";
dotenv.config();

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

  const user = User.findOne({ email: req.body.email }, async (err, user) => {
    try {
      const token = generateTokenEmail(user._id, user.isAdmin);
      const link = `${process.env.RESETPASWORD_URL}?token=${token}`;
      console.log("the token", link);
      console.log("the user is", user);
      res.status(200).json({ message: "email send" });
    } catch (err) {
      console.log("User not found", error);
      res.status(404).json({ message: "User Not Found" });
    }
  });
};

/* 
 const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "fullstack.hkr@gmail.com",
        pass: "Fullstack2023",
      },
    });

    // send mail with defined transport object
    let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "booosho65@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
*/
