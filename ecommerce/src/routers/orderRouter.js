const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController")

router.post("/createProductOrder",orderController.createProductOrder)
module.exports = router;