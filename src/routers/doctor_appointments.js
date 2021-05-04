const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const doctorAuth = require("../middlewares/doctorAuth");
const Prescription = require("../models/prescription");
const SignUp = require("../models/signup");
const Appointment = require("../models/appointment");

router.get("/doctor/appointments", doctorAuth, async (req, res) => {
  const match = { doctorId: req.doctor._id };

  try {
    await req.doctor
      .populate({
        path: "appointments",
        match,
      })
      .execPopulate();
    const appointment = req.doctor.appointments;

    const result = await Promise.all(
      appointment.map(async (val) => {
        const patient = await Patient.find({ _id: val.patientId });
 
        const user = await SignUp.find({ email: patient[0].email });
        const prescription = await Prescription.find({
          appointmentId: val._id,
        });
        if (prescription) {

          const appoin = {
            appointmentId: val._id,
            patient_name: user[0].name,
            patient_email: patient[0].email,
            other_illness: patient[0].other_illness,
            operations_surgeries: patient[0].operations_surgeries,
            family_history: patient[0].family_history,
            // "tabletName" : prescription.tabletName,
            ...prescription,
            appointmentDate: val.date,
            appointmentTime: val.time,
            completed: val.completed,
            // "Quantity" : prescription.Quantity,
            // "dose": prescription.dose,
            // "numberOfDays": prescription.numberOfDays
          };
          return appoin;
        }
      })
    );

    // console.log(req.doctor.appointments);
    //console.log(result)
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.get("/doctor/appointments/:id", doctorAuth, async (req, res) => {
  const appointmentId = req.params.id;
  const appointment = await Appointment.findById(appointmentId);
  //console.log(appointment);

  const patient = await Patient.find({ _id: appointment.patientId });
  // console.log(val);
  const user = await SignUp.find({ email: patient[0].email });
  // const prescription = await Prescription.find({
  //   appointmentId: val._id,
  // });
  // if (prescription) {
  const appoin = {
    appointmentId: appointment._id,
    patient_name: user[0].name,
    patient_email: patient[0].email,
    other_illness: patient[0].other_illness,
    operations_surgeries: patient[0].operations_surgeries,
    family_history: patient[0].family_history,
    // "tabletName" : prescription.tabletName,
    // ...prescription,
    appointmentDate: appointment.date,
    appointmentTime: appointment.time,
    completed: appointment.completed,
    // "Quantity" : prescription.Quantity,
    // "dose": prescription.dose,
    // "numberOfDays": prescription.numberOfDays
  };
  res.send(appoin);
  // return appoin;
  // }
});

router.patch("/doctor/appointments/:id", doctorAuth, async (req, res) => {
  const appointmentId = req.params.id;
  const flag = req.body.completed;
  //console.log(appointmentId);
  if (flag)
    try {
      await Appointment.findByIdAndUpdate(appointmentId, { completed: flag });
      res.send("success");
    } catch (e) {
      res.status(400).send("failed");
    }
 
});

router.delete("/doctor/appointments/:id", doctorAuth, async (req, res) => {
  const appointmentId = req.params.id;
  try{
    await Appointment.findByIdAndDelete(appointmentId);
    res.send("success");
  } catch (e) {
    res.status(400).send("failed");
  }  
  
})


router.get("/doctor/appointments/:id/prescription", doctorAuth, async (req, res) => {
  const appointmentId=req.params.id;
  try{
    const result=await Prescription.find({appointmentId});
    res.send(result)
  }catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
