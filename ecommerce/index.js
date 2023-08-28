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
const orderRouter = require("./src/routers/orderRouter")
const wishlistRouter = require("./src/routers/wishlistRouter")

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use(router);

app.use("/", loginRouter);
app.use("/", productRouter);
app.use("/",cartRouter)
app.use("/",orderRouter)
app.use("/",wishlistRouter)


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
    // methods: ["GET", "POST"]
  }
})

global.io = require('socket.io')(httpServer);
require('./src/socket/index').init();
httpServer.listen(socket, () => {
  console.info(`Socket server started on ${socket}`);
});















// const socketIO = require("socket.io"); //Imp socket.io
// const server = http.createServer(app); // Create a server instance using http
// const io = socketIO(server); //Attach socket.io to the server

// Socket.io setup
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle socket events here
//   socket.on("chat message", (msg) => {
//     console.log("Message:", msg);
//     io.emit("chat message", msg); // Broadcast the message to all connected clients
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });
// const Joi = require("joi");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");