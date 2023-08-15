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
    }).options({ abortEarly: false });
  
    const { error, value } = schema.validate(order);
  
    if (error) {
      throw error;
    }
    return value;
  }
  

module.exports = { Order, validateOrder };
