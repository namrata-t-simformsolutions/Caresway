const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Clinic = require("../models/clinic");
const SignUp = require("../models/signup");
const auth = require("../middlewares/doctorAuth");
const Signup = require("../models/signup");
const { concat } = require("async");

router.get("/doctors", async (req, res) => {
  const city = req.query.city;
  // const speciality = "dentist";
  const speciality = req.query.doctor_speciality;
  if (speciality) {
    Clinic.find({ "clinic_address.city": city }).then(async (clinic) => {
      if (clinic) {
        const result = await Promise.all(
          clinic.map(async (val) => {
            const doctor = await Doctor.find(
              {
                _id: val.owner,
                //doctor_speciality: speciality,
              }
            );
            if(doctor[0].doctor_speciality===speciality){
              const user = await Signup.find({ email: doctor[0].email });
            const temp = {
              id: doctor[0]._id,
              name: user[0].name,
              email: doctor[0].email,
              speciality: doctor[0].doctor_speciality,
              location: city,
            };
            return temp;
            }else {
              return null;
            }
            // else{
            //   const user = await Signup.find({ email: doctor[0].email });
            // const temp = {
            //   id: doctor[0]._id,
            //   name: user[0].name,
            //   email: doctor[0].email,
            //   speciality: doctor[0].doctor_speciality,
            //   location: city,
            // };
            // return temp;
            // }
            
          })
        );
        const finalRes=result.filter(function (el) {
          return el != null;
        });
        if (finalRes.length != 0) {
          res.send(finalRes);
        } else {
          res.status(400).send();
        }
      } else {
        console.log("clinic not found");
      }
    });
  } else if (city) {
    Clinic.find({ "clinic_address.city": city }).then(async (clinic) => {
      if (clinic) {
        const result = await Promise.all(
          clinic.map(async (val) => {
            const doctor = await Doctor.find({
              _id: val.owner,
            });
            const user = await Signup.find({ email: doctor[0].email });
            const temp = {
              id: doctor[0]._id,
              name: user[0].name,
              email: doctor[0].email,
              speciality: doctor[0].doctor_speciality,
              location: city,
            };
            return temp;
          })
        );
        if (result.length != 0) {
          res.send(result);
        } else {
          res.status(400).send();
        }
      } else {
        console.log("clinic not found");
      }
    });
  } 
});

router.get("/doctor/clinics", auth, async (req, res) => {
  const _id = req.doctor._id;
  const doctor = await Doctor.findById({ _id });
  if (!doctor) {
    return res.stastus(404).send();
  } else {
    await doctor.populate("clinic").execPopulate();
    res.send(doctor.clinic);
  }
});

router.get("/clinics", async (req, res) => {
  const clinics = await Clinic.find({ });
  if(clinics.length!=0){
    const result =await Promise.all(clinics.map(async (val)=>{
      const doctor = await Doctor.find({_id:val.owner});
       const user = await Signup.find({ email: doctor[0].email });
       const temp = {
         "Doctor_Id": doctor[0].id,
         "Doctor_name": user[0].name,
         "Doctor_Email": doctor[0].email,
        "Clinic_name": val.clinic_name,
        "Clinic_address": val.clinic_address,
        "Clinic_timing": val.clinic_timing
            }
            return temp;
    }
    )
    )
  res.send(result)
  }
  else{
    res.status(400).send(e)
  }

});

module.exports = router;
