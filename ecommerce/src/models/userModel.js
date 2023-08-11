
const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

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
  cpassword: {
    type: String,
    minlength: 2,
    maxlength: 255,
    
  },
  role:{
    type: String,
    default:'user',
  },
  status: {
    type: String,
    enum: ['active', 'inactive','delete'],
  }
}, {
  timestamps: true,
  toObject: {virtuals: true},
  toJSON: {virtuals: true}
});

const RegisterUser = mongoose.model("RegisterUser", userSchema);

async function validateUser(registerUser) {
  const JoiSchema = Joi.object({
    name: Joi.string().max(10).required(),
    mobile: Joi.number().min(10).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(2).max(255).required(),
    cpassword: Joi.string().min(2).max(255).required(),
  }).options({ abortEarly: false });

  const { error, value } = JoiSchema.validate(registerUser);

  if (error) {
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(value.password, salt);
  const hashedCpassword = await bcrypt.hash(value.cpassword, salt);

  return {
    ...value,
    password: hashedPassword,
    cpassword: hashedCpassword,
  };
}

module.exports = {
  RegisterUser,
  validateUser,
};
