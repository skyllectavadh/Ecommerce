const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = new mongoose.Schema(
  {
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
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegisterUser",
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Cart = mongoose.model("Cart", cartSchema);

async function validateCart(cart) {
  const schema = Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
      })
    ),
    userId: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error, value } = schema.validate(cart);

  if (error) {
    throw error;
  }
  return value;
}

module.exports = { Cart, validateCart };
