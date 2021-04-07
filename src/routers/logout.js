const router = require('express').Router();

router.get('/patient/logout',auth,(req,res)=>{
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

router.get('/doctor/logout',auth,(req,res)=>{
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