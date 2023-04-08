import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/:id", userController.getUserById);

export default router;
