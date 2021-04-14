const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient=require("../models/patient");
const doctorAuth = require("../middlewares/doctorAuth");
const Appointment = require("../models/appointment");

router.get("/doctor/appointments", doctorAuth, async (req, res) => {
  const match = { doctorId: req.doctor._id };
  console.log(req.doctor._id);

  try {
    await req.doctor.populate({
        path: "appointments",
        match
      })
      .execPopulate();
    //   const appointment=req.doctor.appointments;
    //   const resu=await Promise.all(appointment.map(async (val)=>{
    //     const patient= await Patient.find({_id:val.patientId});
    //     return patient[0];
    //   }))
      
    // console.log(req.doctor.appointments);
    res.send(
        req.doctor.appointments
    );
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
