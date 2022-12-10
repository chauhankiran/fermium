const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const controllers = require("../controllers")

router.get("/", auth, controllers.companiesController.index);
router.get("/download", auth, controllers.companiesController.download);
router.get("/add", auth, controllers.companiesController.add);
router.get("/:id", auth, controllers.companiesController.show);
router.get("/:id/edit", auth, controllers.companiesController.edit);
router.post("/", auth, controllers.companiesController.create);
router.post("/:id", auth, controllers.companiesController.update);
router.post("/:id/delete", auth, controllers.companiesController.destroy);

module.exports = router;