const express = require('express')
require('../controllers/db_controller')
const doc_sign_up_router = require('./routers/sign_up.js')
const add_clinic = require('./routers/add-clinic.js')

const app = express()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(doc_sign_up_router)
app.use(add_clinic)

app.listen(port, () => {
    console.log('server is up on port ' + port)
})