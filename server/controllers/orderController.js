import Order from "../models/order.js";
import User from "../models/user.js";
import { mailTransport } from "../utils/sendInvoice.js";

class OrderController {
  async createOrder(req, res) {
    try {
      const { user, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;
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

  // only for isPaid, isDelivered
  async updateOrderStatus(req, res) {
    try {
      const { isPaid, isDelivered } = req.body;
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if 'isPaid' is provided in the request body
      if (isPaid !== undefined) {
        order.isPaid = isPaid;
        if (isPaid) {
          // If the order is being marked as paid, set 'paidAt' to the current date
          order.paidAt = new Date();
        }
      }

      // Check if 'isDelivered' is provided in the request body
      if (isDelivered !== undefined) {
        order.isDelivered = isDelivered;
        if (isDelivered) {
          // If the order is being marked as delivered, set 'deliveredAt' to the current date
          order.deliveredAt = new Date();
        }
      }
      console.log("oder", order);
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error(error); // Log the error to the console
      res.status(500).json({ message: "Internal server error", error });
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
      const orders = await Order.find().populate({
        path: "user",
        select: "username email",
        options: { lean: true },
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.id).populate({
        path: "user",
        select: "username email",
        options: { lean: true },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async getOrderByUserId(req, res) {
    try {
      const orders = await Order.find({ user: req.params.id }).populate({
        path: "user",
        select: "username email",
        options: { lean: true },
      });

      if (!orders) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default OrderController;
