const router = require("express").Router();
const patientAuth = require("../middlewares/patientAuth");
const Appointment = require("../models/appointment");

router.get("/doctor/:id/book_appointment", patientAuth, async (req, res) => {
  const dateTime = {};
  if (req.query.time) {
    dateTime.time = req.query.time;
  }
  if (req.query.date) {
    dateTime.date = req.query.date;
  }
  const appointment = new Appointment({
    patientId: req.patient._id,
    doctorId: req.params.id,
    ...dateTime
  });
  try {
    console.log(appointment);
    await appointment.save();
    res.status(200).send();
  } catch {
    res.status(400).send();
  }
});

module.exports=router;