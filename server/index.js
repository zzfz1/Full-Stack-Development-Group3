import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("200");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
