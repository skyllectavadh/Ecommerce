const { LoginUser, validateLoginUser } = require("../models/loginModel");  
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const RegisterUser = mongoose.model("RegisterUser");
const secretKey = process.env.SECRET_KEY;


exports.createLogin= async (req, res) => {
    try {
      const loginUser = await validateLoginUser(req.body);
  
      const user = await RegisterUser.findOne({ email: loginUser.email });
  
      if (!user) {
        return res.status(404).send('Invalid email or password');
      }
  
      const isPasswordValid = await bcrypt.compare(
        loginUser.password,
        user.password 
      );
  
      if (!isPasswordValid) {
        return res.status(401).send('Invalid email or password');
      }
  
      // Generate JWT token
      
      const token = jwt.sign({ userId: user._id }, secretKey);
      res.header('Authorization', `Bearer ${token}`);
    
      res.send({
        email: loginUser.email,
        password: user.password,
        role: user.role,
        token: token,
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('Internal server error');
    }
  };
  

  // exports.createLogin = async (req, res) => {
  //   try {
  //     // ... (existing code)
  
  //     // Generate JWT token
  //     const token = jwt.sign({ userId: user._id }, 'your-secret-key');
  
  //     // Save token in localStorage (optional for frontend use)
  //     res.header('Authorization', `Bearer ${token}`);
  
  //     // Send the response
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
  // };
  