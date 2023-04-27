import User from "./models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

new User({
  username: "john_doe",
  email: "john_doe@example.com",
  password: "$2a$10$UT8M.3JkXeYgD2SGZmE5A./Rvlk.BxAezH6W3frh3XMzERkIbIaO2",
  isAdmin: true,
}).save();
