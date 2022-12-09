const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/login", controllers.authController.showLogin);
router.get("/register", controllers.authController.showRegister);
router.post("/login", controllers.authController.login);
router.post("/register", controllers.authController.register);
router.post("/logout", controllers.authController.logout);

module.exports = router;