const express = require("express");
const router = express.Router();

const controlles = require("../controllers")

router.get("/", controlles.companiesController.index)

module.exports = router;