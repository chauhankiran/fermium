const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const controllers = require("../controllers")

router.get("/", auth, controllers.dashboardController.index)

module.exports = router;