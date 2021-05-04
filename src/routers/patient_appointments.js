const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const patientAuth = require("../middlewares/patientAuth");
const Appointment = require("../models/appointment");
const Prescription = require("../models/prescription");
const Signup = require("../models/signup");
const Doctor = require("../models/doctor");

router.get("/patient/appointments", patientAuth, async (req, res) => {
  const match = { patientId: req.patient._id };
  try {
    await req.patient
      .populate({
        path: "appointments",
        match,
      })
      .execPopulate().then((data)=>{
      });
    const appointment = req.patient.appointments;
    const result = await Promise.all(
      appointment.map(async (val) => {
        const pres = await Prescription.find({ appointmentId: val._id });
        const doctor = await Doctor.findById(val.doctorId);
        const user = await Signup.find({ email: doctor.email });
        if (pres) {
          const temp = {
            doctor_name: user[0].name,
            specialist: doctor.doctor_speciality,
            appointment_date: val.date,
            appointment_time: val.time,
            appointment_Id: val._id,
            completed: val.completed,
            ...pres,
          };
          return temp;
        } else {
          const temp = {
            doctor_name: user[0].name,
            specialist: doctor.doctor_speciality,
            appointment_date: val.date,
            appointment_time: val.time,
            appointment_Id: val._id,
            completed: val.completed,
          };
          return temp;
        }
      })
    );
    res.send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/patient/appointments/:id", patientAuth, async (req, res) => {
  const appointmentId = req.params.id;
  const date = req.body.date;
  const time = req.body.time;

 if (date || time) {
    try {
      if(date){
        await Appointment.findByIdAndUpdate(appointmentId, { date });
      }
      if(time){
        await Appointment.findByIdAndUpdate(appointmentId, { time });
      }
      res.send("success");
    } catch (e) {
      res.status(400).send("failed");
    }
  }
});

module.exports = router;
