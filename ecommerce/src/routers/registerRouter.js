const express = require("express");
const router = express.Router();
const cors = require("cors");
const registerController = require("../controllers/registerController");

router.use(cors()); // Enable CORS for all routes in this router

router.post("/createUser", registerController.createUser);

router.get("/users/:id", registerController.getUserById);
router.patch("/users/:id", registerController.updateUser);
router.get("/users", registerController.getUsers);

router.delete("/users/:id", registerController.deleteUser);
module.exports = router;


















































// Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Set the destination folder where files will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Use the original filename
//   },
// });

// const upload = multer({ storage: storage });

// Require the RegisterUser model and validateUser function from the userModel.js file

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

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
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(formData.password, salt);

//     // Delete the confirmPassword field
//     delete formData.confirmPassword;

//     // Save the form data to the MongoDB collection with the hashed password and role
//     const result = await collection.insertOne({
//       ...formData,
//       password: hashedPassword,
//       role: 'user', // Set the role to 'user'
//       status: 'active' ,// Set the default status to 'active'
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

// router.post("/createUser", async (req, res) => {
//   const formData = req.body;

//   // Connect to the MongoDB database
//   try {
//     await client.connect();

//     const db = client.db('ecommercedb');
//     const collection = db.collection('registerusers');

//   // Check if the email or mobile number already exists in the database
//   const existingUser = await collection.findOne({
//     $or: [
//       { email: formData.email },
//       { mobile: formData.mobile }
//     ]
//   });

//   if (existingUser) {
//     return res.status(409).json({ message: 'Email or mobile number already exists' });
//   }

//   // Hash the password and confirmPassword using bcrypt
//   const hashedPassword = await bcrypt.hash(formData.password, 10);
//   const hashedConfirmPassword = await bcrypt.hash(formData.confirmPassword, 10);

//   // Save the form data to the MongoDB collection with the hashed passwords
//   const result = await collection.insertOne({
//     ...formData,
//     password: hashedPassword,
//     confirmPassword: hashedConfirmPassword
//   });

//   console.log('Form data saved to MongoDB:', result.ops);
//   res.status(200).json({ message: 'Form data saved successfully' });
// } catch (error) {
//   console.error('Error inserting document:', error);
//   res.status(500).send('Internal Server Error');
// } finally {
//   // Close the MongoDB connection
//   await client.close();
// }
// });

// router.post("/createUser", upload.none(), async (req, res) => {
//   try {
//     console.log(req.body);
//     const registerUser = await validateUser(req.body);
//     console.log(registerUser);

//     // Check if the mobile or email already exists in the db
//     const existingUser = await RegisterUser.findOne({
//       $or: [{ mobile: registerUser.mobile }, { email: registerUser.email }],
//     });

//     if (existingUser) {
//       res.status(409).send("Mobile or email already exists");
//     } else {
//       if (registerUser.password === registerUser.cpassword) {
//         const newUser = new RegisterUser(registerUser);
//         await newUser.save();
//         res.send("RegisterUser data added to database");
//       } else {
//         res.status(400).send("Passwords do not match");
//       }
//     }
//   } catch (error) {
//     console.error("Error adding registerUser data:", error);
//     res.status(400).send(error.details);
//   }
// });

// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");

// Require the RegisterUser model and validateUser function from the userModel.js file
// const { RegisterUser, validateUser } = require("../models/userModel");

// router.post("/createUser", async (req, res) => {
//   try {
//     const registerUser = await validateUser(req.body);
//     console.log(registerUser);

//     // Check if the mobile or email already exists in the db
//     const existingUser = await RegisterUser.findOne({
//       $or: [{ mobile: registerUser.mobile }, { email: registerUser.email }],
//     });

//     if (existingUser) {
//       res.status(409).send("Mobile or email already exists");
//     } else {
//       const newUser = new RegisterUser(registerUser);
//       await newUser.save();
//       res.send("RegisterUser data added to database");
//     }
//   } catch (error) {
//     console.error("Error adding registerUser data:", error);
//     res.status(400).send(error.details);
//   }
// });

// router.get("/users", async (req, res) => {
//   try {
//     const getUsers = await RegisterUser.find({});
//     res.send(getUsers);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get("/users", async (req, res) => {  //this api will provide data of role:user
//   try {
//     const getUsers = await RegisterUser.find({ role: "user" });
//     res.send(getUsers);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
// router.delete("/users/:id", async (req, res) => {
//   try {
//     const deleteUser = await RegisterUser.findByIdAndDelete(req.params.id);
//     if (!req.params.id) {
//       return res.status(400).send();
//     }
//     res.send(deleteUser);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.patch("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const { password, ...updateData } = req.body;

//     if (password) {
//       // Hash the new password
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(password, salt);
//       updateData.password = hashedPassword;
//     }

//     const updateUser = await RegisterUser.findByIdAndUpdate(_id, updateData, {
//       new: true,
//     });

//     res.send(updateUser);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// router.get("/users/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const getUserById = await RegisterUser.findById({ _id });
//     res.send(getUserById);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
