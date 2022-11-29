const express = require("express");
const router = express.Router();

const controlles = require("../controllers")

router.get("/", controlles.homeController.index)

module.exports = router;