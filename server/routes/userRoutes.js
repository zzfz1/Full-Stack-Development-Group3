import express from "express";
import UserController from "../controllers/userController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyLinkToken,
} from "../middlewares/verifyToken.js";
import {
  resetPassword,
  updatePassword,
} from "../middlewares/verifyIdentity.js";

const router = express.Router();
const userController = new UserController();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/login/google", userController.googleLogin);
router.post("/reset", resetPassword);
router.get("/reset/verify/:token", verifyLinkToken);
router.get("/check/:email", userController.checkUser);
router.get("/", verifyTokenAndAdmin, userController.getUsers);
router.get("/stats", verifyTokenAndAdmin, userController.userStats);
router.get("/:slug", verifyTokenAndAuthorization, userController.getUserBySlug);
router.put("/reset/:slug", userController.resetUserPassword);
router.put(
  "/update/:slug",
  verifyTokenAndAuthorization,
  updatePassword,
  userController.updateUserBySlug
);
router.put(
  "/address/:id",
  verifyTokenAndAuthorization,
  userController.updateOrAddShippingAddress
);
router.delete(
  "/address/:userId/:shippingAddressId",
  verifyTokenAndAuthorization,
  userController.deleteShippingAddress
);
router.delete("/:slug", verifyTokenAndAuthorization, userController.deleteUser);

export default router;
