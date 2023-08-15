const { Cart, validateCart } = require("../models/cartModel");
const mongoose = require('mongoose');
const { Product } = require("../models/productModel");

// exports.createCartProduct = async (req, res) => {
//   try {
//     const { error } = validateCart(req.body);
//     if (error) {
//       return res.status(400).send(error);
//     }

//     // console.log(req.body);

//     const { userId, items } = req.body;

//     let existingCart = await Cart.findOne({ userId });

//     if (existingCart) {
//       // console.log("eC", existingCart);
//       // If cart exists, check if the productId already exists in the cart items
//       // console.log("existing",existingCart);

//       for (const newItem of items) {
//         // console.log("itims",items);
//         // console.log("newitm",newItem);
//         const existingItemIndex = existingCart.items.findIndex(
//           (item) => item.productId.toString() === newItem.productId
//           );
          
//           // console.log("existingItemIndex",existingItemIndex)
//         if (existingItemIndex !== -1) {
//           // If the productId already exists, increment the quantity
//           existingCart.items[existingItemIndex].quantity += newItem.quantity;
//         } else {
//           // If the productId doesn't exist, add the new item to the existing cart's items array
//           existingCart.items.push(newItem);
//         }
//       }

//       await existingCart.save();
//     } else {
//       // If cart doesn't exist, create a new cart
//       const cartData = {
//         userId,
//         items,
//       };

//       const cart = new Cart(cartData);
//       await cart.save();
//     }

//     res.send("Cart products added successfully");
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).send("Error creating cart: " + error.message);
//   }
// };
// exports.createCartProduct = async (req, res) => {
//   try {
//     const { error } = validateCart(req.body);
//     if (error) {
//       return res.status(400).send(error);
//     }

//     const { userId, items } = req.body;

//     let existingCart = await Cart.findOne({ userId });

//     for (const newItem of items) {
//       const product = await Product.findById(newItem.productId); // Assuming you have a Product model

//       if (!product) {
//         return res.status(400).send(`Product with ID ${newItem.productId} not found`);
//       }

//       if (newItem.quantity > product.stock) {
//         return res.status(400).send(`Quantity of product:${product.name} is more then available stock.`);
//       }
//     }

//     if (existingCart) {
//     // If cart exists, check if the productId already exists in the cart items
//     // console.log("existing",existingCart);

//     for (const newItem of items) {
//       // console.log("itims",items);
//       // console.log("newitm",newItem);
//       const existingItemIndex = existingCart.items.findIndex(
//         (item) => item.productId.toString() === newItem.productId
//         );
        
//         // console.log("existingItemIndex",existingItemIndex)
//       if (existingItemIndex !== -1) {
//         // If the productId already exists, increment the quantity
//         existingCart.items[existingItemIndex].quantity += newItem.quantity;
//       } else {
//         // If the productId doesn't exist, add the new item to the existing cart's items array
//         existingCart.items.push(newItem);
//       }
//     }

//       await existingCart.save();
//     } else {
//        // If cart doesn't exist, create a new cart
//     const cartData = {
//       userId,
//       items,
//     };

//     const cart = new Cart(cartData);

//       await cart.save();
//     }

//     res.send("Cart products added successfully");
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).send("Error creating cart: " + error.message);
//   }
// };

function getTotalQuantityOfProduct(existingCart, productId) {
  let totalQuantity = 0;
  
  for (const item of existingCart.items) {
    if (item.productId.toString() === productId) {
      totalQuantity += item.quantity;
    }
  }

  return totalQuantity;
}

exports.createCartProduct = async (req, res) => {
  try {
    const { error } = validateCart(req.body);
    if (error) {
      return res.status(400).send(error);
    }

    const { userId, items } = req.body;

    let existingCart = await Cart.findOne({ userId });

    for (const newItem of items) {
      const product = await Product.findById(newItem.productId); // Assuming you have a Product model
      
      if (!product) {
        return res.status(400).json({
          success: false, 
          message: `Product with ID ${newItem.productId} not found`,
        });
        
      }

      const totalQuantityInCart = existingCart
        ? getTotalQuantityOfProduct(existingCart, newItem.productId)
        : 0;

      const totalRequestedQuantity = totalQuantityInCart + newItem.quantity;

      if (totalRequestedQuantity > product.stock) {
        return res.status(400).json({
          success: false, 
          message: `Total quantity of ${product.name} is more then available stock`,
        });
        
      }
    }

    if (existingCart) {
      // console.log("eC", existingCart);
    // If cart exists, check if the productId already exists in the cart items
    // console.log("existing",existingCart);

    for (const newItem of items) {
      // console.log("itims",items);
      // console.log("newitm",newItem);
      const existingItemIndex = existingCart.items.findIndex(
        (item) => item.productId.toString() === newItem.productId
        );
        
        // console.log("existingItemIndex",existingItemIndex)
      if (existingItemIndex !== -1) {
        // If productId already exists, increment the quantity
        existingCart.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // If the productId doesn't exist, add the new item to the existing cart's items array
        existingCart.items.push(newItem);
      }
    }

      await existingCart.save();
    } else {
       // If cart doesn't exist, create a new cart
    const cartData = {
      userId,
      items,
    };

    const cart = new Cart(cartData);

      await cart.save();
    }
    res.status(200).json({
      success: true,
      // product: product,
      message:"Cart products added successfullys",      
    });
    // send("Cart products added successfully");
  } catch (error) {
    console.error("Error creating carts:", error);
    res.status(500)
    .send("Error creating carts: " + error.message);
  }
};


exports.removeItemFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
   
    const existingCart = await Cart.findOne({ userId });

    if (!existingCart) {
      return res.status(404).send("Cart not found");
    }

    
    const itemIndex = existingCart.items.findIndex(item => item._id.toString() === itemId);
    // console.log("existing cart",itemIndex);


    if (itemIndex === -1) {
      return res.status(404).send("Item not found in the cart");
    }    
    const removedItem = existingCart.items[itemIndex];   

    existingCart.items.splice(itemIndex, 1);
    
    const updatedCart = await existingCart.save();
    
    const response = {
      success:true,
      message: "Item removed from the cart successfully",
      cart: updatedCart,
      removedItem: removedItem,
    };

    res.send(response); 
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).send("Error removing item from cart: " + error.message);
  }
};

exports.getcart = async (req, res) => {
  try {
    // Retrieve all cart  records
    const carts = await Cart.find();
    res.send(carts);
  } catch (error) {
    console.error("Error cart :", error);
    res.status(500).send("Internal server error");
  }
};

exports.getCartByUserId = async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.userId);
  
      const getCartById = await Cart.find({ userId }).populate([
        {
          path: 'userId',
          select:'_id name email mobile role',
          model: 'RegisterUser',           
        },
        {
          path: 'items.productId',
          select: '_id name price colour image stock',
          model: 'Product',
        },
      ]);
  
      res.send(getCartById);  
    } catch (error) { 
      console.log(error);
      res.status(400).send(error);
    }
  };


  // exports.updateCartItem = async (req, res) => {
  //   try {
  //     const { userId, itemId } = req.params;
  //     const { quantity } = req.body; // Assuming the request body contains the updated quantity value
  
  //     const existingCart = await Cart.findOne({ userId });
  
  //     if (!existingCart) {
  //       return res.status(404).send("Cart not found");
  //     }
  
  //     const itemIndex = existingCart.items.findIndex(item => item._id.toString() === itemId);
  
  //     if (itemIndex === -1) {
  //       return res.status(404).send("Item not found in the cart");
  //     }
  
  //     // Update the quantity of the item in the cart
  //     existingCart.items[itemIndex].quantity = quantity;
  
  //     const updatedCart = await existingCart.save();
  
  //     const response = {
  //       message: "Quantity updated in the cart successfully",
  //       cart: updatedCart,
  //       updatedItem: existingCart.items[itemIndex],
  //     };
  
  //     res.send(response);
  //   } catch (error) {
  //     console.error("Error updating quantity in cart:", error);
  //     res.status(500).send("Error updating quantity in cart: " + error.message);
  //   }
  // };
  

  exports.updateCartItem = async (req, res) => {
    try {
      const { userId, itemId } = req.params;
      const { quantity } = req.body; // Updated quantity
  
      const existingCart = await Cart.findOne({ userId });
  
      if (!existingCart) {
        return res.status(404).send("Cart not found");
      }
  
      const itemIndex = existingCart.items.findIndex(item => item._id.toString() === itemId);
  
      if (itemIndex === -1) {
        return res.status(404).send("Item not found in the cart");
      }
  
      const updatedItem = existingCart.items[itemIndex];
      const product = await Product.findById(updatedItem.productId); // Fetch product
  
      if (!product) {
        return res.status(400).send(`Product with ID ${updatedItem.productId} not found`);
      }
  
      const totalQuantityInCart = getTotalQuantityOfProduct(existingCart, updatedItem.productId);
      const totalRequestedQuantity = totalQuantityInCart + quantity;
  
      if (totalRequestedQuantity > product.stock) {
        return res.status(400).send(`Total quantity is more than available stock for ${product.name}`);
      }
  
      // Update the quantity of the item in the cart
      existingCart.items[itemIndex].quantity = quantity;
  
      const updatedCart = await existingCart.save();
  
      const response = {
        success:true,
        message: "Quantity updated in the cart successfully",
        cart: updatedCart,
        updatedItem: existingCart.items[itemIndex],
      };
  
      res.send(response);
    } catch (error) {
      console.error("Error updating quantity in cart:", error);
      res.status(500).send("Error updating quantity in cart: " + error.message);
    }
  };
  
  exports.getTotalPriceByUserId = async (req, res) => {
    try {
      const userId = new mongoose.Types.ObjectId(req.params.userId);
  
      const totalPricePipeline = [
        {
          $match: { userId }
        },
        {
          $unwind: "$items"
        },
        {
          $lookup: {
            from: "products", // collection name is "products"
            foreignField: "_id",  //field from products collection
            localField: "items.productId",//carts collection items.productId
            as: "product"    //new field to store joined data
          }
        },
        {
          $unwind: "$product"
        },
        {
          $group: {
            _id: "$userId",
            totalPrice: { $sum: { $multiply: ["$items.quantity", "$product.price"] } }
          }
        }
      ];
      const totalPriceResult = await Cart.aggregate(totalPricePipeline);
      // console.log("totalPricePipeline",totalPricePipeline);      
      console.log("totalPriceResult",totalPriceResult);
      if (totalPriceResult.length === 0) {
        return res.status(404).send("No cart found for the given user.");
      }
  
      res.send({ totalPrice: totalPriceResult[0].totalPrice });
    } catch (error) {
      console.error("Error calculating total price:", error);
      res.status(500).send("Error calculating total price: " + error.message);
    }
  };

  
  



// exports.createCartProduct = async (req, res) => {
//   try {
//     const { error } = validateCart(req.body);
//     if (error) {
//       return res.status(400).send(error.details.map((err) => err.message));
//     }

//     console.log(req.body);

//     const { userId, items } = req.body;
    
//     let existingCart = await Cart.findOne({ userId });

//     if (existingCart) {
//       console.log("eC",existingCart);
//       //If cart exists, add the new items to the existing cart's items array
      
//       existingCart.items.push(...items);
//       await existingCart.save();
//     } else {
//       // If cart doesn't exist, create a new cart
//       const cartData = {
//         userId,
//         items,
//       };

//       const cart = new Cart(cartData);
//       await cart.save();
//     }

//     res.send("Cart products added successfully");
//   } catch (error) {
//     console.error("Error creating cart:", error);
//     res.status(500).send("Error creating cart: " + error.message);
//   }
// };







































  

// exports.updateCartItemQuantity = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;
//     const { quantity } = req.body;

//     // Find the cart for the given userId
//     const existingCart = await Cart.findOne({ userId });

//     if (!existingCart) {
//       return res.status(404).send("Cart not found");
//     }
//     console.log("exitcard",existingCart);
//     // Find the index of the item with the given productId in the existing cart's items array
//     const itemIndex = existingCart.items.findIndex((item) => item.productId === productId);
//       console.log("itemIN",existingCart.items);

//     if (itemIndex === -1) {
//       return res.status(404).send("Product not found in cart");
//     }

//     // Update the quantity of the item
//     existingCart.items[itemIndex].quantity = quantity;

//     await existingCart.save();

//     res.send("Cart item quantity updated successfully");
//   } catch (error) {
//     console.error("Error updating cart item quantity:", error);
//     res.status(500).send("Error updating cart item quantity: " + error.message);
//   }
// };



  // exports.removeItemFromCart = async (req, res) => { //3
//   try {
//     const { userId, itemId } = req.params;

//     // Find the cart with the given userId
//     const existingCart = await Cart.findOne({ userId });

//     if (!existingCart) {
//       return res.status(404).send("Cart not found");
//     }

//     // Find the index of the item to remove in the cart's items array
//     const itemIndex = existingCart.items.findIndex(item => item._id.toString() === itemId);

//     if (itemIndex === -1) {
//       return res.status(404).send("Item not found in the cart");
//     }

//     // Remove the item from the items array
//     existingCart.items.splice(itemIndex, 1);

//     // Save the updated cart
//     const updatedCart = await existingCart.save();

//     // Prepare the response object with success message and updated cart
//     const response = {
//       message: "Item removed from the cart successfully",
//       cart: updatedCart,
//     };

//     res.send(response); // Send the response object containing both success message and updated cart
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).send("Error removing item from cart: " + error.message);
//   }
// };

// exports.createCartProduct = async (req, res) => {
//   try {
//     const { error } = validateCart(req.body);
//     if (error) {
      
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
// };

// exports.removeItemFromCart = async (req, res) => { //2
//   try {
//     const { userId, itemId } = req.params;

//     // Find the cart with the given userId
//     const existingCart = await Cart.findOne({ userId });

//     if (!existingCart) {
//       return res.status(404).send("Cart not found");
//     }

//     // Find the index of the item to remove in the cart's items array
//     const itemIndex = existingCart.items.findIndex(item => item._id.toString() === itemId);

//     if (itemIndex === -1) { 
//       return res.status(404).send("Item not found in the cart");
//     }

//     // Remove the item from the items array
//     existingCart.items.splice(itemIndex, 1);

//     // Save the updated cart
//     const updatedCart = await existingCart.save();

//     res.send(updatedCart); // Send the updated cart as the response
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).send("Error removing item from cart: " + error.message);
//   }
// };


// exports.removeItemFromCart = async (req, res) => {//1
//   try {
//     const { userId, itemId } = req.params;

//     // Find the cart with the given userId
//     const existingCart = await Cart.findOne({ userId });

//     if (!existingCart) {
//       return res.status(404).send("Cart not found");
//     }

//     // Find the index of the item to remove in the cart's items array
//     const itemIndex = existingCart.items.findIndex(item => item._id.toString() === itemId);

//     if (itemIndex === -1) {
//       return res.status(404).send("Item not found in the cart");
//     }

//     // Remove the item from the items array
//     existingCart.items.splice(itemIndex, 1);

//     // Save the updated cart
//     await existingCart.save();

//     res.send("Item removed from the cart successfully");
//   } catch (error) {
//     console.error("Error removing item from cart:", error);
//     res.status(500).send("Error removing item from cart: " + error.message);
//   }
// };