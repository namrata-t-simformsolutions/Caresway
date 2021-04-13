const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const patientAuth = require("../middlewares/patientAuth");
const Appointment = require("../models/appointment");

router.get("/patient/appointments", patientAuth, async (req, res) => {
  const match = { patientId: req.patient._id };
  try {
    await req.patient.populate({
        path: "appointments",
        match
      })
      .execPopulate();
    // console.log(req.patient.appointments);
    res.send(req.patient.appointments);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
