const express = require('express')
const Doctor = require('../models/doctor')
const {sendMail}=require('../emails/account');
const router = express.Router()
const Signup = require('../models/signup')

router.post('/doctor/signup', async (req,res) =>{
    const doctorSignup = new Signup(req.body)
    const doctor=new Doctor({
        email:req.body.email,doctor_speciality:req.body.doctor_speciality
    });
    doctorSignup.isDoc=true;
    try{
        
        await doctorSignup.save();
        await doctor.save();
        
        // sendMail(doctorSignup.email,doctorSignup.name);
        res.status(201).send('success!!')
   } 
    catch(error){
        
        console.log(error)
        res.status(500).send(error)
    }
})


module.exports = router
