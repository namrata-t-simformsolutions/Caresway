const express = require("express");
const router = express.Router();
//const Doctor = require("../models/doctor");
const Clinic = require("../models/clinic")
const doctorAuth = require("../middlewares/doctorAuth");

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce(
      (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
      nestedObj
    );
  };

router.patch("/doctor/clinic/:id/:clinicAddressId", doctorAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const _id = req.params.id
  const clinic_address_id = req.params.clinicAddressId
  const allowedUpdates = [
    "clinic_name",
    "clinic_address",
    "clinic_timing",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });
    const clinic = await Clinic.findById(_id)
    if(clinic){
  try {
    updates.forEach(async (update) => {
        if (update == "clinic_address") {
          const tempUpdate = getNestedObject(req.body, ["clinic_address"]);
          const clinicAddress = ["area","city", "state", "country"];
          const isvalidclinicAddress = Object.keys(
            tempUpdate
          ).every((val) => clinicAddress.includes(val));
          if (!isvalidclinicAddress) {
            return res
              .status(400)
              .send({ error: "Invalid address updates" });
          }
          const clinic_address = await Clinic.clinic_address.findById(clinic_address_id)
          Object.keys(tempUpdate).map((value) => {
            clinic.clinic_address[value]=req.body.clinic_address[value]
          })
        }
        else {
            clinic[update] = req.body[update];
          }
        });
        await clinic.save();
       res.status(201).send(clinic);
    }
   catch (e) {
    res.status(400).send(e);
    console.log(e)
  }
}
});

module.exports = router;