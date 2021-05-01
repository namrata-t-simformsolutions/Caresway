const express = require("express");
const router = express.Router();
const Doctor = require('../models/doctor')
const doctorAuth = require('../middlewares/doctorAuth')
const Signup = require('../models/signup')

router.get("/Myprofile", doctorAuth, async (req,res) =>{
    const doctorId = req.doctor._id;
    try{
        const doctor = await Doctor.findById(doctorId)
        const user = await Signup.find({email: doctor.email})
        
        const temp = {
            "doctor_id":doctorId,
            "doctor_name": user[0].name,
            "doctor_email": doctor.email,
            "doctor_contact_no": doctor.contact_no,
            "doctor_speciality": doctor.doctor_speciality,
            "doctor_gender": doctor.doctor_gender,
            "doctor_education": doctor.doctor_education,
        }
        res.send(temp)
    }
    catch(e){
        res.status(400).send(e)
    }
})


module.exports = router;