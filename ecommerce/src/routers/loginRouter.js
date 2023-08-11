const express = require("express");
const router = express.Router();
const loginController = require("../controllers/loginController");



router.post('/login',loginController.createLogin)





















// const { LoginUser, validateLoginUser } = require("../models/loginModel");  
// const mongoose = require("mongoose");
// const RegisterUser = mongoose.model("RegisterUser");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// LoginUser API
// router.post("/login", async (req, res) => {
//   try {
//     const loginUser = await validateLoginUser(req.body);
    
//     const user = await RegisterUser.findOne({ email: loginUser.email });
                                                                                        
//     if (!user) {
//       return res.status(404).send("Invalid email or password");
//     }

//     const isPasswordValid = await bcrypt.compare(
//       loginUser.password,
//       user.password
//     );

//     if (!isPasswordValid) {
      
//       return res.status(401).send("Invalid email or passwords");
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, "your-secret-key");

//     res.send({
//       email: loginUser.email,
//       password: user.password,
//       token: token,
//       role: user.role // Include the role field in the response
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const loginUser = await validateLoginUser(req.body);

//     const user = await RegisterUser.findOne({ email: loginUser.email });

//     if (!user) {
//       return res.status(404).send('Invalid email or password');
//     }

//     const isPasswordValid = await bcrypt.compare(
//       loginUser.password,
//       user.password
//     );

//     if (!isPasswordValid) {
//       return res.status(401).send('Invalid email or password');
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key');

//     // Save token in localStorage
//     res.send({
//       email: loginUser.email,
//       password: user.password,
//       role: user.role,
//       token: token,
//     });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).send('Internal server error');
//   }
// });


// router.delete("/login/:email", async (req, res) => {
//   try {
//     const email = req.params.email;

//     // Find and delete all logins that match the email
//     const deletedLogins = await LoginUser.deleteMany({ email });

//     if (deletedLogins.deletedCount === 0) { 
//       return res.status(404).send("No logins found");
//     }

//     res.send("Logins deleted successfully");
//   } catch (error) {
//     console.error("Error during login deletion:", error);
//     res.status(500).send("Internal server error");
//   }
// }); 

// router.get("/login", async (req, res) => {
//   try {
//     // Retrieve all login user records
//     const loginUsers = await LoginUser.find();

//     res.send(loginUsers);
//   } catch (error) {
//     console.error("Error login users:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// router.get("/login/:email", async (req, res) => {
//   try {
//     const email = req.params.email;

//     // Find the login user record by email
//     const loginUser = await LoginUser.findOne({ email });

//     if (!loginUser) {
//       return res.status(404).send("Login user not found");
//     }

//     res.send(loginUser);
//   } catch (error) {
//     console.error("Error login user:", error);
//     res.status(500).send("Internal server error");
//   }
// });




module.exports = router;

// -this is my createUser code of backend in this there is a role field how can i access this role field to check it while user get login