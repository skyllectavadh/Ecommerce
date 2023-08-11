const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const auth = require('../middleware/auth')

router.post("/createCartProduct",cartController.createCartProduct)
router.get("/cart/:userId",auth,cartController.getCartByUserId)
router.get("/cart",cartController.getcart)
router.delete('/cart/:userId/items/:itemId', cartController.removeItemFromCart);
router.patch('/cart/:userId/items/:itemId', cartController.updateCartItem);
router.get("/cart/:userId/totalPrice", auth, cartController.getTotalPriceByUserId);

// router.put('/cart/:userId/:productId', cartController.updateCartItemQuantity);






























// router.post("/createCartProduct", async (req, res) => {
//     try {
//       const { error } = validateCart(req.body);
//       console.log(req.body);
//       if (error) {
//         return res.status(400).send(error.details);
//       }
//       console.log(req.file);
  
//       const cartData = {
//         ...req.body, 
//       };
  
//       const cart = new Cart(cartData);
//       await cart.save();
  
//       res.send("Cart created successfully");
//     } catch (error) {
//       console.error("Error creating cart:", error);
//       res.status(500).send("Internal server error");  
//     }
//   });



// router.post("/createCartProduct", async (req, res) => {
//   try {
//     const { error } = validateCart(req.body);
//     if (error) {
//       // Return a more descriptive error message to the client.
//       return res.status(400).send(error.details.map((err) => err.message));
//     }

//     console.log(req.body);

//     const cartData = {
//       ...req.body,
//     };

//     const cart = new Cart(cartData);
//     await cart.save();

//     res.send("Cart created successfully");
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     // Return a more descriptive error message to the client.
//     res.status(500).send("Error creating cart: " + error.message);
//   }
// });

// router.get("/cart", async (req, res) => {
//   try {
//     // Retrieve all cart  records
//     const carts = await Cart.find();

//     res.send(carts);
//   } catch (error) {
//     console.error("Error cart :", error);
//     res.status(500).send("Internal server error");
//   }
// });

// router.get("/cart/:id", async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.id);
    
//     const getCartById = await Cart.findOne({ userId }).populate('userId');
//     res.send(getCartById);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

// router.get("/cart/:id", async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.id);
//     // const productId = new mongoose.Types.ObjectId(req.params.pid);
   
//     const getCartById = await Cart.find({ userId }).populate('userId')
//     res.send(getCartById);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });


// router.get("/cart/:id", async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.id);

//     const getCartById = await Cart.findOne({ userId }).populate([
//       {
//         path: 'userId',
//         // model: 'RegisterUser', 
        
//       },
//       {
//         path: 'items.productId',
//         select: '_id name colour'
//         // model: 'Product', 
//       },
//     ]);

//     res.send(getCartById);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });


module.exports = router;

 