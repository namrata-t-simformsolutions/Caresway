const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Clinic = require("../models/clinic");
const auth = require("../middlewares/doctorAuth");

router.get("/doctors", async (req, res) => {
  const city = req.query.city;
  Clinic.find({ "clinic_address.city": city }).then(async(clinic) => {
    if (clinic) {
      const resu=await Promise.all(clinic.map(async (val)=>{
        const doctor= await Doctor.find({_id:val.owner});
        return doctor[0];
      }))
      res.send(resu);
    }else{
      console.log("clinic not found");
    }
  });
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
