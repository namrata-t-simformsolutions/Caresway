const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const { Timestamp } = require('mongodb')
const clinicSchema = new mongoose.Schema({
    clinic_name: {
        type: String,
        required: true
    },
    clinic_address: {
        type: String,
        required: true,
        trim: true,
    },
    
    clinic_timing: {
        type: String,
        required: true,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})



const Clinic = mongoose.model('clinic', clinicSchema)

module.exports = Clinic