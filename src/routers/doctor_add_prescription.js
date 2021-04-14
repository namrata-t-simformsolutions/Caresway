const Router = require("express").Router();
const Prescription = require("../models/prescription");
const doctorAuth = require("../middlewares/doctorAuth");

Router.post("/doctor/:id/add_prescription", doctorAuth, async (req, res) => {
  // const allowedValues = ["tabletName", "Quantity", "dose", "numberOfDays"];
  // const values = Object.keys(req.body);
  // const isValid = values.every((val) => {
  //   console.log(val)
  //   allowedValues.includes(val);
  // });
  // if (!isValid) {
  //   res.status(400).send("invalid values");
  // } else {
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

module.exports=Router;