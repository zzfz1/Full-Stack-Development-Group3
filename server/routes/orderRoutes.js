import express from "express";
import OrderController from "../controllers/orderController.js";
import { verifyToken, verifyTokenAndAdmin } from "../middlewares/verifyToken.js";

const router = express.Router();
const orderController = new OrderController();

router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", verifyTokenAndAdmin, orderController.deleteOrder);
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);
router.get("/:id", verifyToken, orderController.getOrderById);
router.get("/user/:id", verifyToken, orderController.getOrderByUserId);

export default router;
