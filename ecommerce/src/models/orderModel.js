// const mongoose = require("mongoose");
// const Joi = require("joi");

// const orderSchema = new mongoose.Schema(
//   {
//     cartId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Cart",
//       required: true,
//     },

//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RegisterUser",
//       required: true,
//     },
   
//   },
//   {
//     timestamps: true,
//     toObject: { virtuals: true },
//     toJSON: { virtuals: true },
//   }
// );

// const Order = mongoose.model("Order", orderSchema);

// async function validateOrder(order) {
//     const schema = Joi.object({
//       cartId: Joi.string().required(),
//       userId: Joi.string().required(),
//     }).options({ abortEarly: false });
  
//     const { error, value } = schema.validate(order);
  
//     if (error) {
//       throw error;
//     }
//     return value;
//   }
  

// module.exports = { Order, validateOrder };
// const mongoose = require("mongoose");
// const Joi = require("joi");

// const orderSchema = new mongoose.Schema(
//   {
//     cartId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Cart",
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "RegisterUser",
//       required: true,
//     },
//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//         // You can add other properties as needed
//       },
//     ],
//   },
//   {
//     timestamps: true,
//     toObject: { virtuals: true },
//     toJSON: { virtuals: true },
//   }
// );

// const Order = mongoose.model("Order", orderSchema);

// async function validateOrder(order) {
//   const schema = Joi.object({
//     cartId: Joi.string().required(),
//     userId: Joi.string().required(),
//     items: Joi.array().items(
//       Joi.object({
//         productId: Joi.string().required(),
//         quantity: Joi.number().required(),
//         price: Joi.number().required(), // Add this line to include price validation
//         status: Joi.string().valid("pending", "confirm").default("pending"),
//       })
//     ),
//   }).options({ abortEarly: false });

//   const { error, value } = schema.validate(order);

//   if (error) {
//     throw error;
//   }
//   return value;
// }


// module.exports = { Order, validateOrder };
const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterUser",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "confirm"], // Define the enum values here
          default: "pending",
        },
      },
    ],
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

async function validateOrder(order) {
  const schema = Joi.object({
    cartId: Joi.string().required(),
    userId: Joi.string().required(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
        status: Joi.string().valid("pending", "confirm").default("pending"),
      })
    ),
  }).options({ abortEarly: false });

  const { error, value } = schema.validate(order);

  if (error) {
    throw error;
  }
  return value;
}

module.exports = { Order, validateOrder };
