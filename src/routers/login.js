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
    if (user.isDoc) {
      await Doctor.find({ email: user.email }).then(async (doctor) => {
        const token = await doctor[0].getDoctorAuthToken();
        res.send({ doctor, token });
      });
    } else {
      await Patient.find({ email: user.email }).then(async (patient) => {
        const token = await patient[0].getPatientAuthToken();
        res.send({ patient, token });
      });
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

module.exports = router;


 