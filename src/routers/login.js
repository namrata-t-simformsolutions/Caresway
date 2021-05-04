const express = require("express");
const router = express.Router();
const Signup = require("../models/signup");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

router.post("/login", async (req, res) => {
  try {
    console.log(req.body.email)
    const user = await Signup.findByCredentails(
      req.body.email,
      req.body.password
    );
    const flag={
      'isDoc':user.isDoc
    }
    if (user.isDoc) {
      await Doctor.find({ email: user.email }).then(async (doctor) => {
        const token = await doctor[0].getDoctorAuthToken();
        const temp={
          "isDoc":user.isDoc,
          "name":user.name,
          "email":doctor[0].email,
          "id":doctor[0]._id, 
          token
        }
        res.send(temp);
      });
    } else {
      await Patient.find({ email: user.email }).then(async (patient) => {
        const token = await patient[0].getPatientAuthToken();
        const temp={
          "isDoc":user.isDoc,
          "name":user.name,
          "email":patient[0].email,
          "id":patient[0]._id,
          token
        }
        res.send(temp);
      });
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e);
  }
});

module.exports = router;


 