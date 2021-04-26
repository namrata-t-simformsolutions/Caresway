const express = require("express");
const router = express.Router();
const Signup = require("../models/signup");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

router.post("/login", async (req, res) => {
  try {
    const user = await Signup.findByCredentails(
      req.body.email,
      req.body.password
    );
    console.log(req.body.email);
    console.log(req.body.password);
    const flag={
      'isDoc':user.isDoc
    }
    if (user.isDoc) {
      await Doctor.find({ email: user.email }).then(async (doctor) => {
        const token = await doctor[0].getDoctorAuthToken();
        const temp={
          "isDoc":user.isDoc,
          "doctor_name":user.name,
          "doctor_email":doctor[0].email,
          "doctor_speciality":doctor[0].doctor_speciality,
          "doctor_id":doctor[0]._id,
          token
        }
        res.send(temp);
      });
    } else {
      await Patient.find({ email: user.email }).then(async (patient) => {
        const token = await patient[0].getPatientAuthToken();
        res.send({flag, patient, token });
      });
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

module.exports = router;


 