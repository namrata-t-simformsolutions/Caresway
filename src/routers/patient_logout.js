const router = require('express').Router();
const patientAuth=require('../middlewares/patientAuth');

router.get('/patient/logout',patientAuth,async (req,res)=>{
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

module.exports=router;