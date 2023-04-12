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
router.get("/", verifyTokenAndAdmin, userController.getUsers);
router.get("/:id", verifyTokenAndAuthorization, userController.getUserById);
// router.put("/:id", verifyTokenAndAuthorization, userController.updateUser);
router.put(
  "/reset/:id",
  verifyTokenAndAuthorization,
  resetPassword,
  userController.updateUser
);
router.put(
  "/update/:id",
  verifyTokenAndAuthorization,
  updatePassword,
  userController.updateUser
);
router.delete("/:id", verifyTokenAndAuthorization, userController.updateUser);

export default router;
