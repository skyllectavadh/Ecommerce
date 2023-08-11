const mongoose = require("mongoose");
const Joi = require("joi");
const multer = require("multer");


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  colour: {
    type: String,
    enum: ["black", "purple","orange","yellow"],
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  guarantee: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {  
    type: String, 
    required: false,
  },
  stock:{
    type:Number,
    required:true,
  }
 
}, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Use a unique filename to avoid conflicts
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG images are allowed."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
// console.log(upload);
const Product = mongoose.model("Product", productSchema);

async function validateProduct(product) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    colour: Joi.string().valid("black", "purple", "orange", "yellow").optional(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    guarantee: Joi.string().required(),
    description: Joi.string().required(),
    stock: Joi.number().required(),
  }).options({ abortEarly: false });

   const { error, value } =  schema.validate(product);

  if (error) {
    throw error;
  }
  return value;
}

module.exports = { Product, validateProduct, upload };
// module.exports = { Product, validateProduct };


