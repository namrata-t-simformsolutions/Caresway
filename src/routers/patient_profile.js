const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const patientAuth = require("../middlewares/patientAuth");
const Signup=require("../models/signup");

router.get("/patient/profile", patientAuth, async (req,res) =>{
    const patientId = req.patient._id;
    try{
        const patient =await Patient.findById(patientId);
        const user = await Signup.find({email: patient.email})
        const temp = {
            "patient_name":user[0].name,
            "patient_email": patient.email,
            "patient_allergies":patient.allergies,
            "patient_other_illness":patient.other_illness,
            "patient_operations_surgeries":patient.operations_surgeries,
            "patient_family_history":patient.family_history,
            "patient_contact_number": patient.contact_number,
            "patient_dob": patient.dob,
            "patient_height": patient.height,
            "patient_weight": patient.weight,
            "patient_gender": patient.gender,
            "patient_address": patient.address,
            "patient_blood_group": patient.blood_group
        }
        res.send(temp)
    }
    catch(e){
        res.status(400).send(e)
    }
})
module.exports = router;