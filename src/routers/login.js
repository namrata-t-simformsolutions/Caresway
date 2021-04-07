const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
// const Doctor = require("../models/doctor");

router.post("/login", async (req, res) => {
  try {
    const patient = await Patient.findByCredentails(
      req.body.email,
      req.body.password
    );
    // const doctor=await Doctor.findByCredentails(
    //     req.body.email,
    //     req.body.password
    // )
    // if(!patient){
    //     const token = await doctor.getUserAuthToken();
    //     res.send({ doctor, token });
    // }
    // if(!doctor){
        const token = await patient.getPatientAuthToken();
        res.send({ patient, token });
    // }
    
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
