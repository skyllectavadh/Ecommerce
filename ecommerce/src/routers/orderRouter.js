const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/createProductOrder", orderController.createProductOrder);
router.get("/getOrdersByUserId/:userId", orderController.getOrderByUserId);
router.get("/getOrders", orderController.getOrders);
router.get("/popular-product", orderController.get);

router.put('/updateOrderItemStatus/:orderId/:itemId', orderController.updateOrderItemStatus);
router.delete('/deleteOrderItem/:orderId/:itemId', orderController.deleteOrderItem);


module.exports = router;
