const express = require("express");
const router = express.Router();

router.use("/", require("./home.route"))
router.use("/", require("./auth.route"))

module.exports = router;
