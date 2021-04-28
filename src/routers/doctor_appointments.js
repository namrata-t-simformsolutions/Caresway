const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Patient=require("../models/patient");
const doctorAuth = require("../middlewares/doctorAuth");
const Prescription = require("../models/prescription");
const SignUp = require("../models/signup");


router.get("/doctor/appointments", doctorAuth, async (req, res) => {
  const match = { doctorId: req.doctor._id };
  
  try {
    await req.doctor.populate({
        path: "appointments",
        match
      })
      .execPopulate();
      const appointment = req.doctor.appointments;
      
       const result =await Promise.all(appointment.map(async (val)=>{
       const patient= await Patient.find({_id:val.patientId});
       const user = await SignUp.find({ email: patient[0].email });
       const prescription = await Prescription.find({appointmentId:val._id});
       if(prescription){
         //console.log(prescription)
         const appoin = {
          "name": user[0].name,
          "email": patient[0].email,
          "other_illness": patient[0].other_illness,
          "operations_surgeries": patient[0].operations_surgeries,
          "family_history": patient[0].family_history,
          // "tabletName" : prescription.tabletName, 
          ...prescription,
          "appointmentDate": val.date,
          "appointmentTime":val.time 
          // "Quantity" : prescription.Quantity,
          // "dose": prescription.dose,
          // "numberOfDays": prescription.numberOfDays
         }
         return appoin
       }
      }))
      
    // console.log(req.doctor.appointments);
    //console.log(result)
    res.send(result);
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
});

module.exports = router;
