// // // app.post("/createUser", async (req, res) => {
// // //     try {
// // //       const registerUser = await validateUser(req.body);
// // //       console.log(registerUser);
  
// // //       // Check if the mobile or email already exists in the database
// // //       const existingUser = await RegisterUser.findOne({
// // //         $or: [{ mobile: registerUser.mobile }, { email: registerUser.email }],
// // //       });
  
// // //       if (existingUser) {
// // //         res.status(409).send("Mobile or email already exists");
// // //       } else {
// // //         const newUser = new RegisterUser(registerUser);
// // //         await newUser.save();
// // //         res.send("RegisterUser data added to the database");
// // //       }
// // //     } catch (error) {
// // //       console.error("Error adding registerUser data:", error);
// // //       res.status(400).send(error.details);
// // //     }
// // //   });
  

// //   // // Connect to MongoDB

// // // mongoose
// // //   .connect("mongodb://localhost:27017/ecommercedb", {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true,
// // //   })
// // //   .then(() => {
// // //     console.log("Connected to MongoDB");
// // //   })
// // //   .catch((err) => {
// // //     console.error("Error connecting to MongoDB:", err);
// // //   });
// // // -----------------------------------------------------------------------------------------//


// // // const userSchema = new mongoose.Schema({        // Create a registerUser schema
// // //   name: {
// // //     type: String,
// // //     required: true,
// // //     minlength: 2,
// // //     maxlength: 10,
// // //   },
// // //   mobile: {
// // //     type: Number,
// // //     minlength: 10,
// // //   },
// // //   email: {
// // //     type: String,
// // //     minlength: 5,
// // //     maxlength: 50,
// // //   },
// // //   password: {
// // //     type: String,
// // //     minlength: 2,
// // //     maxlength: 255,
// // //   },
// // // });

// // // // Create a RegisterUser model
// // // const RegisterUser = mongoose.model("RegisterUser", userSchema);

// // // // RegisterUser-defined function to validate the registerUser
// // // async function validateUser(registerUser) {
// // //   const JoiSchema = Joi.object({
// // //     name: Joi.string().max(10).required(),
// // //     mobile: Joi.number().min(10).required(),
// // //     email: Joi.string().email().min(5).max(50).required(),
// // //     password: Joi.string().min(2).max(255).required(),
// // //   }).options({ abortEarly: false });

// // //   const { error, value } = JoiSchema.validate(registerUser);

// // //   if (error) {
// // //     throw error;
// // //   }

// // //   // Hash the password
// // //   const salt = await bcrypt.genSalt(10);
// // //   const hashedPassword = await bcrypt.hash(value.password, salt);

// // //   // Return the validated registerUser object with the hashed password
// // //   return {
// // //     ...value,
// // //     password: hashedPassword,
// // //   };
// // // }


// // // Start the server
// // // app.listen(6000, () => {
// // //   console.log("Server listening on port 6000");
// // // });


// // // const Joi = require("joi");
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const bcrypt = require("bcryptjs");

// // // const app = express();
// // // app.use(express.json());

// // // const connectToMongoDB = require("./src/db/connection"); // required connToMoDB

// // // // Require the registerRouter
// // // const registerRouter = require("./src/routers/registerRouter");

// // // // Use the registerRouter middleware
// // // app.use("/createUser", registerRouter);





// // // Routers
// // // app.post("/createUser", async (req, res) => {
// // //   try {
// // //     const registerUser = await validateUser(req.body);  
// // //     console.log(registerUser);

// // //     // Check if the mobile or email already exists in the database
// // //     const existingUser = await RegisterUser.findOne({
// // //       $or: [{ mobile: registerUser.mobile }, { email: registerUser.email }],
// // //     });

// // //     if (existingUser) {
// // //       res.status(409).send("Mobile or email already exists");
// // //     } else {
// // //       const newUser = new RegisterUser(registerUser);
// // //       await newUser.save();
// // //       res.send("RegisterUser data added to the database");
// // //     }
// // //   } catch (error) {
// // //     console.error("Error adding registerUser data:", error);
// // //     res.status(400).send(error.details);
// // //   }
// // // });


// // // app.get("/users", async (req, res) => {
// // //     try {
// // //       const getUsers = await RegisterUser.find({});
// // //       res.send(getUsers);
// // //     } catch (error) {
// // //       res.status(400).send(error);
// // //     }
// // //   });

// // //   app.get("/users/:id", async (req, res) => {
// // //     try {
// // //       const _id = req.params.id;
// // //       const getUserById = await RegisterUser.findById({ _id });
// // //       res.send(getUserById);
// // //     } catch (error) {
// // //       res.status(400).send(error);
// // //     }
// // //   });  


// // // app.patch("/users/:id", async (req, res) => {
// // //     try {
// // //       const _id = req.params.id;
// // //       const { password, ...updateData } = req.body;
  
// // //       if (password) {
// // //         // Hash the new password
// // //         const salt = await bcrypt.genSalt(10);
// // //         const hashedPassword = await bcrypt.hash(password, salt);
// // //         updateData.password = hashedPassword;
// // //       }
  
// // //       const updateUser = await RegisterUser.findByIdAndUpdate(_id, updateData, {
// // //         new: true,
// // //       });
  
// // //       res.send(updateUser);
// // //     } catch (error) {
// // //       res.status(500).send(error);
// // //     }
// // //   });
  

// // //   app.delete("/users/:id", async (req, res) => {
// // //     try {
// // //       const deleteUser = await RegisterUser.findByIdAndDelete(req.params.id);
// // //       if (!req.params.id) {
// // //         return res.status(400).send();
// // //       }
// // //       res.send(deleteUser);
// // //     } catch (error) {
// // //       res.status(500).send(error);
// // //     }
// // //   });
// // // const Joi = require("joi");
// // // const express = require("express");
// // // const mongoose = require("mongoose");
// // // const bcrypt = require("bcryptjs");

// // // const app = express();
// // // app.use(express.json());

// // // // Connect to MongoDB
// // // mongoose
// // //   .connect("mongodb://localhost:27017/ecommercedb", {
// // //     useNewUrlParser: true,
// // //     useUnifiedTopology: true,
// // //   })
// // //   .then(() => {
// // //     console.log("Connected to MongoDB");
// // //   })
// // //   .catch((err) => {
// // //     console.error("Error connecting to MongoDB:", err);
// // //   });

// // // // Create a registerUser schema
// // // const registerUserSchema = new mongoose.Schema({
// // //   name: {
// // //     type: String,
// // //     required: true,
// // //     minlength: 2,
// // //     maxlength: 10,
// // //   },
// // //   mobile: {
// // //     type: Number,
// // //     minlength: 10,
// // //   },
// // //   email: {
// // //     type: String,
// // //     minlength: 5,
// // //     maxlength: 50,
// // //   },
// // //   password: {
// // //     type: String,
// // //     minlength: 2,
// // //     maxlength: 255,
// // //   },
// // // });

// // // // Create a RegisterUser model
// // // const RegisterUser = mongoose.model("RegisterUser", registerUserSchema);

// // // // Create a loginUser schema
// // // const loginUserSchema = new mongoose.Schema({
// // //   email: {
// // //     type: String,
// // //     minlength: 5,
// // //     maxlength: 50,
// // //   },
// // //   password: {
// // //     type: String,
// // //     minlength: 2,
// // //     maxlength: 255,
// // //   },
// // // });

// // // // Create a LoginUser model
// // // const LoginUser = mongoose.model("LoginUser", loginUserSchema);

// // // // Function to validate the loginUser
// // // async function validateLoginUser(loginUser) {
// // //   const JoiSchema = Joi.object({
// // //     email: Joi.string().email().min(5).max(50).required(),
// // //     password: Joi.string().min(2).max(255).required(),
// // //   }).options({ abortEarly: false });

// // //   const { error, value } = JoiSchema.validate(loginUser);

// // //   if (error) {
// // //     throw error;
// // //   }

// // //   return value;
// // // }

// // // // RegisterUser API
// // // app.post("/createUser", async (req, res) => {
// // //   // Same as your existing code...
// // // });

// // // // LoginUser API
// // // app.post("/login", async (req, res) => {
// // //   try {
// // //     const loginUser = await validateLoginUser(req.body);

// // //     // Find the user by email
// // //     const user = await RegisterUser.findOne({ email: loginUser.email });

// // //     // If user not found, return an error
// // //     if (!user) {
// // //       return res.status(404).send("Invalid email or password");
// // //     }

// // //     // Compare the provided password with the hashed password stored in the database
// // //     const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);

// // //     // If passwords don't match, return an error
// // //     if (!isPasswordValid) {
// // //       return res.status(401).send("Invalid email or password");
// // //     }

// // //     // Passwords match, user is authenticated
// // //     // Store the login data in the loginUser collection
// // //     const newLoginUser = new LoginUser({
// // //       email: loginUser.email,
// // //       password: loginUser.password,
// // //     });
// // //     await newLoginUser.save();

// // //     res.send("Login successful");
// // //   } catch (error) {
// // //     console.error("Error during login:", error);
// // //     res.status(500).send("Internal server error");
// // //   }
// // // });

// // // // Start the server
// // // app.listen(6000, () => {
// // //   console.log("Server listening on port 6000");
// // // });
// // // app.post("/login", async (req, res) => {
// // //   try {
// // //     const loginUser = await validateLoginUser(req.body);

// // //     // Find the user by email
// // //     const user = await RegisterUser.findOne({ email: loginUser.email });

// // //     // If user not found, return an error
// // //     if (!user) {
// // //       return res.status(404).send("Invalid email or password");
// // //     }

// // //     // Compare the provided password with the hashed password stored in the database
// // //     const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);

// // //     // If passwords don't match, return an error
// // //     if (!isPasswordValid) {
// // //       return res.status(401).send("Invalid email or password");
// // //     }

// // //     // Passwords match, user is authenticated
// // //     // Store the login data in the loginUser collection
// // //     const newLoginUser = new LoginUser({
// // //       email: loginUser.email,
// // //       password: user.password, // Store the hashed password from the user model
// // //     });
// // //     await newLoginUser.save();

// // //     res.send("Login successful");
// // //   } catch (error) {
// // //     console.error("Error during login:", error);
// // //     res.status(500).send("Internal server error");
// // //   }
// // // });


// // const { LoginUser, validateLoginUser } = require("../models/loginModel");
// // const express = require("express");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const router = express.Router();
// // const mongoose = require("mongoose");

// // const RegisterUser = mongoose.model("RegisterUser");

// // // LoginUser API
// // router.post("/login", async (req, res) => {
// //   try {
// //     const loginUser = await validateLoginUser(req.body);

// //     const user = await RegisterUser.findOne({ email: loginUser.email });

// //     if (!user) {
// //       return res.status(404).send("Invalid email or password");
// //     }

// //     const isPasswordValid = await bcrypt.compare(
// //       loginUser.password,
// //       user.password
// //     );

// //     if (!isPasswordValid) {
// //       return res.status(401).send("Invalid email or password");
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign({ userId: user._id }, "your-secret-key");

// //     const newLoginUser = new LoginUser({
// //       email: loginUser.email,
// //       password: user.password, // Store the hashed password from the user model
// //     });
// //     await newLoginUser.save();

// //     res.send({ token });
// //   } catch (error) {
// //     console.error("Error during login:", error);
// //     res.status(500).send("Internal server error");
// //   }
// // });

// // module.exports = router;


// // async function validateProduct(product) {
// //   const schema = Joi.object({
// //     name: Joi.string().min(2).max(50).required(),
// //     colour: Joi.string().valid("black", "purple", "orange", "yellow").optional(),
// //     brand: Joi.string().required(),
// //     price: Joi.number().required(),
// //     category: Joi.string().required(),
// //     guarantee: Joi.string().required(),
// //     description: Joi.string().required(),
// //   }).options({ abortEarly: false });

// //   const { error, value } = schema.validate(product);

// //   if (error) {
// //     throw error;
// //   }

// //   return value;
// // }


// const multer = require('multer');

// // ...

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = file.originalname.split('.').pop();
//     cb(null, 'product-' + uniqueSuffix + '.' + ext);  
//   }
// });

// const upload = multer({ storage: storage });

// // ...

// app.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     // Save the uploaded image file name to the database
//     const product = new Product({
//       name: req.body.name,
//       colour: req.body.colour,
//       brand: req.body.brand,
//       price: req.body.price,
//       category: req.body.category,
//       guarantee: req.body.guarantee,
//       description: req.body.description,
//       image: req.file.filename // Save the uploaded image file name
//     });

//     await product.save();

//     res.json({ message: 'Product uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // -----------------------------------------------------------------------------
// const Joi = require('joi');

// const validateProduct = (product) => {
//   const schema = Joi.object({
//     name: Joi.string().min(2).max(255).required(),
//     colour: Joi.string().valid('black', 'purple', 'orange', 'yellow'),
//     brand: Joi.string().required(),
//     price: Joi.number().required(),
//     category: Joi.string().required(),
//     guarantee: Joi.string().required(),
//     description: Joi.string().required(),
//     image: Joi.string().required() // Add image validation
//   });
// //the folder structure of my project is something like this ecommerce folder /


//   return schema.validate(product);
// };

// module.exports = { Product, validateProduct };

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // const express = require('express');
// // const multer = require('multer');

// // const app = express();

// // // Define storage for uploaded files
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, 'path/to/save/images'); // Specify the destination folder where you want to save the images
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname); // Use the original filename for the saved image
// //   },
// // });

// // // Create an upload middleware
// // const upload = multer({ storage: storage });

// // // Define the route to handle the image upload
// // app.post('/upload', upload.single('image'), (req, res) => {
// //   // File is uploaded and saved in the specified folder
// //   res.send('Image uploaded successfully!');
// // });

// // // Start the server
// // app.listen(3000, () => {
// //   console.log('Server started on port 3000');
// // });




// ///////////////////////////////////////////////////////////////////////////////////////////////////////-----------------------

// // const express = require("express");
// // const router = express.Router();
// // const bcrypt = require("bcryptjs");
// // const multer = require("multer");

// // // Set up multer storage configuration
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "uploads/"); // Set the destination folder where files will be saved
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname); // Use the original filename
// //   },
// // });

// // const upload = multer({ storage: storage });

// // // Require the RegisterUser model and validateUser function from the userModel.js file
// // const { RegisterUser, validateUser } = require("../models/userModel");

// // router.post("/createUser", upload.none(), async (req, res) => {
// //   try {
// //     console.log(req.body);
// //     const registerUser = await validateUser(req.body);
// //     console.log(registerUser);

// //     // Check if the mobile or email already exists in the db
// //     const existingUser = await RegisterUser.findOne({
// //       $or: [{ mobile: registerUser.mobile }, { email: registerUser.email }],
// //     });

// //     if (existingUser) {
// //       res.status(409).send("Mobile or email already exists");
// //     } else {
// //       const newUser = new RegisterUser(registerUser);
// //       await newUser.save();
// //       res.send("RegisterUser data added to database");
// //     }
// //   } catch (error) {
// //     console.error("Error adding registerUser data:", error);
// //     res.status(400).send(error.details);
// //   }
// // });

// // module.exports = router;

// // In the updated code:

// // We have added the multer middleware package and configured it with a disk storage configuration that specifies where uploaded files should be saved.
// // We create an instance of multer using the configured storage and assign it to the upload variable.
// // In the route handler for /createUser, we use upload.none() middleware to indicate that we expect no files to be uploaded, only form data.
// // Now, when you send the request from Postman's "form-data" section, the form data should be accessible in the req.body object.
// // Make sure to install the multer package by running npm install multer in your project directory before using the updated code.



// /////////////////////////-------------------------------------------------------/////////////////////////////----------------////////
// // To upload an image along with the product data, you can modify the existing code to include image upload functionality using the multer middleware. Here's an updated version of the code that allows image uploading:

// javascript
// // Copy code
// const mongoose = require("mongoose");
// const Joi = require("joi");
// const multer = require("multer");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     minlength: 2,
//     maxlength: 255,
//   },
//   colour: {
//     type: String,
//     enum: ["black", "purple", "orange", "yellow"],
//   },
//   brand: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   guarantee: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String, // assuming you will store the image path in the database
//     required: true,
//   },  
// });

// // const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
// //     cb(null, "uploads/"); // Set the destination folder where files will be saved
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + "-" + file.originalname); // Use a unique filename to avoid conflicts
// //   },
// // });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type. Only JPEG, PNG, and JPG images are allowed."), false);
//   }
// };

// // const upload = multer({ storage: storage, fileFilter: fileFilter });

// // const Product = mongoose.model("Product", productSchema);

// // async function validateProduct(product) {
// //   const schema = Joi.object({
// //     name: Joi.string().min(2).max(50).required(),
// //     colour: Joi.string().valid("black", "purple", "orange", "yellow").optional(),
// //     brand: Joi.string().required(),
// //     price: Joi.number().required(),
// //     category: Joi.string().required(),
// //     guarantee: Joi.string().required(),
// //     description: Joi.string().required(),
// //     // No need to validate the image field as it will be handled by multer
// //   }).options({ abortEarly: false });

// //   const { error, value } = schema.validate(product);

// //   if (error) {
// //     throw error;
// //   }
// //   return value;
// // }

// // module.exports = { Product, validateProduct, upload };
// // In the updated code:

// // We have imported the multer middleware and added it to the code.
// // The multer middleware is configured with a disk storage configuration that specifies where uploaded files should be saved and how to name them.
// // We have added a fileFilter function to specify the allowed file types. In this case, we are allowing JPEG, PNG, and JPG images.
// // The upload middleware is configured with the storage and fileFilter options.
// // We have added an image field to the productSchema, which will store the path of the uploaded image in the database.
// // When validating the product, we don't need to validate the image field explicitly since multer will handle it separately.
// // Finally, we export the upload middleware along with the Product model and validateProduct function so that it can be used in the routes.
// // To use the updated code, make sure to create an "uploads" folder in your project directory to store the uploaded images. Also, update the route handling code to include the upload.single('image') middleware for handling the image upload:

// // javascript
// // Copy code
// // router.post("/createProduct", upload.single("image"), async (req, res) => {
// //   // Rest of the code
// // });
// // In the route handler for creating a product, we use the upload.single("image") middleware to specify that we expect a single file named "image" to be uploaded along with the form data. The uploaded file can then be accessed in the req.file object.




// /////////////////////////////////////////////////////////////////////////////---///////////////////////////////////////////////////////
// // router.post("/createProduct", upload.single("image"), async (req, res) => {
// //   try {
// //     // Get the filename from the uploaded file
// //     const imageFilename = req.file.filename;

// //     // Extract other product data from req.body
// //     const productData = {
// //       name: req.body.name,
// //       colour: req.body.colour,
// //       brand: req.body.brand,
// //       price: req.body.price,
// //       category: req.body.category,
// //       guarantee: req.body.guarantee,
// //       description: req.body.description,
// //       image: imageFilename, // Store the image filename in the image field
// //     };

// //     // Validate the product data
// //     const validatedProductData = await validateProduct(productData);

// //     // Create a new product using the validated data
// //     const newProduct = new Product(validatedProductData);
// //     await newProduct.save();

// //     res.send("Product created successfully");
// //   } catch (error) {
// //     console.error("Error creating product:", error);
// //     res.status(400).send(error.details);
// //   }
// // });


// // const express = require("express");
// // const router = express.Router();
// // const { Product, validateProduct, upload } = require("../models/productModel");

// // router.post("/createProduct", upload.single("image"), async (req, res) => {
// //   try {
// //     const { error } = validateProduct(req.body);
// //     if (error) {
// //       return res.status(400).send(error.details);
// //     }

// //     const imageFilename = req.file.filename; // Get the filename of the uploaded image

// //     const productData = {
// //       ...req.body, // Copy the product data from req.body
// //       image: imageFilename, // Assign the image filename to the image field
// //     };

// //     const product = new Product(productData);
// //     await product.save();

// //     res.send("Product created successfully");
// //   } catch (error) {
// //     console.error("Error creating product:", error);
// //     res.status(500).send("Internal server error");
// //   }
// // });

// // module.exports = router;


// // Certainly! Let's go through the code step by step:

// // 1. The code begins by importing the required modules: `mongoose`, `Joi`, and `multer`. These modules are needed for defining the Mongoose schema, performing data validation, and handling file uploads, respectively.

// // 2. The code defines a Mongoose schema for the product. It specifies various fields such as `name`, `colour`, `brand`, `price`, `category`, `guarantee`, `description`, and `image`. These fields define the structure and data types expected for each product in the database.

// // 3. The code sets up the storage configuration for `multer` using `diskStorage`. It defines the destination folder where uploaded files will be saved (`uploads/`) and the filename to be used for each file. The filename is generated using the current timestamp (`Date.now()`) concatenated with the original filename of the uploaded file. This ensures that each file has a unique name and helps avoid conflicts.

// // 4. A file filter function (`fileFilter`) is defined to check the mimetype of the uploaded file. It allows only JPEG, PNG, and JPG images, while rejecting any other file types. This ensures that only valid image files are accepted.

// // 5. The `multer` middleware is created using the defined storage configuration and file filter. It will be used later in the route handler to handle file uploads.

// // 6. The `Product` model is created using `mongoose.model()`. This model represents the product collection in the MongoDB database and is based on the previously defined `productSchema`.

// // 7. The `validateProduct` function is defined to perform data validation on a product object using `Joi`. It specifies the validation rules for each field in the product schema, such as the allowed data types, required fields, and additional constraints like string length and valid color options. The function returns the validated product data if it passes validation, or throws an error if there are validation errors.

// // 8. Finally, the `Product`, `validateProduct`, and `upload` objects are exported from the module, making them available for other parts of the application that import this file.

// // Overall, this code sets up the Mongoose schema for the product, defines file upload configuration using `multer`, and provides a validation function using `Joi` to ensure that the product data meets the specified requirements.




// // ------------+++++++++++++++////////////////////////////////
// // Certainly! Let's go through the code step by step:

// // 1. The code begins by importing the required modules: `express`, `express.Router()`, and the `Product` model, along with the `validateProduct` function and the `upload` middleware from the `productModel` module.

// // 2. An instance of the Express router is created using `express.Router()`. This router will be used to define the routes for product-related operations.

// // 3. The router defines a POST route handler for creating a new product. It listens for requests to the `/createProduct` endpoint.

// // 4. The route handler uses the `upload.single("image")` middleware to handle the image upload. It expects the file field to be named "image". This middleware will handle the file upload and store the file in the specified destination folder using the previously defined `multer` storage configuration.

// // 5. Inside the route handler, the `validateProduct` function is called to validate the product data received in the request body (`req.body`). It checks if the product data meets the defined validation rules. If there are any validation errors, it returns a 400 response with the details of the validation errors.

// // 6. If the product data passes validation, the code extracts the filename of the uploaded image from `req.file.filename`. This contains the unique filename generated by the `multer` middleware when the file was saved.

// // 7. A new `productData` object is created, which copies the product data from `req.body` using the spread syntax (`...req.body`). It also assigns the extracted image filename to the `image` field of the `productData` object.

// // 8. A new instance of the `Product` model is created using the `productData` object.

// // 9. The `product.save()` method is called to save the product to the database.

// // 10. If the product is successfully saved, a "Product created successfully" response is sent back to the client.

// // 11. If there is an error during the process, such as an error in data validation or saving the product, an error message is logged to the console, and a 500 "Internal server error" response is sent back to the client.

// // 12. Finally, the router is exported from the module to make it available for use in other parts of the application.

// // Overall, this code sets up a route for creating a new product, handles the file upload using `multer`, validates the product data using `Joi`, and saves the product with the image filename to the database using the `Product` model.

// const express = require('express');
// const app = express();
// const MongoClient = require('mongodb').MongoClient;

// const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(express.json());

// app.post('/createUser', (req, res) => {
//   const formData = req.body;

//   // Connect to the MongoDB database
//   client.connect((err) => {
//     if (err) {
//       console.error('Error connecting to MongoDB:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//     // Save the form data to the MongoDB collection
//     collection.insertOne(formData, (err, result) => {
//       if (err) {
//         console.error('Error inserting document:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }

//       console.log('Form data saved to MongoDB:', result.ops);
//       res.status(200).json({ message: 'Form data saved successfully' });
//     });
//   });
// });

// const port = 5000;
// app.listen(port, () => {
//   console.log(`Backend server running on port ${port}`);
// });


// ////////////////////////////////////////////////////////////////////////////

// const express = require("express");
// const router = express.Router();
// const { MongoClient } = require('mongodb');

// const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

//   // Set CORS headers to allow requests from any origin
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Connect to the MongoDB database
//   try {
//     await client.connect();

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//     // Save the form data to the MongoDB collection
//     const result = await collection.insertOne(formData);

//     console.log('Form data saved to MongoDB:', result.ops);
//     res.status(200).json({ message: 'Form data saved successfully' });
//   } catch (error) {
//     console.error('Error inserting document:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });

// module.exports = router;





// const express = require("express");
// const router = express.Router();
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// router.use(cors()); // Enable CORS for all routes in this router

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

//   // Connect to the MongoDB database
//   try {
//     await client.connect();

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//     // Save the form data to the MongoDB collection
//     const result = await collection.insertOne(formData);

//     console.log('Form data saved to MongoDB:', result.ops);
//     res.status(200).json({ message: 'Form data saved successfully' });
//   } catch (error) {
//     console.error('Error inserting document:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const { MongoClient } = require('mongodb');
// const cors = require('cors');

// const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// router.use(cors()); // Enable CORS for all routes in this router

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

//   // Connect to the MongoDB database
//   try {
//     await client.connect();

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//     // Check if the email or mobile number already exists in the database
//     const existingUser = await collection.findOne({
//       $or: [
//         { email: formData.email },
//         { mobile: formData.mobile }
//       ]
//     });

//     if (existingUser) {
//       return res.status(409).json({ message: 'Email or mobile number already exists' });
//     }

//     // Save the form data to the MongoDB collection
//     const result = await collection.insertOne(formData);

//     console.log('Form data saved to MongoDB:', result.ops);
//     res.status(200).json({ message: 'Form data saved successfully' });
//   } catch (error) {
//     console.error('Error inserting document:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });

// module.exports = router;



// // //////////////////////////////////////////////////////////////////
// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const multer = require("multer");
// const { MongoClient } = require('mongodb');
// const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// const cors = require('cors');

// router.use(cors()); // Enable CORS for all routes in this router

// // Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Set the destination folder where files will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// const upload = multer({ storage: storage });

// // Require the RegisterUser model and validateUser function from the userModel.js file
// const { RegisterUser, validateUser } = require("../models/userModel");

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

//   // Connect to the MongoDB database
//   try {
//     await client.connect();

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//     // Check if the email or mobile number already exists in the database
//     const existingUser = await collection.findOne({
//       $or: [
//         { email: formData.email },
//         { mobile: formData.mobile }
//       ]
//     });

//     if (existingUser) {
//       return res.status(409).json({ message: 'Email or mobile number already exists' });
//     }

//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(formData.password, 10);

//     // Remove the confirmPassword field before saving to the database
//     delete formData.confirmPassword;

//     // Save the form data to the MongoDB collection with the hashed password
//     const result = await collection.insertOne({
//       ...formData,
//       password: hashedPassword
//     });

//     console.log('Form data saved to MongoDB:', result.ops);
//     res.status(200).json({ message: 'Form data saved successfully' });
//   } catch (error) {
//     console.error('Error inserting document:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });


// ///////////////////////////////////////////////////
// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const multer = require("multer");
// const { MongoClient } = require('mongodb');
// const mongoURI = 'mongodb://localhost:27017';
// const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// const cors = require('cors');

// router.use(cors()); // Enable CORS for all routes in this router

// // Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Set the destination folder where files will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// const upload = multer({ storage: storage });

// // Require the RegisterUser model and validateUser function from the userModel.js file
// const { RegisterUser, validateUser } = require("../models/userModel");

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

//   // Connect to the MongoDB database
//   try {
//     await client.connect();

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//     // Check if the email or mobile number already exists in the database
//     const existingUser = await collection.findOne({
//       $or: [
//         { email: formData.email },
//         { mobile: formData.mobile }
//       ]
//     });

//     if (existingUser) {
//       return res.status(409).json({ message: 'Email or mobile number already exists' });
//     }

//     // Hash the password and confirmPassword using bcrypt
//     const hashedPassword = await bcrypt.hash(formData.password, 10);
//     const hashedConfirmPassword = await bcrypt.hash(formData.confirmPassword, 10);

//     // Save the form data to the MongoDB collection with the hashed passwords
//     const result = await collection.insertOne({
//       ...formData,
//       password: hashedPassword,
//       confirmPassword: hashedConfirmPassword
//     });

//     console.log('Form data saved to MongoDB:', result.ops);
//     res.status(200).json({ message: 'Form data saved successfully' });
//   } catch (error) {
//     console.error('Error inserting document:', error);
//     res.status(500).send('Internal Server Error');
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// });


// router.patch("/users/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updatedFields = req.body;

//     const user = await RegisterUser.findByIdAndUpdate(userId, updatedFields, {
//       new: true
//     });

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     res.send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
//const token = jwt.sign({ userId: user._id }, 'your-secret-key');: If the user's credentials are valid (email and password match), the code generates a JSON Web Token (JWT) using the jsonwebtoken library. The token is signed with the user's ID (user._id) as the payload and a secret key ('your-secret-key'). This token will be used for subsequent authenticated requests from the client.


// The code `jwt.sign({ userId: user._id }, 'your-secret-key')` generates a JSON Web Token (JWT) using the `jsonwebtoken` library. A JWT is a compact and self-contained way to represent information between two parties securely. It is commonly used for authentication and authorization in web applications.

// Let's break down the code:

// 1. `jwt`: This refers to the `jsonwebtoken` library, which provides the functionality to create, verify, and decode JSON Web Tokens.

// 2. `.sign(payload, secretOrPrivateKey)`: This is the method used to create a new JWT. It takes two main parameters:

//    - `payload`: The payload of the JWT, which contains the information you want to include in the token. It is typically a JavaScript object containing various claims (e.g., user ID, expiration time, issuer, etc.). In this case, the payload is `{ userId: user._id }`, which includes the user's unique identifier (`_id`) as the "userId" claim.

//    - `secretOrPrivateKey`: This is a secret key or private key used to sign the JWT. It's important to keep this key secure and not share it publicly. The JWT is digitally signed using this key to ensure its integrity and authenticity. In the example, the string `'your-secret-key'` is used as the secret key. In a real-world application, you should use a more secure method to store and retrieve the secret, such as using environment variables.

// 3. The `jwt.sign` method returns a string, which is the JWT token generated based on the provided payload and signed with the secret key. The resulting token looks like: `xxxxx.yyyyy.zzzzz`, where each part represents the header, payload, and signature of the JWT, respectively.

// The JWT can then be sent back to the client and used for subsequent authenticated requests. When the client includes the JWT in the request (usually in the "Authorization" header), the server can verify the token's authenticity using the same secret key it used to sign the token. This allows the server to trust the information in the token and identify the user based on the included "userId" claim.
//

//
//
//

// To create a middleware function in your backend code to check for the presence and validity of the JWT token in the request header, you can follow these steps:

// 1. Create a new file (e.g., authMiddleware.js) in your backend project to define the middleware function.

// 2. Implement the middleware function to extract the token from the request header, verify its validity using the secret key, and add the user's information (if the token is valid) to the request object.

// Here's an example of how the authMiddleware.js file might look:

// authMiddleware.js:
// ```javascript
// const jwt = require('jsonwebtoken');

// const secretKey = 'your-secret-key'; // Replace with your actual secret key

// const authMiddleware = (req, res, next) => {
//   // Get the token from the request header
//   const token = req.header('Authorization');

//   // Check if the token exists
//   if (!token) {
//     return res.status(401).send('Unauthorized: No token provided');
//   }

//   try {
//     // Verify the token
//     const decodedToken = jwt.verify(token.replace('Bearer ', ''), secretKey);

//     // Attach the user information to the request object for further processing in other route handlers
//     req.userId = decodedToken.userId; // Assuming your token payload contains the "userId" claim

//     // Move to the next middleware or route handler
//     next();
//   } catch (error) {
//     // If the token verification fails, respond with an error
//     return res.status(403).send('Forbidden: Invalid token');
//   }
// };

// module.exports = authMiddleware;
// ```

// 3. Import and use the authMiddleware in the routes where you want to enforce authentication. For example, if you want to protect a specific route, add the authMiddleware as a second argument before your route handler function.

// loginController.js:
// ```javascript
// const authMiddleware = require('./authMiddleware');

// // ... (other code)

// // Apply the authMiddleware to the route where authentication is required
// router.get('/protectedRoute', authMiddleware, (req, res) => {
//   // Your protected route logic here
//   // Access the authenticated user's information using req.userId
//   res.send('This is a protected route');
// });
// ```

// In this example, the authMiddleware function checks for the presence of the JWT token in the "Authorization" header. If the token exists, it verifies the token's validity using the secret key. If the token is valid, the user's information (e.g., userId) is attached to the request object (`req.userId`) for use in the subsequent route handler.

// Remember to replace `'your-secret-key'` with your actual secret key used for signing and verifying JWT tokens.

// By using this middleware, you can protect specific routes in your backend, ensuring that only authenticated users with valid tokens can access them.


// ===============================================================
// To create an API to remove an item from the `items` array within the cart, you can follow these steps:

// 1. Define a new route and handler function in your cart controller to handle the removal of an item from the cart.
// 2. Use the Mongoose `findOneAndUpdate` method to find the cart based on the `userId` and update it by removing the specific item from the `items` array.
// 3. Return an appropriate response to the client indicating whether the item was successfully removed or not.

// Here's an example implementation of the API to remove an item from the cart:

// Assuming you have a route defined in your Express application:

// ```javascript
// // routes.js
// const express = require('express');
// const router = express.Router();
// const cartController = require('../controllers/cartController');

// router.post('/cart', cartController.createCartProduct);
// router.delete('/cart/:userId/items/:itemId', cartController.removeItemFromCart);

// module.exports = router;
// ```

// And the updated cart controller to handle item removal:

// ```javascript
// // cartController.js
// const { Cart, validateCart } = require("../models/cartModel");
// const mongoose = require("mongoose");

// exports.createCartProduct = async (req, res) => {
//   // ... your existing implementation for creating a cart product ...
// };

// exports.removeItemFromCart = async (req, res) => {
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
// ```

// With this implementation, when you make a DELETE request to the `/cart/:userId/items/:itemId` route, it will find the cart with the provided `userId`, locate the item with the given `itemId` in the cart's `items` array, and remove it. If the cart or item is not found, appropriate error responses will be sent back to the client.


// 999999999999999999999999999999999999999999
// To make a request using Postman to remove the item with the given `itemId` from the cart associated with the `userId`, you should use the DELETE method with the appropriate URL.

// The URL for removing the item from the cart will look like this:

// ```
// DELETE http://your-api-base-url/cart/648ffb51aeff42b047a2255d/items/64c34e40eee21d706a350df9
// ```

// Here's how to break down the URL:

// 1. `http://your-api-base-url`: Replace this with the base URL of your API server where the cart API is hosted.

// 2. `/cart`: This part indicates that you want to perform an operation related to the cart.

// 3. `/648ffb51aeff42b047a2255d`: This is the `userId` of the cart you want to modify. Replace it with the actual `userId` you want to target.

// 4. `/items/64c34e40eee21d706a350df9`: This part specifies that you want to remove the item with the given `itemId` (`64c34e40eee21d706a350df9`) from the cart.

// Make sure you replace `http://your-api-base-url` with the actual base URL of your API server.

// When you send a DELETE request to this URL using Postman, it will trigger the `removeItemFromCart` function in your controller, and the specified item will be removed from the cart associated with the given `userId`.
//
//qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq







// You can indeed use the HTTP PATCH method to update the cart quantity. The PATCH method is often used for partial updates, which makes it suitable for updating specific fields or properties of a resource, like updating the quantity of a product in the cart. Here's how you can implement the cart quantity update using the PATCH method:

// 1. Define the new route in your Express app:

// Assuming you already have an instance of the Express app (e.g., `const app = express();`), you can add the new route as follows:

// ```javascript
// // Assuming you have already defined 'express' and 'updateCartProduct' function
// const express = require('express');
// const { updateCartProduct } = require('./path-to-your-update-cart-handler'); // Import the updateCartProduct function

// const app = express();

// // Define the route for updating the cart quantity
// app.patch('/api/cart/:userId/:productId', updateCartProduct);
// ```

// 2. Modify the handler function for updating the cart quantity:

// Let's update the `updateCartProduct` function to handle the cart quantity update based on the `userId` and `productId` using the PATCH method.

// ```javascript
// // Assuming you have already defined 'Cart' model and other required imports

// exports.updateCartProduct = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;
//     const { quantity } = req.body;

//     // Validate the quantity (you may customize this validation based on your requirements)
//     if (isNaN(quantity) || quantity < 1) {
//       return res.status(400).send("Invalid quantity. Quantity must be a positive number.");
//     }

//     // Find the cart associated with the given userId
//     const existingCart = await Cart.findOne({ userId });

//     if (!existingCart) {
//       return res.status(404).send("Cart not found for the given user.");
//     }

//     // Find the item in the cart based on the productId
//     const cartItem = existingCart.items.find(item => item.productId === productId);

//     if (!cartItem) {
//       return res.status(404).send("Product not found in the cart.");
//     }

//     // Update the quantity of the product in the cart
//     cartItem.quantity = quantity;

//     // Save the updated cart
//     await existingCart.save();

//     res.send("Cart product quantity updated successfully");
//   } catch (error) {
//     console.error("Error updating cart product:", error);
//     res.status(500).send("Error updating cart product: " + error.message);
//   }
// };
// ```

// 3. Sending a request to update the cart quantity using PATCH:

// To update the cart quantity, you can make a PATCH request to the new endpoint you defined. For example:

// ```
// PATCH /api/cart/648ffb51aeff42b047a2255d/647841246d9a86c7417c8fb4

// Request Body:
// {
//   "quantity": 2
// }
// ```

// This request will update the quantity of the product with `productId` "647841246d9a86c7417c8fb4" in the cart associated with `userId` "648ffb51aeff42b047a2255d" to 2. You can modify the request body to update the quantity to any desired value.

// Using the PATCH method allows you to update only the specific fields you need to change, making it a suitable choice for partial updates like this one. Remember to handle errors and implement appropriate security measures in your production code.
//  

exports.createCartProduct = async (req, res) => {
    try {
      const { error } = validateCart(req.body);
      if (error) {
        return res.status(400).send(error);
      }
  
      const { userId, items } = req.body;
  
      let existingCart = await Cart.findOne({ userId });
  
      const aggregatedQuantities = {}; // To accumulate quantities for each productId
  
      for (const newItem of items) {
        const product = await Product.findById(newItem.productId); // Assuming you have a Product model
  
        if (!product) {
          return res.status(400).send(`Product with ID ${newItem.productId} not found`);
        }
  
        if (aggregatedQuantities[newItem.productId]) {
          aggregatedQuantities[newItem.productId] += newItem.quantity;
        } else {
          aggregatedQuantities[newItem.productId] = newItem.quantity;
        }
  
        if (aggregatedQuantities[newItem.productId] > product.stock) {
          return res.status(400).send(`Total quantity exceeds available stock for product ${product.name}`);
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
          // If the productId already exists, increment the quantity
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
  
      res.send("Cart products added successfully");
    } catch (error) {
      console.error("Error creating cart:", error);
      res.status(500).send("Error creating cart: " + error.message);
    }
  };
//    
//2
const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
const socketIO = require('socket.io');
const cors = require('cors');

const http = require("http"); // Import http module
const server = http.createServer(app);
const io = socketIO(server);
 const httpServer = require("http").createServer();
// app.use(express.json());
app.use(cors());


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// const registerRouter = require("./src/routers/registerRouter");
const connectToMongoDB = require("./src/db/connection");    //required connToMoDB 
const router = require("./src/routers/registerRouter");
const loginRouter = require("./src/routers/loginRouter");
const productRouter = require("./src/routers/productRouter");
const cartRouter = require("./src/routers/cartRouter")

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(router);

app.use("/", loginRouter);
app.use("/", productRouter);
app.use("/",cartRouter)

connectToMongoDB()
  .then(() => {
    
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });

  
  // const { Server } = require('socket.io')
  // var port = normalizePort(process.env.PORT || '5000');
  const socket = 4400
app.set('port', 5000);

io.on('connection', (socket) => {
  // Handle socket.io events
  console.log("Connected!!");
});



global.io = require('socket.io')(httpServer);
require('./src/socket/index').init();

httpServer.listen(socket, () => {
  console.info(`Socket server started on ${socket}`);
}); 

// app.use(cors());
// var server = http.createServer(app);
// const httpServer = require("http").createServer();

// const io = new Server(server, {
//   cors: {
//     origins: "https://localhost:4200",
//     methods: ["GET", "POST"]
//   }
// })
// const sio = require("socket.io")(server, {
//   handlePreflightRequest: (req, res) => {
//       const headers = {
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//           "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//           "Access-Control-Allow-Credentials": true
//       };
//       res.writeHead(200, headers);
//       res.end();
//   }
// });

// sio.on("connection", () => {
//   console.log("Connected!");
// });


//1
const cors = require('cors');
const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config();
app.use(express.json());
app.use(cors());

const http = require("http"); // Import http module

// const registerRouter = require("./src/routers/registerRouter");
const connectToMongoDB = require("./src/db/connection");    //required connToMoDB 
const router = require("./src/routers/registerRouter");
const loginRouter = require("./src/routers/loginRouter");
const productRouter = require("./src/routers/productRouter");
const cartRouter = require("./src/routers/cartRouter")

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(router);

app.use("/", loginRouter);
app.use("/", productRouter);
app.use("/",cartRouter)

connectToMongoDB()
  .then(() => {
    
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });


  
const socket = 4400
const { Server } = require('socket.io')
// var port = normalizePort(process.env.PORT || '5000');
app.set('port', 5000);
app.use(cors());
var server = http.createServer(app);
const httpServer = require("http").createServer();

const io = new Server(server, {
  cors: {
    origins: "https://localhost:4200",
    methods: ["GET", "POST"]
  }
})

global.io = require('socket.io')(httpServer);
require('./src/socket/index').init();
httpServer.listen(socket, () => {
  console.info(`Socket server started on ${socket}`);
});


