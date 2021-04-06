const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const prescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Appointment",
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
