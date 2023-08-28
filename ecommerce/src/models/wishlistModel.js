const mongoose = require("mongoose");
const Joi = require("joi");

const wishlistSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
 
async function validateWishlist(wishlist) {
  const schema = Joi.object({
    items: Joi.array().items(
      Joi.object({
        productId: Joi.string().required(),
      })
    ),
    userId: Joi.string().required(),
  }).options({ abortEarly: false });

  return schema.validate(wishlist);
}

module.exports = { Wishlist, validateWishlist };