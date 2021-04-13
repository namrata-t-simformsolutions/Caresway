const router = require("express").Router();
const doctorAuth=require('../middlewares/doctorAuth');

router.get("/doctor/logout", doctorAuth, async (req, res) => {
  try {
    req.doctor.tokens = req.doctor.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.doctor.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
