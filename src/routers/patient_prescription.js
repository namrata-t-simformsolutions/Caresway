const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

router.get("/patients/prescription", auth, async (req, res) => {
  try {
    await req.patient
      .populate({
        path: "prescriptions",
        match,
      })
      .execPopulate();
    res.send(req.patients.prescriptions);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
