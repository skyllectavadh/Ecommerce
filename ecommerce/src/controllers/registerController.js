const { RegisterUser } = require("../models/userModel");
const { MongoClient } = require("mongodb");
const mongoURI = "mongodb://localhost:27017";
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const formData = req.body;

  try {
    await client.connect();

    const db = client.db("ecommercedb");
    const collection = db.collection("registerusers");
    console.log("fdata",formData);
    // Check if the email or mobile number already exists in the database
    const existingUser = await collection.findOne({
      $or: [{ email: formData.email }, { mobile: formData.mobile }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email or mobile number already exists" });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    // Delete the confirmPassword field
    delete formData.confirmPassword;

    // Save the form data to the MongoDB collection with the hashed password and role
    const result = await collection.insertOne({
      ...formData,
      password: hashedPassword,
      role: "user", // Set the role to 'user'
      status: "active", // Set the default status to 'active'
    });

    console.log("Form data saved to MongoDB:", result.ops);
    res.status(200).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
};

exports.getUsers= async (req, res) => {
  //this api will provide data of role:user
  try {
    const getUsers = await RegisterUser.find({ role: "user" });
    res.json({
      success: true,
      message:"RegisterUsers fetch successfully",
      data: getUsers,
      
    });
    // .send(getUsers);
  } catch (error) {
    res.status(400).json({
      success: false, 
      message: "Can't find RegisterUsers",
    });
    // .send(error);
  }
};

exports.getUserById= async (req, res) => {
    try {
      const _id = req.params.id;
      const getUserById = await RegisterUser.findById({ _id });
      res.json({
        success: true,
        message:"RegisterUsers fetch successfully",
        data: getUserById,        
      });
      // send(getUserById);
    } catch (error) {
      res.status(400).json({
        success: false,
        message:"Can't find RegisterUsers",
        // data: getUserById,        
      });
      // .send(error);
    }
  };


  exports.updateUser= async (req, res) => {
    try {
      const _id = req.params.id;
      const { password, ...updateData } = req.body;
  
      if (password) {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
      }
  
      const updateUser = await RegisterUser.findByIdAndUpdate(_id, updateData, {
        new: true,
      });
  
      res.json({
        success: true,
        message:"RegisterUsers updated successfully",
        data: updateUser,        
      });
      // .send(updateUser);
    } catch (error) {
      res.status(500).json({
        success: false,
        message:"Error in updating RegisterUsers",
      });
      // .send(error);
    }
  };

  exports.deleteUser= async (req, res) => {
    try {
      const deleteUser = await RegisterUser.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).send();
      }
      res.json({
        success: true,
        message:"RegisterUsers deleted successfully",
        data: deleteUser,        
      });
      // send(deleteUser);
    } catch (error) {
      res.status(500).json({
        success: false, 
        message:"error",
        // data: deleteUser,        
      });
      // .send(error);
    }
  };