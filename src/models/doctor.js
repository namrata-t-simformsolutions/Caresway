const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  contact_no: {
    type: Number,
    validate(value) {
      if (value) {
        if (value.len() != 10) {
          throw new Error("Number must be 10 digit");
        }
      }
    },
  },
  doctor_speciality: {
    type: String,
    required: true,
    trim: true,
  },
  doctor_gender: {
    type: String,
  },
  doctor_education: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

doctorSchema.methods.getDoctorAuthToken = async function () {
  const doctor = this;
  const token = jwt.sign(
    { _id: doctor._id.toString() },
    process.env.JWT_SECRET
  );
  doctor.tokens = doctor.tokens.concat({ token });
  await doctor.save();
  return token;
};

const Doctor = mongoose.model("doctor", doctorSchema);

module.exports = Doctor;
