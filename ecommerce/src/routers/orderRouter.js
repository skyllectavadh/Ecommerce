const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController")

router.post("/createProductOrder",orderController.createProductOrder)
router.get("/getOrdersByUserId/:userId",orderController.getOrderByUserId)
router.get("/getOrders",orderController.getOrders)


module.exports = router;