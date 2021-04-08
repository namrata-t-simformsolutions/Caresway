const router = require('express').Router();
const auth = require('../middlewares/doctorAuth')
const auth1 = require('../middlewares/patientAuth')

router.post('/patient/logout',auth1, async(req,res)=>{
    try {
        req.patient.tokens = req.patient.tokens.filter((token) => {
          return token.token !== req.token;
        });
        await req.patient.save();
        res.send();
      }
      catch (e) {
        res.status(500).send();
      }
})

router.post('/doctor/logout',auth, async(req,res)=>{
    try {
        req.doctor.tokens = req.doctor.tokens.filter((token) => {
          return token.token !== req.token;
        });
        await req.doctor.save();
        res.send();
      }
      catch (e) {
        res.status(500).send();
      }
})

module.exports=router;