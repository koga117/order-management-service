const orderService = require('../services/orderService');


exports.createOrder = async (req, res) => {
  try {
    const newOrder = await orderService.createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const ordersExists = await orderService.getAllOrders();
    if(!ordersExists) {
      const error = new Error('No se encuentran pedidos')
      res.status(404).json({ message: error.message })
    }
    res.status(200).json(ordersExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
