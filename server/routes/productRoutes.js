import express from "express";
import ProductController from "../controllers/productController.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
const productController = new ProductController();

router.post("/", verifyTokenAndAdmin, productController.createProduct);
router.put("/:slug", verifyTokenAndAdmin, productController.updateProduct);
router.delete("/:slug", verifyTokenAndAdmin, productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/:slug", productController.getProductBySlug);
router.post("/:slug/reviews", verifyToken, productController.createProductReview);

export default router;
