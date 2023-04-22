import express from "express";
import UserController from "../controllers/userController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";
import {
  resetPassword,
  updatePassword,
} from "../middlewares/verifyIdentity.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/reset", resetPassword);
router.get("/", verifyTokenAndAdmin, userController.getUsers);
router.get("/:slug", verifyTokenAndAuthorization, userController.getUserBySlug);
router.put(
  "/reset/:slug",
  verifyTokenAndAuthorization,
  resetPassword,
  userController.updateUserBySlug
);
router.put(
  "/update/:slug",
  verifyTokenAndAuthorization,
  updatePassword,
  userController.updateUserBySlug
);
router.delete("/:slug", verifyTokenAndAuthorization, userController.deleteUser);

export default router;
