const express = require("express");
const router = express.Router();

const controlles = require("../controllers");

router.get("/login", controlles.authController.showLogin);
router.get("/register", controlles.authController.showRegister);

module.exports = router;