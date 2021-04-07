const Patient = require("../models/patient");
const router = require('express').Router();

router.get('/',(req,res)=>{
    const match = {};
  if (req.query.gender) {
    match.gender = req.query.gender;
  }
  if (req.query.blood_group) {
    match.blood_group = req.query.blood_group;
  }
  
    Patient.find({...match},(error,obj)=>{
        if(error) res.send(error);
        else res.send(obj);
    })
})

module.exports=router;