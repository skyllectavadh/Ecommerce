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

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
    // res.status(200).json({
    //   success: true,
    //   message: "Product updated successfully.",
    //   updatedProduct: updatedProduct,
    // });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "An error occurred",
    });
    // res
    //   .status(400)
    //   .json({ message: "An error occurred", error: error.message });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const itemId = req.params.itemId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
      // res.status(404).json({ message: "Order not found" });
    }

    const item = order.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in order",
      });
      //  res.status(404).json({ message: "Item not found in order" });
    }

    if (order.items.length === 1) {
      // Delete the entire order if it's the last item
      await Order.findByIdAndDelete(orderId);

      // Find the product associated with the deleted item
      const productId = item.productId;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
        //  res.status(404).json({ message: "Product not found" });
      }

      // Increment the product's stock by the quantity of the deleted item
      product.stock += item.quantity;

      // Save the updated product
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Order and item deleted successfully",
      });
      // res
      //   .status(200)
      //   .json({ message: "Order and item deleted successfully" });
    } else {
      // Find the product associated with the deleted item
      const productId = item.productId;
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
        // res.status(404).json({ message: "Product not found" });
      }

      // Increment the product's stock by the quantity of the deleted item
      product.stock += item.quantity;

      // Save the updated product
      await product.save();

      // Remove the item from the order's items array
      order.items = order.items.filter(
        (item) => item._id.toString() !== itemId
      );

      // Save the updated order
      await order.save();
      res.status(200).json({
        success: true,
        message: "Item deleted successfully",
        order: order,
      });
      // res.status(200).json({ message: "Item deleted successfully", order });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
    // .status(500)
    // .json({ message: "An error occurred", error: error.message });
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
        path: "items.productId",
        select: "name stock price quantity status",
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders: orders,
    });
    // res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
    // res
    //   .status(500)
    //   .json({ message: "An error occurred", error: error.message });
  }
};

exports.updateOrderItemStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId; // Extract order ID from URL parameter
    const itemId = req.params.itemId; // Extract item ID from URL parameter
    const newItemStatus = req.body.status; // Extract new status from request body

    // Find the order by its ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
      // res.status(404).json({ message: "Order not found" });
    }

    // Find and update the status of the specific item within the order's items array
    const targetItem = order.items.find(
      (item) => item._id.toString() === itemId
    );
    if (!targetItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in order",
      });
      // res.status(404).json({ message: "Item not found in order" });
    }
    targetItem.status = newItemStatus;

    // Save the updated order
    await order.save();

    // res
    //   .status(200)
    //   .json({ message: "Item status updated successfully", order });
    res.status(200).json({
      success: true,
      message: "Item status updated successfully",
      order: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred", error: error.message 
    });
    // res
    //   .status(500)
    //   .json({ message: "An error occurred", error: error.message });
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
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      orders: orders,
    });
    // res.status(200).json({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    // res
    //   .status(500)
    //   .json({ message: "An error occurred", error: error.message });
    res.status(500).json({
      success: false,
      message: "An error occurred", error: error.message 
    });
  }
};
