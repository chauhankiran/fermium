const { CompanySource, CompanyStage, User } = require("../models");

// Get company sources service
const getCompanySourcesService = () => {
  return CompanySource.findAll({
    include: [
      {
        model: User,
        as: "creator",
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: User,
        as: "updator",
        required: false,
        attributes: ["id", "firstName", "lastName"]
      }
    ]
  });
}

// Get company stages services
const getCompanyStagesService = () => {
  return CompanyStage.findAll({
    include: [
      {
        model: User,
        as: "creator",
        attributes: ["id", "firstName", "lastName"]
      },
      {
        model: User,
        as: "updator",
        required: false,
        attributes: ["id", "firstName", "lastName"]
      }
    ]
  });
}

const adminController = {};


// The admin page
adminController.index = (req, res, next) => {
  res.render("admin/index.view.html", { data: { title: "Admin" }});
  return;
}

// List of the values for the given pickup field.
adminController.fieldsIndex = async (req, res, next) => {
  const pickup = req.params.pickup;
  let fields = "";
  let title = "";

  // Check one of valid pickup fields.
  if (pickup === "source") {
    title = "Source pickup values"
    values = await getCompanySourcesService();
  } else if (pickup === "stage") {
    title = "Stage pickup values"
    values = await getCompanyStagesService();
  }

  res.render("admin/fields/index.view.html", { data: { title, pickup, values }});
  return;
}

// Add new value page for the given pickup field.
adminController.fieldsAdd = async (req, res, next) => {
  const pickup = req.params.pickup;
  let title = "";

  // Check one of valid pickup fields.
  if (pickup === "source") {
    title = "Add new field for Source pickup"
  } else if (pickup === "stage") {
    title = "Add new field for Stage pickup"
  }

  res.render("admin/fields/add.view.html", { data: { title, pickup }});
  return;
}

// Create a new value for the given pickup field.
adminController.fieldsCreate = async (req, res, next) => {
  const pickup = req.params.pickup;
  const name = req.body.name;

  let value = null;

  try {
    if (pickup === "source") {
      value = await CompanySource.create({ name, active: 1, createdBy: req.user.id }, { silent: true })
    } else if (pickup === "stage") {
      value = await CompanyStage.create({ name, active: 1, createdBy: req.user.id }, { silent: true });
    }

    req.flash("info", "Value with name " + name + " is created.");
    res.redirect(`/admin/fields/${pickup}`);
    return;
  } catch (err) {
    next(err);
  }
}

// Edit value page for the given pickup field.
adminController.fieldsEdit = async (req, res, next) => {
  const pickup = req.params.pickup;
  const id = req.params.id;
  let value = null;

  try {
    if (pickup === "source") {
      value = await CompanySource.findOne({ where: { id }})
      title = "Source pickup values / " + value.name;
    } else if (pickup === "stage") {
      value = await CompanyStage.findOne({ where: { id }})
      title = "Stage pickup values / " + value.name;
    }

    res.render("admin/fields/edit.view.html", {data: { title, value, pickup }});
    return;
  } catch (err) {
    next(err);
  }
}

// Update value for the given pickup field.
adminController.fieldsUpdate = async (req, res, next) => {
  const pickup = req.params.pickup;
  const id = req.params.id;
  const name = req.body.name;
  let value = null;

  try {
    if (pickup === "source") {
      value = await CompanySource.findOne({ where: { id }})
      value.name = name;
      value.updatedBy = req.user.id;
      await value.save();
    } else if (pickup === "stage") {
      value = await CompanyStage.findOne({ where: { id }})
      value.name = name;
      value.updatedBy = req.user.id;
      await value.save();
    }

    res.redirect(`/admin/fields/${pickup}`);
    return;
  } catch (err) {
    next(err);
  }
}

// Delete the value for the given pickup.
adminController.fieldsDestroy = async (req, res, next) => {
  const pickup = req.params.pickup;
  const id = req.params.id;
  let value = null;

  try {
    if (pickup === "source") {
      value = await CompanySource.destroy({ where: { id }})
      
    } else if (pickup === "stage") {
      value = await CompanyStage.destroy({ where: { id }})
      
    }

    res.redirect(`/admin/fields/${pickup}`);
    return;
  } catch (err) {
    // TODO: Need improvements here?
    if (err.name === "SequelizeForeignKeyConstraintError") {
      req.flash("alert", "This value is already associated with one or more companies.");
      res.redirect(`/admin/fields/${pickup}`);
      return;
    } else {
      next(err);  
    }
  }
}

module.exports = adminController;