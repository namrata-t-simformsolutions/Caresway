const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

router.post("/patient/logout", auth, async (req, res) => {
  try {
    req.patient.tokens = req.patient.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.patient.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});