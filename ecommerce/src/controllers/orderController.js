const { Order, validateOrder } = require("../models/orderModel");
const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

exports.createProductOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const validatedOrderData = await validateOrder(orderData);

    // Retrieve cart data using cartId
    const cartId = validatedOrderData.cartId;
    const cart = await Cart.findById(cartId).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    for (const cartItem of cart.items) {
      const productId = cartItem.productId._id;
      const quantity = cartItem.quantity;

      // Debug log: Check productId and quantity
      console.log(
        `Updating product ${productId}, Decrementing stock by ${quantity}`
      );

      // Update product stock
      const updateResult = await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -quantity },
      });

      // Debug log: Check update result
      console.log("Product update result:", updateResult);
    }

    const newOrder = new Order(validatedOrderData);
    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve orders by userId
    const orders = await Order.find({ userId }).populate([
      {
        path: "userId",
        select: "_id name email mobile role",
        model: "RegisterUser",
      },
      {
        path: "cartId",
        populate: {
          path: "items.productId",
          // select:'',
          model: "Product",
        },
      },
    ]);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    // Retrieve orders by userId
    const orders = await Order.find().populate([
      {
        path: "userId",
        select: "_id name email mobile role",
        model: "RegisterUser",
      },
      {
        path: "cartId",
        populate: {
          path: "items.productId",
          // select:'',
          model: "Product",
        },
      },
    ]);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// exports.createProductOrder = async (req, res) => {
//     try {
//         // console.log(req.body);
//         const orderData = req.body;
//         const validatedOrderData = await validateOrder(orderData);
//         const newOrder = new Order(validatedOrderData);
//         const savedOrder = await newOrder.save();

//         res.status(201).json({ message: 'Order created successfully', order: savedOrder });
//       } catch (error) {
//         res.status(400).json({ message: 'An error occurred', error: error.message });
//       }
//   };
