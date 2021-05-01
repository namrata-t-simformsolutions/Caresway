const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Signup = require("../models/signup");


router.get("/doctor/:id", async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id);
  if (!doctor) {
    return res.status(400).send("no doctor founds");
  } else {
    const user = await Signup.find({ email: doctor.email });
    const temp={
        "doctor_name":user[0].name,
        "doctor_email":doctor.email,
        "doctor_speciality":doctor.doctor_speciality,
        "doctor_contact_no":doctor.contact_no
    }
    return res.send(temp);
  }
});


module.exports=router;