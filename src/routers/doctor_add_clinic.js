const express = require('express')
const router = express.Router()
const auth = require('../middlewares/doctorAuth')
const Clinic = require('../models/clinic')
router.post('/doctor/clinic/add', auth, async (req,res) =>{
    //const clinic = new Clinic(req.body)
    const clinic = new Clinic({
        ...req.body,
        owner: req.doctor._id,   
    })
    try{
        await clinic.save()
        res.status(201).send(clinic)
    }
    catch(e){
        console.log(e)
    }
})
module.exports = router
