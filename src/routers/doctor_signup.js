const express = require('express')
const router = express.Router()
const Doctor = require('../models/doctor')
router.post('/doctor/signup', async (req,res) =>{
    const doctor = new Doctor(req.body)
    try{
        await doctor.save()
        res.status(201).send('success!!')
    }
    catch(e){
        console.log(e)
    }
})
module.exports = router
