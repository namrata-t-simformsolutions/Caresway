const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");

router.patch("/patients/update_profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "email",
    "contact_number",
    "dob",
    "height",
    "weight",
    "gender",
    "address",
    "blood_group",
    "password",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });
  try {
    updates.forEach((update) => (req.patient[update] = req.body[update]));
    await req.patient.save();
    res.status(201).send(req.patient);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
