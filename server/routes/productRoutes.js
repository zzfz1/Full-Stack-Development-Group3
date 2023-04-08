import express from "express";
import ProductController from "../controllers/productController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();
//create a instance of class prodctController to its the methods
const productController = new ProductController();

router.post("/", isAdmin, productController.createProduct);
router.put("/:id", isAdmin, productController.updateProduct);
router.delete("/:id", isAdmin, productController.deleteProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

export default router;
