const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.adminController.index);
router.get("/fields/:pickup", controllers.adminController.fieldsIndex);
router.get("/fields/:pickup/add", controllers.adminController.fieldsAdd);
router.post("/fields/:pickup", controllers.adminController.fieldsCreate);
router.get("/fields/:pickup/:id/edit", controllers.adminController.fieldsEdit);
router.post("/fields/:pickup/:id", controllers.adminController.fieldsUpdate);
router.post("/fields/:pickup/:id/delete", controllers.adminController.fieldsDestroy);

module.exports = router;