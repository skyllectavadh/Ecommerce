const mongoose = require("mongoose");
const Joi = require("joi");

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
}, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

const LoginUser = mongoose.model("LoginUser", loginUserSchema);

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

module.exports = { LoginUser, validateLoginUser };
