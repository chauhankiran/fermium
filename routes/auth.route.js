const express = require("express");
const router = express.Router();

const controlles = require("../controllers");

router.get("/login", controlles.authController.showLogin);
router.get("/register", controlles.authController.showRegister);
router.post("/login", controlles.authController.login);
router.post("/register", controlles.authController.register);

module.exports = router;