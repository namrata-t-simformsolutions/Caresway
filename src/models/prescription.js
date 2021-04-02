const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const prescriptionSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    PatientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    tabletName: {
      type: String,
    },
    Quantity: {
      type: Number,
    },
    dose: {
      type: String,
    },
    numberOfDays: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
