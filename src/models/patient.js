const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Appointment = require("../models/appointment");

const patientSchema = new mongoose.Schema(
  {
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
    contact_number: {
      type: Number,
      unique: true,
      trim: true,
      // validate(value) {
      //   if (!validator.isInt(value)) {
      //     throw new Error("invalid phone number");
      //   }
      // },
    },
    dob: {
      type: Date,
      trim: true,
    },
    height: {
      type:Number,
      trim: true,
      // validate(value) {
      //   if (!validator.isInt(value)) {
      //     throw new Error("invalid height");
      //   }
      // },
    },
    weight: {
      type: Number,
      trim: true,
      // validate(value) {
      //   if (!validator.isInt(value)) {
      //     throw new Error("invalid weight");
      //   }
      // },
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
      lowercase: true,
    },
    blood_group: {
      type: String,
      trim: true,
      lowercase: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    allergies: [],
    other_illness: [
      {
        illness_name: {
          type: String,
        },
        medication_name: {
          type: String,
        },
        medication_doses: {
          type: String,
        },
        medication_prescribedBy: {
          type: String,
        },
      },
    ],
    unhealthy_habits: {
      type: Boolean,
    },
    current_medication: {
      type: Boolean,
    },
    operations_surgeries: [
      {
        operation_surgery_name: {
          type: String,
        },
        date: {
          type: Date,
        },
      },
    ],
    family_history: [
      {
        relation: {
          type: String,
        },
        illness: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

patientSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "patientId",
});

// patientSchema.virtual('prescriptions',{
//   ref:'Prescription',
//   localField: '_id',
//   foreignField:'patientId'
// })

patientSchema.methods.toJSON = function () {
  const patient = this;
  const patientObject = patient.toObject();

  delete patientObject.tokens;
  delete patientObject.password;
  delete patientObject.createdAt;
  delete patientObject.updatedAt;
  return patientObject;
};

patientSchema.methods.getPatientAuthToken = async function () {
  const patient = this;
  const token = jwt.sign(
    { _id: patient._id.toString() },
    process.env.JWT_SECRET
  );
  patient.tokens = patient.tokens.concat({ token });
  await patient.save();
  return token;
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
