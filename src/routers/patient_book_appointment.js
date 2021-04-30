const router = require("express").Router();
const patientAuth = require("../middlewares/patientAuth");
const Appointment = require("../models/appointment");
// const Date = require('date-and-time')
const Doctor = require("../models/doctor");

router.post("/doctor/:id/book_appointment", patientAuth, async (req, res) => {
  const appointment = new Appointment({
    patientId: req.patient._id,
    doctorId: req.params.id,
    ...req.body,
  });
  try {
    let flag;
    if (appointment.doctorId) {
      const doctorAppointments = await Appointment.find({
        doctorId: appointment.doctorId,
      });
      await doctorAppointments.forEach((val) => {
        if (
          val.time === appointment.time &&
          val.date.getDate() === appointment.date.getDate() &&
          val.date.getMonth() === appointment.date.getMonth() &&
          val.date.getYear() === appointment.date.getYear()
        ) {
          flag = true;
        }
      });
      if (flag == true) {
        res.send("slot not available");
      } else {
        await appointment.save();
        res.status(200).send(appointment);
      }
    } else {
      res.send("please check doctor");
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
