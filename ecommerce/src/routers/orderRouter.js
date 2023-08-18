const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/createProductOrder", orderController.createProductOrder);
router.get("/getOrdersByUserId/:userId", orderController.getOrderByUserId);
router.get("/getOrders", orderController.getOrders);
router.put('/updateOrderItemStatus/:orderId/:itemId', orderController.updateOrderItemStatus);

// router.put('/updateOrderStatus/:orderId', orderController.updateOrderStatus);
// app.put("/updateItemStatus/:cartId/:itemId", yourController.updateOrderItemStatus);



module.exports = router;
