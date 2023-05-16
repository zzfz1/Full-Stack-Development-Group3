import express from "express";
import cors from "cors";
import functions from "firebase-functions";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

// Middleware
app.use(
  cors({
    origin: [
      "https://web-shop-group-3.web.app",
      "https://admin-group-3.web.app",
      "http://localhost:5173",
    ],
    allowedHeaders: ["Content-Type", "Authorization", "withcredentials"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Middleware -Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const api = functions.https.onRequest(app);
