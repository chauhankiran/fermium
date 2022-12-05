const { Company } = require("../models");

const companiesController = {};

companiesController.index = async (req, res, next) => {
  try {
    const companies = await Company.findAndCountAll();

    const data = { title: "Companies", companies: companies.rows, count: companies.count }
    res.render("companies/index.view.html", { data });
  } catch (err) {
    next(err);
  }
};

companiesController.add = (req, res) => {
  res.render("companies/add.view.html", { data: { title: "Add new company" }});
}

companiesController.edit = (req, res) => {
  res.render("companies/edit.view.html", { data: { title: "Edit this company" }});
}

companiesController.show = (req, res) => {
  res.render("companies/show.view.html", { data: { title: "Show this company" }});
}

companiesController.create = (req, res) => {
  res.status(501).send("Not implemented");
  return;
}

companiesController.update = (req, res) => {
  res.status(501).send("Not implemented");
  return;
}

companiesController.destroy = (req, res) => {
  res.status(501).send("Not implemented");
  return;
}

module.exports = companiesController;