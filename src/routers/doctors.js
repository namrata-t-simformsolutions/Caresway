const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Clinic = require('../models/clinic');
const auth = require('../middlewares/doctorAuth')
const auth1 = require('../middlewares/patientAuth')


router.get('/doctors/:clinic_address.city',  auth1, auth, async(req,res)=> {
  const city = req.params.clinic_address.city

  Clinic.findById(city).then((clinic)=> {
      if(!clinic) {
          return res.status(400).send()
      }

      res.send(clinic)
  })
})