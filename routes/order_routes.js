import express from "express";
const router = express.Router();
import Order_controller from  ".././controllers/order.js"

// Create a new order
router.post('/', Order_controller.createOrder);

// Get all orders
router.get('/', Order_controller.getOrders);

// Get a specific order
router.get('/:id', Order_controller.getOrderById);

// Update an existing order
router.put('/:id', Order_controller.updateOrder);

// Delete an order
router.delete('/:id', Order_controller.deleteOrder);

export default router;
