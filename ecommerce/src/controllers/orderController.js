const { Order, validateOrder } = require("../models/orderModel");



exports.createProductOrder = async (req, res) => {
    try {
        // console.log(req.body);
        const orderData = req.body;    
        const validatedOrderData = await validateOrder(orderData);        
        const newOrder = new Order(validatedOrderData);    
        const savedOrder = await newOrder.save();
    
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
      } catch (error) {
        res.status(400).json({ message: 'An error occurred', error: error.message });
      }

      
  };