const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const patientSchema = new mongoose.Schema(
  {
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
    contact_number: {
      type: Number,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isInt(value)) {
          throw new Error("invalid phone number");
        }
      },
    },
    dob: {
      type: Date,
      trim: true,
    },
    height: {
      type: Number,
      trim: true,
      validate(value) {
        if (!validator.isInt(value)) {
          throw new Error("invalid height");
        }
      },
    },
    weight: {
      type: Number,
      trim: true,
      validate(value) {
        if (!validator.isInt(value)) {
          throw new Error("invalid weight");
        }
      },
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// patientSchema.virtual('appointments',{
//   ref:'Appointment',
//   localfield:'_id',
//   foreignField:'PatientId'
// })

// patientSchema.virtual('prescriptions',{
//   ref:'Prescription',
//   localfield:'_id',
//   foreignField:'PatientId'
// })


//hashing password
// patientSchema.pre("save", async function (next) {
//   const patient = this;
//   if (patient.isModified("password")) {
//     patient.password = await bcrypt.hash(patient.password, 8);
//   }
//   next();
// });

// patientSchema.methods.toJSON= function(){
//   const patient=this;
//   const patientObject=patient.toObject();

//   delete patientObject.tokens;
//   delete patientObject.password;
//   return patientObject;
// }

patientSchema.methods.getPatientAuthToken = async function () {
  const patient = this;
  const token = jwt.sign({ _id: patient._id.toString() }, process.env.JWT_SECRET);
  patient.tokens=patient.tokens.concat({token});
  await patient.save();
  return token; 
};

patientSchema.statics.findByCredentails = async (email, password) => {
  const patient = await Patient.findOne({ email });

  if (!patient) {
    throw new Error("unable to login");
  }
  const isMatch = await bcrypt.compare(password, patient.password);

  if (!isMatch) {
    throw new Error("unable to login");
  }

  return patient;
};


const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
