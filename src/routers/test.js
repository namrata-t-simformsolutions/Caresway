const Patient = require("../models/patient");
const SignUp=require("../models/signup");
const Doctor=require("../models/doctor");
const Clinic = require("../models/clinic");
const router = require('express').Router();

// router.get('/',async(req,res)=>{
//     const match = {};
//   if (req.query.gender) {
//     match.gender = req.query.gender;
//   }
//   if (req.query.blood_group) {
//     match.blood_group = req.query.blood_group;
//   }
//   var arr=[];
//   await SignUp.find({isDoc:true}, (error,obj)=>{
//        if(error) res.send(error);
//         else{
//           obj.forEach((doc)=>{
//             Doctor.find({email:doc.email}).then((val)=>{

//               // arr=arr.concat(val[0]);
//               // arr.push(val[0]);
//               console.log(val[0].email);
//             }).catch((e)=>{
//               console.log(e);
//             })
//           })
//           console.log(arr);
//           res.send(arr);
//         }
        
//     })
// })

// router.get('/test',(req,res)=>{
//   res.send([{
//     "name":"bob"
//   },{
//     "name":"marley"
//   }])
// })

router.get('/test',async(req,res)=>{
  const clinics=await Clinic.find({'clinic_address.city':'ahmedabad'});
  clinics.forEach((clinic)=>{
    console.log(clinic.clinic_address);
  })
  // console.log(clinics.address);
})


module.exports=router;