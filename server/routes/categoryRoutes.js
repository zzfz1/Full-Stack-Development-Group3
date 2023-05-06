import express from "express";
import CategoryController from "../controllers/categoryController.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
const categoryController = new CategoryController();

router.post("/", verifyTokenAndAdmin, categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
//change
router.put("/:slug", verifyTokenAndAdmin, categoryController.updateCategory);
router.delete("/:slug", verifyTokenAndAdmin, categoryController.deleteCategory);
router.get("/:slug", categoryController.getCategoryBySlug);
router.get("/id/:id", categoryController.getCategoryByID);

export default router;
