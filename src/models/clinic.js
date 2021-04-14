const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')
const clinicSchema = new mongoose.Schema({
    clinic_name: {
        type: String,
        required: true
    },
    clinic_address: [{
       
        area:{
            type: String
        },
        city:{
            type: String 
        },
        state:{
            type: String
        }, 
        country:{
            type: String
        },
        
    }],
    
    clinic_timing: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'doctor'
    },
    
})



const Clinic = mongoose.model('clinic', clinicSchema)

module.exports = Clinic