const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    status: {
      type: String,
    },
    completed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
