import express from "express";
import CategoryController from "../controllers/categoryController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/", isAdmin, categoryController.createCategory);
router.put("/:id", isAdmin, categoryController.updateCategory);
router.delete("/:id", isAdmin, categoryController.deleteCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

export default router;
