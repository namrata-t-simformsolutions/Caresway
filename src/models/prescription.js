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

prescriptionSchema.methods.toJSON= function(){
  const prescription=this;
  const prescriptionObject=prescription.toObject();

  delete prescriptionObject.tokens;
  delete prescriptionObject.password;
  delete prescriptionObject.createdAt;
  delete prescriptionObject.updatedAt;
  delete prescriptionObject.__v;
  return prescriptionObject;
}

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
