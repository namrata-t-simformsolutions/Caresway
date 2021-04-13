const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");
const Clinic = require('../models/clinic');
const auth = require('../middlewares/doctorAuth')
const async = require('async')

let arr = []


router.get('/doctors', async(req,res)=> {
    const city = req.query.city
    Clinic.find({'clinic_address.city' : city}).then((clinic)=>{
        if(clinic){
         async.each(clinic, function(val, callback) {
                Doctor.find({'_id': val.owner}).then((doctor)=>{
                    if(doctor){
                        arr.push(doctor)
                        callback()
                    }
                    else{
                        callback('not found')
                    }
                    
                    console.log(doctor)
                    
                })
                
            },(error)=>{
                if(error){
                    console.log(error)
                }
            });
            
        }
        
    })
    // setTimeout(() => {
    //     res.send(arr)
    // },3000);
    
})


// const express = require("express");
// const router = express.Router();
// const Doctor = require("../models/doctor");
 
router.get("/clinics", auth, async (req, res) => {
    const _id = req.doctor._id
    const doctor = await Doctor.findById({_id})
    if(!doctor){
        return res.stastus(404).send()
    }
    else{
    await doctor.populate('clinic').execPopulate()
    //console.log(doctor.clinic)
    res.send(doctor.clinic)
}
});

module.exports = router