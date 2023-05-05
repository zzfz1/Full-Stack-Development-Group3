import Order from "../models/order.js";
import User from "../models/user.js";
import { mailTransport } from "../utils/sendInvoice.js";

class OrderController {
  async createOrder(req, res) {
    try {
      const {
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;
      const newOrder = new Order({
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
      });
      const savedOrder = await newOrder.save();
      const userInfo = await User.findById(user);
      const email = userInfo.email;
      mailTransport(email, savedOrder);
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.status = status;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await Order.find();
      // .populate({
      //   path: "user",
      //   select: "username email",
      //   options: { lean: true },
      // });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id).populate(
        "userId",
        "username email"
      );

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default OrderController;
