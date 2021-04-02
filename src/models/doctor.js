const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
            }
        } 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    },
    contact_no:{
        type: Number,
        validate(value){
            if(value){
                if(value.len()!=10){
                    throw new Error("Number must be 10 digit")
                }
            }
        }
    }, 
    doctor_speciality: {
        type: String,
        required: true,
        trim: true,
    },
    doctor_gender:{
        type: String,
    },
    doctor_education: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})



const Doctor = mongoose.model('doctor', doctorSchema)

module.exports = Doctor