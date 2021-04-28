const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');

const signupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("cannot contain 'password'...");
      }
    },
  },
  isDoc: {
    type: Boolean
  },
});
signupSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next(error);
  }
});

signupSchema.statics.findByCredentails = async (email, password) => {
  const user = await Signup.findOne({ email });

  if (!user) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }

  return user;
};


// hashing password
signupSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }else{
    console.log("falied");
  }
  next();
});

const Signup=mongoose.model('Signup',signupSchema);
module.exports=Signup;