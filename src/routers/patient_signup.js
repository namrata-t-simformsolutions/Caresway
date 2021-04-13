const express = require("express");
const router = express.Router();
const Signup = require("../models/signup");
const {sendMail}=require('../emails/account');
const Patient = require("../models/patient");

router.post("/patient/signup", async (req, res) => {
  const patientSignup = new Signup(req.body);
  const patient=new Patient({email:req.body.email});
  patientSignup.isDoc=false;
  try {
    await patientSignup.save();
    await patient.save();
    // sendMail(patientSignup.email,patientSignup.name);
    res.status(201).send({ patientSignup });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
