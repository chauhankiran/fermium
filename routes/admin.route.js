const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", auth, controllers.adminController.index);

// Fields management.
// We're messed up with routes and methods name.
// TODO: Update and re-structure.
router.get("/:module/fields", auth, controllers.adminController.moduleFieldsIndex);
router.get("/:module/fields/:id/edit", auth, controllers.adminController.moduleFieldsEdit);
router.post("/:module/fields/:id", auth, controllers.adminController.moduleFieldsUpdate);

router.get("/fields/:pickup", auth, controllers.adminController.fieldsIndex);
router.get("/fields/:pickup/add", auth, controllers.adminController.fieldsAdd);
router.post("/fields/:pickup", auth, controllers.adminController.fieldsCreate);
router.get("/fields/:pickup/:id/edit", auth, controllers.adminController.fieldsEdit);
router.post("/fields/:pickup/:id", auth, controllers.adminController.fieldsUpdate);
router.post("/fields/:pickup/:id/delete", auth, controllers.adminController.fieldsDestroy);

module.exports = router;