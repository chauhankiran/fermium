const express = require("express");
const router = express.Router();

const controlles = require("../controllers")

router.get("/", controlles.dashboardController.index)

module.exports = router;