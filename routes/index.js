const express = require("express");
const router = express.Router();

router.use("/", require("./home.route"));
router.use("/", require("./auth.route"));
router.use("/dashboard", require("./dashboard.route"));
router.use("/companies", require("./companies.route"));
router.use("/admin", require("./admin.route"));

module.exports = router;
