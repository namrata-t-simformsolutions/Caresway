const express = require("express");
const router = express.Router();
const Patient = require("../models/patient");
const patientAuth = require("../middlewares/patientAuth");

const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

router.patch("/patient/profile", patientAuth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "contact_number",
    "dob",
    "height",
    "weight",
    "gender",
    "address",
    "blood_group",
    "allergies",
    "other_illness",
    "operations_surgeries",
    "family_history"
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "Invalid updates" });
  try {
    updates.forEach((update) => {
      if (update == "other_illness") {
        const tempUpdate = getNestedObject(req.body, ["other_illness"]);
        const otherIllnessUpdates = ["illness_name", "medication_name","medication_doses","medication_prescribedBy"];
        const isvalidOtherIllnessUpdates = Object.keys(
          tempUpdate
        ).every((val) => otherIllnessUpdates.includes(val));
        if (!isvalidOtherIllnessUpdates || tempUpdate['illness_name']==undefined) {
          return res
            .status(400)
            .send({ error: "Invalid illness updates" });
        }
        req.patient.other_illness = req.patient.other_illness.concat(
          req.body[update]
        );
      }else if(update == "operations_surgeries"){
        const tempUpdate = getNestedObject(req.body,["operations_surgeries"]);
        const operations_surgeriesUpdates=["operation_surgery_name","date"];
        const isvalidOperations_surgeriesUpdates=Object.keys(
          tempUpdate
        ).every((val)=>operations_surgeriesUpdates.includes(val));
        if(!isvalidOperations_surgeriesUpdates){
          return res
            .status(400)
            .send({ error: "Invalid operations/surgery updates" });
        }
        req.patient.operations_surgeries=req.patient.operations_surgeries.concat(
          req.body[update]
        );
      }
      else if(update == "family_history"){
        const tempUpdate = getNestedObject(req.body,["family_history"]);
        const family_historyUpdates=["relation","illness"];
        const isvalidfamily_historyUpdates=Object.keys(
          tempUpdate
        ).every((val)=>family_historyUpdates.includes(val));
        if(!isvalidfamily_historyUpdates){
          return res
            .status(400)
            .send({ error: "Invalid family history updates" });
        }
        req.patient.family_history=req.patient.family_history.concat(
          req.body[update]
        );
      }else if(update == "allergies"){
        req.patient.allergies=req.patient.allergies.concat(
          req.body[update]
        )
      }
      else {
        req.patient[update] = req.body[update];
      }
    });
    await req.patient.save();
    res.status(201).send(req.patient);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
