const express = require('express')
require('../controllers/db_controller')

const loginRoute=require('./routers/login');
const doc_sign_up_router = require('./routers/sign_up.js')
const add_clinic = require('./routers/add-clinic.js')

const patientSignUp=require('./routers/patient_signup');
// const patientLogout=require('./routes/patient_logout');
// const patientPrescription=require('./routes/patient_prescription');
// const patientUpdateProfile=require('./routes/patient_update_profile');
// const patientAppointment=require('./routes/patient_appointments');

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(doc_sign_up_router)
app.use(add_clinic)

app.use(loginRoute);
app.use(patientSignUp);
// app.use(patientPrescription);
// app.use(patientUpdateProfile);
// app.use(patientAppointment);
// app.use(patientLogout);

app.listen(port,()=>{
    console.log('server is up at port at '+port);
})
