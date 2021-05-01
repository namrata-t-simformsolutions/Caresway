const router = require("express").Router();
const Prescription = require("../models/prescription");
const doctorAuth = require("../middlewares/doctorAuth");

router.post("/doctor/:id/add_prescription", doctorAuth, async (req, res) => {
  
    const pres = new Prescription({
      appointmentId: req.params.id,
      ...req.body,
    });
    try {
      await pres.save();
      res.send(pres);
    } catch (error) {
      res.status(400).send(error);
    }
  // }
});

module.exports=router;