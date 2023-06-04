import Order from "../models/order.js";

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order({
      name: req.body.name,
      ordertype: req.body.ordertype,
      address: req.body.address,
      tablenumber: req.body.tablenumber,
      timearrive: req.body.timearrive,
      phonenumber: req.body.phonenumber,
      date: req.body.date,
      dishes: req.body.dishes,
      total_amount: req.body.total_amount,
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders with pagination
const getOrders = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Specify the desired number of orders per page
  const skipIndex = (page - 1) * limit;

  try {
    const orders = await Order.find()
      .sort({ _id: -1 }) // Sort in descending order based on _id
      .skip(skipIndex)
      .limit(limit);

    res.status(200).json({ success: true, response: orders });
  } catch (error) {
    next(error);
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.name = req.body.name || order.name;
      order.ordertype = req.body.ordertype || order.ordertype;
      order.address = req.body.address || order.address;
      order.tablenumber = req.body.tablenumber || order.tablenumber;
      order.timearrive = req.body.timearrive || order.timearrive;
      order.phonenumber = req.body.phonenumber || order.phonenumber;
      order.date = req.body.date || order.date;
      order.dishes = req.body.dishes || order.dishes;
      order.total_amount = req.body.total_amount || order.total_amount;

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      await Order.deleteOne({ _id: order._id });
      res.json({ message: "Order deleted" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const Order_controller = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};

export default Order_controller;
