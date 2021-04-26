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

clinicSchema.methods.toJSON= function(){
    const clinic=this;
    const clinicObject=clinic.toObject();
    const clinicAddressObject=clinicObject.clinic_address[0];
    delete clinicObject._id;
    delete clinicObject.__v;
    delete clinicObject.owner;
    delete clinicAddressObject._id;
    return clinicObject;
  }
  


const Clinic = mongoose.model('clinic', clinicSchema)

module.exports = Clinic