import express from "express";
import OrderController from "../controllers/orderController.js";

const router = express.Router();
const orderController = new OrderController();

router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrderStatus);
router.delete("/:id", orderController.deleteOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);

export default router;
