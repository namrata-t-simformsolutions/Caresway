const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const doctorAuth = require("../middlewares/doctorAuth");

router.patch("/doctor/profile", doctorAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "contact_no",
    "doctor_speciality",
    "doctor_education",
    "doctor_gender",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });
  try {
    updates.forEach((update) => 
      req.doctor[update] = req.body[update])
      
    await req.doctor.save();
    res.status(201).send(req.doctor);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
