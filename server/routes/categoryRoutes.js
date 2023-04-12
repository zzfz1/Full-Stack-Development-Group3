import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/", verifyTokenAndAdmin, categoryController.createCategory);
router.put("/:id", verifyTokenAndAdmin, categoryController.updateCategory);
router.delete("/:id", verifyTokenAndAdmin, categoryController.deleteCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

export default router;
