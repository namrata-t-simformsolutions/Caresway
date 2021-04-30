const express = require('express')
const cors = require('cors')

require('../controllers/db_controller')

const loginRoute=require('./routers/login');
const doc_sign_up_router = require('./routers/doctor_signup.js')
const add_clinic = require('./routers/doctor_add_clinic.js')
const doctorAppointment=require('./routers/doctor_appointments');
const doctorAddPrescription=require('./routers/doctor_add_prescription');
const doctorLogout = require('./routers/doctor_logout')
const doctor = require('./routers/doctors')
const doctorUpdateProfile=require('./routers/doctor_update_profile');
const updateClinic=require('./routers/update_clinic');
const doctorDetial=require('./routers/doctor_detail');
const doctorProfile = require('./routers/doctor_profile');

const patientSignUp=require('./routers/patient_signup');
const patientLogout=require('./routers/patient_logout');
const patientUpdateProfile=require('./routers/patient_update_profile');
const patientAppointment=require('./routers/patient_appointments');
const patientBookAppointment=require('./routers/patient_book_appointment');
const patientPrescription = require('./routers/patient_prescription');
const patientProfile = require('./routers/patient_profile');

const test=require('./routers/test');

const app = express()
const port = process.env.PORT


const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use(express.json())

app.use(test);
app.use(doc_sign_up_router);
app.use(add_clinic);
app.use(doctorLogout);
app.use(doctor)
app.use(doctorAppointment);
app.use(doctorAddPrescription);
app.use(updateClinic)
app.use(doctorDetial);
app.use(doctorProfile);

app.use(loginRoute);
app.use(patientSignUp);
app.use(patientUpdateProfile);
app.use(doctorUpdateProfile);
app.use(patientBookAppointment);
app.use(patientAppointment);
app.use(patientLogout);
app.use(patientPrescription);
app.use(patientProfile);


app.listen(port,()=>{
    console.log('server is up at port at '+port);
})