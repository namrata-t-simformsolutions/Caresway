const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");

router.get("/doctors", async (req, res) => {
  const match = {};
  if (req.query.location) {
    match.location = req.query.location;
  }
  if (req.query.speciality) {
    match.speciality = req.query.speciality;
  }
  Doctor.find({...match},(error,obj)=>{
    if(error) res.send(error);
    else res.send(obj);
  })
});