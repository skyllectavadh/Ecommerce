const { Wishlist,validateWishlist } = require("../models/wishlistModel");
const { Product } = require("../models/productModel");


exports.addProductToWishlist = async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateWishlist(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    console.log("dasd", req.body);
    const { items, userId } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Invalid items array" });
    }

    const productId = items[0].productId; // Assuming you want to add the first product in the array

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find or create the user's wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // If wishlist doesn't exist, create a new one
      wishlist = new Wishlist({
        userId: userId,
        items: [{ productId: productId }],
      });
      await wishlist.save();
    } else {
      // Check if the product already exists in the wishlist
      const existingProduct = wishlist.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        return res.status(400).json({ error: "Product already in wishlist" });
      }

      // Add the product to the existing wishlist
      wishlist.items.push({ productId });
      await wishlist.save();
    }

    return res.status(200).json({
      success: true,
      message:"Wishlist created successfully",
      product: wishlist,
      
    });
    // res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};



exports.getWishlistByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the wishlist for the given userId and populate the userId and items with product details
    const wishlist = await Wishlist.findOne({ userId }).populate([
      { path: "userId", select: "-password -confirmPassword" }, // Replace with the fields you want to select from the user document
      { path: "items.productId" },
    ]);

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    return  res.status(200).json({
      success: true,
      message:"Wishlist fetch successfully",
      product: wishlist,
      
    });
    //  res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      // wishlist: wishlists,
      
    });
    // res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteProductFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the wishlist for the given userId
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(500).json({
        success: false,
        message:"Wishlist not found",
        // wishlist: wishlists,
        
      });
      //  res.status(404).json({ error: "Wishlist not found" });
    }

    // Remove the product from the wishlist's items array
    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message:"Deleted successfully",
      product: wishlist,
      
    });
    //  res.status(200).json(wishlist);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      // wishlist: wishlists,
      
    });
    // res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllWishlists = async (req, res) => {
  try {
    // Retrieve all wishlists
    const wishlists = await Wishlist.find();

    return res.status(200).json({
      success: true,
      message:"Wishlist fetch successfully",
      wishlist: wishlists,
      
    });
    //  res.status(200).json(wishlists);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:"Internal server error",
      // wishlist: wishlists,
      
    });
    // res.status(500).json({ error: "Internal server error" });
  }
};




