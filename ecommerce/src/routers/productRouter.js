const express = require("express");
const router = express.Router();
const { upload } = require("../models/productModel");
const productController = require("../controllers/productController");



router.post("/createProduct",upload.single("image"),productController.createProduct);
router.get("/products",productController.getProducts)
router.get("/product/:name",productController.getProductByName)
router.delete("/product/:id",productController.deleteProduct)
router.patch("/updateProduct/:productId",productController.updateProduct)

module.exports = router;





























//   router.post("/createProduct", upload.single("image"), async (req, res) => {
//   try {
//     const { error } = validateProduct(req.body);
//     console.log(req.body);
//     if (error) {
//       return res.status(400).send(error.details);
//     }
//     console.log(req.file);
//     const imageFilename = req.file.filename; // Get the filename of the uploaded image

//     const productData = {
//       ...req.body, // Copy the product data from req.body
//       image: imageFilename, // Assign the image filename to the image field
//     };

//     const product = new Product(productData);
//     await product.save();

//     res.send("Product created successfully");
//   } catch (error) {
//     console.error("Error creating product:", error);
//     res.status(500).send("Internal server error");
//   }
// });
// router.get("/products", async (req, res) => {
//   //org
//   try {
//     const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters or default to 1
//     // console.log("page",page);
//     const limit = 10; // Number of records to retrieve per page
//     const skip = (page - 1) * limit; // Calculate the number of records to skip
//     // console.log("skip",skip);
//     let data = {};

//     if (req.query.search) {
//       data.name = {
//         $regex: req.query.search,
//         $options: "i",
//       };
//     }

//     const count = await Product.countDocuments(data); // Get the total count of matching documents
//     // console.log("count",count);
//     const totalPages = Math.ceil(count / limit); // Calculate the total number of pages
//     // console.log("tpage",totalPages);

//     let getProductsQuery = Product.find(data).skip(skip).limit(limit);

//     // Check if "sort" and "order" query parameters are provided
//     if (req.query.sort && req.query.order) {
//       const sortField = req.query.sort;
//       // console.log("sofi",sortField);
//       const sortOrder = req.query.order === "desc" ? -1 : 1;
//       // console.log("soOr",sortOrder);
//       getProductsQuery = getProductsQuery.sort({ [sortField]: sortOrder });
//       // console.log(getProductsQuery);
//     }

//     const getProducts = await getProductsQuery;

//     res.status(200).json({
//       totalPages,
//       currentPage: page,
//       products: getProducts,
//     });
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
// router.get("/product/:name", async (req, res) => {
//   try {
//     const name = req.params.name;

//     // Find all product records with the matching name
//     const productsByName = await Product.find({ name });

//     if (productsByName.length === 0) {
//       return res.status(404).send("No products found with this name");
//     }

//     res.send(productsByName);
//   } catch (error) {
//     console.error("Error products:", error);
//     res.status(500).send("Internal server error");
//   }
// });
// router.delete("/product/:id", async (req, res) => {
//   try {
//     const deleteProduct = await Product.findByIdAndDelete(req.params.id);
//     if (!req.params.id) {
//       return res.status(400).send();
//     }
//     res.send(deleteProduct);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
//// router.patch("/updateProduct/:productId", async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const updatedProductData = req.body;

//     // Find the product by ID and update its data
//     const updatedProduct = await Product.findByIdAndUpdate(
//       productId,
//       { $set: updatedProductData },
//       { new: true }
//     );

//     if (!updatedProduct) {
//       return res.status(404).send("Product not found");
//     }

//     res.send(updatedProduct);
//   } catch (error) {
//     console.error("Error product:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// router.get("/products", async (req, res) => {
//   try {
//     let data = {}

//     if(req.query.search) {
//       data.name = {
//         $regex: req.query.search,
//         $options: 'i'
//       }
//     }
//     const getProducts = await Product.find(data);
//     res.status(200).send(getProducts);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get("/product/:category", async (req, res) => {
//   try {
//     const category = req.params.category;

//     // Find all product records with the matching category
//     const productsByCategory = await Product.find({ category });

//     if (productsByCategory.length === 0) {
//       return res.status(404).send("No products found with this category");
//     }

//     res.send(productsByCategory);
//   } catch (error) {
//     console.error("Error products:", error);
//     res.status(500).send("Internal server error");
//   }
// });

//
