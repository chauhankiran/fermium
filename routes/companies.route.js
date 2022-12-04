const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const controlles = require("../controllers")

router.get("/", auth, controlles.companiesController.index)

module.exports = router;