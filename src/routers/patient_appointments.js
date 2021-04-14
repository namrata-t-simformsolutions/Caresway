const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const patientAuth = require("../middlewares/patientAuth");
const Appointment = require("../models/appointment");
const Prescription = require("../models/prescription");
const Signup=require("../models/signup");
const Doctor = require("../models/doctor");

router.get("/patient/appointments", patientAuth, async (req, res) => {
  const match = { patientId: req.patient._id };
  try {
    await req.patient
      .populate({
        path: "appointments",
        match,
      })
      .execPopulate();
    const appointment = req.patient.appointments;
    const result =await Promise.all(
      appointment.map(async (val) => {
        const pres = await Prescription.find({ appointmentId: val._id });
        const doctor = await Doctor.findById(val.doctorId);
        const user=await Signup.find({email:doctor.email});
        if(pres){
          console.log(typeof pres)
          // pres.map((p)=>{
          //   // console.log(p);
          //   // const presObject=p.toObject();
          //   delete p['_id'];
          //   delete p.appointmentId;
          //   console.log(p['_id']);
            
          // })
          const temp={
            "doctor name":user[0].name,
            "specialist":doctor.doctor_speciality,
            "appointment date":val.date,
            "appointment time":val.time,
            ...pres
          }
          return temp;
        }else{
          const temp={
            "doctor name":user[0].name,
            "specialist":doctor.doctor_speciality,
            "appointment date":val.date,
            "appointment time":val.time,
          }
          return temp;
        }
      })
    );
    console.log(result);
    res.send(result);
    // console.log(req.patient.appointments);
    // res.send(req.patient.appointments);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
