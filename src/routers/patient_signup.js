const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const {sendMail}=require('../emails/account');

router.post("/patient/patient_signup", async (req, res) => {
  const patient = new Patient(req.body);
  try {
    await patient.save();
    // sendMail(patient.email,patient.name);
    const token = await patient.getPatientAuthToken();
    res.status(201).send({ patient,token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
