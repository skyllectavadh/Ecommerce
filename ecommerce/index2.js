const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/ecommercedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a registerUser schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  mobile: {
    type: Number,
    minlength: 10,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  password: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
});

// Create a RegisterUser model
const RegisterUser = mongoose.model("RegisterUser", userSchema);

// login schema
const loginUserSchema = new mongoose.Schema({
    email: {
      type: String,
      minlength: 5,
      maxlength: 50,
    },
    password: {
      type: String,
      minlength: 2,
      maxlength: 255,
    },
  });
  
  // Create a LoginUser model
  const LoginUser = mongoose.model("LoginUser", loginUserSchema);
  
  // Function to validate the loginUser
  async function validateLoginUser(loginUser) {
    const JoiSchema = Joi.object({
      email: Joi.string().email().min(5).max(50).required(),
      password: Joi.string().min(2).max(255).required(),
    }).options({ abortEarly: false });
  
    const { error, value } = JoiSchema.validate(loginUser);
  
    if (error) {
      throw error;
    }
  
    return value;
  }
  
// RegisterUser-defined function to validate the registerUser
async function validateUser(registerUser) {
  const JoiSchema = Joi.object({
    name: Joi.string().max(10).required(),
    mobile: Joi.number().min(10).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(2).max(255).required(),
  }).options({ abortEarly: false });

  const { error, value } = JoiSchema.validate(registerUser);

  if (error) {
    throw error;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);

  
  return {
    ...value,
    password: hashedPassword,
  };
}

//router

// LoginUser API

app.post("/login", async (req, res) => {
    try {
      const loginUser = await validateLoginUser(req.body);
  
      const user = await RegisterUser.findOne({ email: loginUser.email });
  
      if (!user) {
        return res.status(404).send("Invalid email or password");
      }
  
      const isPasswordValid = await bcrypt.compare(loginUser.password, user.password);
                                                                                                                      
      if (!isPasswordValid) {
        return res.status(401).send("Invalid email or password");
      }
  
      const newLoginUser = new LoginUser({
        email: loginUser.email,
        password: user.password, // Store the hashed password from the user model
      });
      await newLoginUser.save();
  
      res.send("Login successful");
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Internal server error");
    }
  });
  


// registerUser API
app.post("/createUser", async (req, res) => {
  try {
    const registerUser = await validateUser(req.body);
    console.log(registerUser);

    // Check if the name or email already exists in the database
    const existingUser = await RegisterUser.findOne({
      $or: [{ name: registerUser.name }, { email: registerUser.email }],
    });

    if (existingUser) {
      res.status(409).send("Name or email already exists");
    } else {
      const newUser = new RegisterUser(registerUser);
      await newUser.save();
      res.send("RegisterUser data added to the database");
    }
  } catch (error) {
    console.error("Error adding registerUser data:", error);
    res.status(400).send(error.details);
  }
});

app.get("/users", async (req, res) => {
    try {
      const getUsers = await RegisterUser.find({});
      res.send(getUsers);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/users/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const getUserById = await RegisterUser.findById({ _id });
      res.send(getUserById);
    } catch (error) {
      res.status(400).send(error);
    }
  });  


app.patch("/users/:id", async (req, res) => {
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
  
      res.send(updateUser);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

  app.delete("/users/:id", async (req, res) => {
    try {
      const deleteUser = await RegisterUser.findByIdAndDelete(req.params.id);
      if (!req.params.id) {
        return res.status(400).send();
      }
      res.send(deleteUser);
    } catch (error) {
      res.status(500).send(error);
    }
  });



// Start the server
app.listen(6000, () => {
  console.log("Server listening on port 6000");
});


router.post("/login", async (req, res) => {
  try {
    const loginUser = await validateLoginUser(req.body);

    const user = await RegisterUser.findOne({ email: loginUser.email });

    if (!user) {
      return res.status(404).send("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      loginUser.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key");

    res.send({
      email: loginUser.email,
      password: user.password,
      token: token,
      role: user.role // Include the role field in the response
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
});

////////////////////////////
router.post("/createUser", async (req, res) => {
  const formData = req.body;

  // Connect to the MongoDB database
  try {
    await client.connect();

    const db = client.db('ecommercedb');
    const collection = db.collection('registerusers');

    // Check if the email or mobile number already exists in the database
    const existingUser = await collection.findOne({
      $or: [
        { email: formData.email },
        { mobile: formData.mobile }
      ]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or mobile number already exists' });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    // Save the form data to the MongoDB collection with the hashed password and role
    const result = await collection.insertOne({
      ...formData,
      password: hashedPassword,
      role: 'user' // Set the role to 'user'
    });

    console.log('Form data saved to MongoDB:', result.ops);
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

//////////////////////////////////
router.post("/createUser", async (req, res) => {
  const formData = req.body;

  try {
    await client.connect();

    const db = client.db('ecommercedb');
    const collection = db.collection('registerusers');

    // Check if the email or mobile number already exists in the database
    const existingUser = await collection.findOne({
      $or: [
        { email: formData.email },
        { mobile: formData.mobile }
      ]
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or mobile number already exists' });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    // Delete the confirmPassword field
    delete formData.confirmPassword;

    // Set the default value of the status field to 'active'
    const userData = {
      ...formData,
      password: hashedPassword,
      role: 'user', // Set the role to 'user'
      status: 'active' // Set the default status to 'active'
    };

    // Save the form data to the MongoDB collection
    const result = await collection.insertOne(userData);

    console.log('Form data saved to MongoDB:', result.ops);
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error inserting document:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});


////////////////////////////-----------------------------0
router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters or default to 1
    const limit = 10; // Number of records to retrieve per page
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    let data = {};

    if (req.query.search) {
      data.name = {
        $regex: req.query.search,
        $options: 'i'
      };
    }

    const count = await Product.countDocuments(data); // Get the total count of matching documents
    const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

    // Sorting by price (assuming 'price' is a field in the 'Product' collection)
    const sortField = req.query.sort || 'price'; // Get the sorting field from the query parameters or default to 'price'
    const sortOrder = req.query.order === 'desc' ? -1 : 1; // Get the sorting order from the query parameters or default to ascending order (1)

    const getProducts = await Product.find(data)
      .sort({ [sortField]: sortOrder }) // Dynamically sort based on the field and order provided in the query parameters
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      totalPages,
      currentPage: page,
      products: getProducts
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


// GET /products?sort=price&order=asc
// GET /products?sort=price&order=desc


router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters or default to 1  
    const limit = 10; // Number of records to retrieve per page
    const skip = (page - 1) * limit; // Calculate the number of records to skip

    let data = {};

    if (req.query.search) {
      data.name = {
        $regex: req.query.search,
        $options: 'i'
      };
    }

    const count = await Product.countDocuments(data); // Get the total count of matching documents
    const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

    let getProductsQuery = Product.find(data).skip(skip).limit(limit);

    // Check if "sort" and "order" query parameters are provided
    if (req.query.sort && req.query.order) {
      const sortField = req.query.sort;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      getProductsQuery = getProductsQuery.sort({ [sortField]: sortOrder });
    }

    const getProducts = await getProductsQuery;

    res.status(200).json({
      totalPages,
      currentPage: page,
      products: getProducts
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


// This code appears to be a part of a Node.js application that handles a request to fetch products from a database using Mongoose, which is an Object-Document Mapping (ODM) library for MongoDB. Let's break down the code step by step:

// 1. The first line of code initializes a query to find products in the database using the `Product` model. The `data` variable seems to hold the query parameters used to filter the products. It also uses `skip` and `limit` variables for pagination, indicating how many documents to skip and how many to return in the result set.

// 2. The code then checks if the request object (`req`) contains query parameters "sort" and "order." These query parameters are commonly used for sorting the products based on a particular field and ordering them in ascending or descending order.

// 3. If both "sort" and "order" query parameters are present, the code proceeds to sort the query results based on the provided parameters. It extracts the values of "sort" and "order" from the request query and assigns them to `sortField` and `sortOrder`, respectively.

// 4. The code logs the extracted values of `sortField` and `sortOrder` to the console for debugging purposes.

// 5. It then creates a sorting object using the `sortField` as the key and `sortOrder` as the value. This object is used in the `sort()` method of the `getProductsQuery` to sort the query results accordingly.

// 6. The code logs the modified `getProductsQuery` to the console for debugging purposes.

// 7. Next, the code awaits the execution of the `getProductsQuery`. Since Mongoose queries return promises, the `await` keyword is used to wait for the results before proceeding.

// 8. The sorted and paginated products are stored in the `getProducts` variable.

// 9. Finally, the server responds with a JSON object containing the total number of pages (`totalPages`), the current page number (`page`), and the array of products (`getProducts`) that match the query parameters. The response has an HTTP status code of 200, indicating a successful request.

// In summary, this code fetches products from a MongoDB database using Mongoose, allows sorting and ordering of results based on query parameters, and provides pagination for the retrieved products. The sorted and paginated products are then sent as a JSON response to the client.



//
//
//
//
// Sure! Let's break down the code:

// ```javascript
// const sortOrder = req.query.order === 'desc' ? -1 : 1;
// ```

// The purpose of this line is to determine the sorting order based on the value of the `order` query parameter in the HTTP request. In this API, the `order` query parameter is used to specify whether the sorting should be in ascending (asc) or descending (desc) order.

// Here's what's happening:

// 1. `req.query.order`: This part of the code accesses the `order` query parameter from the HTTP request object (`req`). The `req.query` object contains all the query parameters sent with the request.

// 2. `req.query.order === 'desc'`: This is a comparison operation that checks whether the value of the `order` query parameter is equal to the string `'desc'`.

// 3. `? -1 : 1`: This is a ternary operator. If the condition `req.query.order === 'desc'` is true (i.e., the `order` parameter is set to `'desc'`), then the value of `sortOrder` will be `-1`. Otherwise, if the condition is false (i.e., the `order` parameter is not `'desc'`, which means it's `'asc'` or not provided at all), then the value of `sortOrder` will be `1`.

// In JavaScript, when you use `-1` as the sort order, it means descending order, and when you use `1`, it means ascending order. The `sort` method in MongoDB uses this convention to sort the data accordingly.

// So, when you use the API with the query parameter `order=desc`, it will sort the products in descending order based on the specified sorting field (e.g., price). If you use `order=asc`, it will sort the products in ascending order based on the same field. If the `order` parameter is not provided, the default value of `sortOrder` will be `1`, and the products will be sorted in ascending order by default.


//
//
//
// Apologies for the confusion in my previous response. The use of square brackets `[sortField]` does not create an array; it is actually a feature of JavaScript known as "computed property names" and not specific to MongoDB.

// Let's clarify the usage of `{ [sortField]: sortOrder }`:

// In JavaScript, when you want to create an object with a dynamic key (property name), you can use square brackets `[]` to evaluate an expression and use its value as the property name. In this case, `sortField` is a variable containing the field name by which you want to sort the data.

// For example, if `sortField` has the value `'price'`, the expression `{ [sortField]: sortOrder }` will be evaluated to `{ 'price': sortOrder }`. If `sortOrder` is `-1`, the result will be `{ 'price': -1 }`.

// In the context of the MongoDB `sort` method, this expression dynamically sets the sorting criteria based on the value of `sortField`. It allows you to sort the data based on different fields (e.g., `'price'`, `'name'`, etc.) without hardcoding them in the query.

// Here's how it works in the code:

// ```javascript
// const sortField = req.query.sort;
// const sortOrder = req.query.order === 'desc' ? -1 : 1;

// // The following line dynamically sets the sorting criteria based on the value of sortField
// getProductsQuery = getProductsQuery.sort({ [sortField]: sortOrder });
// ```

// So, if you use the API with the query parameter `sort=price` and `order=desc`, the sorting criteria will be `{ 'price': -1 }`, meaning the products will be sorted in descending order based on the `'price'` field.

// In summary, the use of `{ [sortField]: sortOrder }` is a way to dynamically specify the field and its sorting order based on the query parameters provided in the API request. It does not create an array but an object with a dynamically determined property name.


router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters or default to 1
    const limit = 10; // Number of records to retrieve per page
    const skip = (page - 1) * limit; // Calculate the number of records to skip
    let data = {};

    if (req.query.search) {
      data.name = {
        $regex: req.query.search,
        $options: 'i'
      };
    }

    const count = await Product.countDocuments(data); // Get the total count of matching documents
    const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

    let getProductsQuery = Product.find(data).skip(skip).limit(limit);

    // Check if "sort" and "order" query parameters are provided
    if (req.query.sort && req.query.order) {
      const sortField = req.query.sort;
      const sortOrder = req.query.order === 'desc' ? -1 : 1;
      getProductsQuery = getProductsQuery.sort({ [sortField]: sortOrder });
    } else {
      // If "sort" and "order" are not provided, default to sorting by the "createdAt" field in descending order
      getProductsQuery = getProductsQuery.sort({ createdAt: -1 });
    }

    const getProducts = await getProductsQuery;

    res.status(200).json({
      totalPages,
      currentPage: page,
      products: getProducts
    });
  } catch (error) {
    res.status(400).send(error);
  }
});
