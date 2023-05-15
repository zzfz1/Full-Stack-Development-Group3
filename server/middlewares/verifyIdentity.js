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
      const link = `${process.env.RESETPASWORD_URL}?token=${token}&user=${user.username}`;
      console.log("the token", link);
      console.log("the user is", user);
      mailTransport(user.email, link);
      res.status(200).json({ message: "email send" });
    } catch (err) {
      console.log("User not found", err);
      res.status(404).json({ message: "User Not Found" });
    }
  });
};

const mailTransport = async (userEmil, link) => {
  console.log("the link", link);
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USERNAME_MAILTRAP,
      pass: process.env.PASSWORD_MAILTRAP,
    },
  });

  let mailOptions = {
    from: 'Cuz"example.com', // sender address
    to: userEmil, // list of receivers
    subject: "Verify your eamil", // Subject line
    text: "Hello world?", // plain text body
    html: message(link), // html body
  };
  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const message = (link) => `<!DOCTYPE html>
<html>
<head>
  <title>Password Reset Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #F0F0F0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #FFFFFF;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
    }

    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    p {
      font-size: 18px;
      margin-bottom: 20px;
      text-align: center;
    }

    button {
      background-color: #4CAF50;
      color: #FFFFFF;
      font-size: 18px;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #3E8E41;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Verification</h2>
    <p>Please click the button below to verify your email address and proceed with resetting your password:</p>
    <a href=${link}>
    <button type="button" onclick="${link}">Verify Email and Reset Password</button>
    </a>
  </div>
</body>
</html>
`;
