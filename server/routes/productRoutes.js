import express from "express";
import ProductController from "../controllers/productController.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
const productController = new ProductController();

router.post("/", verifyTokenAndAdmin, productController.createProduct);
router.put("/:id", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:id", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/:id/reviews", verifyToken, productController.createProductReview);

export default router;
