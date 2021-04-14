const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Clinic = require("../models/clinic");
const auth = require("../middlewares/doctorAuth");
const e = require("express");

router.get("/doctors", async (req, res) => {
  const city = req.query.city;
  const speciality = req.query.doctor_speciality;
  if(city&&speciality){
  Clinic.find({ "clinic_address.city": city }).then(async(clinic) => {
    if (clinic) {
      const result=await Promise.all(clinic.map(async (val)=>{
        const doctor= await Doctor.find({"_id":val.owner , "doctor_speciality": speciality});
        return doctor[0];
      }))
      if(result.length!=0){
        res.send(result);
      }
      else{
          res.status(400).send()
      }
    }else{
      console.log("clinic not found");
    }
  });
}
else{
  res.send('enter both values')
}
});


router.get("/clinics", auth, async (req, res) => {
  const _id = req.doctor._id;
  const doctor = await Doctor.findById({ _id });
  if (!doctor) {
    return res.stastus(404).send();
  } else {
    await doctor.populate("clinic").execPopulate();
    //console.log(doctor.clinic)
    res.send(doctor.clinic);
  }
});

module.exports = router;
