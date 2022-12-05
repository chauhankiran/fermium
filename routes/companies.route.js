const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

const controllers = require("../controllers")

router.get("/", auth, controllers.companiesController.index);
router.get("/add", auth, controllers.companiesController.add);
router.get("/:id", auth, controllers.companiesController.show);
router.get("/:id/edit", auth, controllers.companiesController.edit);
router.post("/", auth, controllers.companiesController.create);
router.put("/:id", auth, controllers.companiesController.update);
router.delete("/:id", auth, controllers.companiesController.destroy);

module.exports = router;