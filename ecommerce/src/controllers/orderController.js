const { Order, validateOrder } = require("../models/orderModel");
const { Cart } = require("../models/cartModel");
const { Product } = require("../models/productModel");

// exports.createProductOrder = async (req, res) => {
//   try {
//     const orderData = req.body;
//     const validatedOrderData = await validateOrder(orderData);

//     // Retrieve cart data using cartId
//     const cartId = validatedOrderData.cartId;
//     const cart = await Cart.findById(cartId).populate("items.productId");

//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//       console.log("cart",cart);
//     for (const cartItem of cart.items) {
//       const productId = cartItem.productId._id;
//       const quantity = cartItem.quantity;

//       // Debug log: Check productId and quantity
//       console.log(
//         `Updating product ${productId}, Decrementing stock by ${quantity}`
//       );

//       // Update product stock
//       const updateResult = await Product.findByIdAndUpdate(productId, {
//         $inc: { stock: -quantity },
//       });

//       // Debug log: Check update result
//       console.log("Product update result:", updateResult);
//     }

//     const newOrder = new Order(validatedOrderData);
//     const savedOrder = await newOrder.save();

//     res
//       .status(201)
//       .json({ message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };

// exports.createProductOrder = async (req, res) => {
//   try {
//     const orderData = req.body;
//     const validatedOrderData = await validateOrder(orderData);

//     // Prepare items for order
//     const orderItems = validatedOrderData.items;

//     const newOrder = new Order({
//       cartId: validatedOrderData.cartId,
//       userId: validatedOrderData.userId,
//       items: orderItems,
//     });

//     const savedOrder = await newOrder.save();

//     res
//       .status(201)
//       .json({ message: "Order created successfully", order: savedOrder });
//   } catch (error) {
//     res
//       .status(400)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };
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

    for (const requestedItem of validatedOrderData.items) {
      const productId = requestedItem.productId;
      const requestedQuantity = requestedItem.quantity;
      const status = requestedItem.status; // Get status from the request

      // Debug log: Check productId and quantity
      console.log(
        `Updating product ${productId}, Decrementing stock by ${requestedQuantity}`
      );

      // Update product stock
      const updateResult = await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -requestedQuantity },
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

exports.getOrders = async (req, res) => {
  try {
    // Retrieve orders by userId
    // const orders = await Order.find().populate("userId").populate("items.productId")
    const orders = await Order.find()
  .populate({
    path: "userId",
    select: "name", // Select only the "name" field from the userId object
  })
  .populate({
    path:"items.productId",
    select:"name stock price quantity status"
  });     

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


exports.updateOrderItemStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId;        // Extract order ID from URL parameter
    const itemId = req.params.itemId;           // Extract item ID from URL parameter
    const newItemStatus = req.body.status;  // Extract new status from request body

    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find and update the status of the specific item within the order's items array
    const targetItem = order.items.find(item => item._id.toString() === itemId);
    if (!targetItem) {
      return res.status(404).json({ message: 'Item not found in order' });
    }
    targetItem.status = newItemStatus;

    // Save the updated order
    await order.save();

    res.status(200).json({ message: 'Item status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
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
