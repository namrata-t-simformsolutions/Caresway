const express = require('express')
const router = express.Router()
const Clinic = require('../models/clinic')
router.post('/clinic', async (req,res) =>{
    const clinic = new Clinic(req.body)
    try{
        await clinic.save()
        res.status(201).send('success!!')
    }
    catch(e){
        console.log(e)
    }
})
module.exports = router
