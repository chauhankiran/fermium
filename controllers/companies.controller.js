const { Company } = require("../models");

// Get company service
const getCompanyService = (id) => {
  return Company.findOne({ where: { id }});
}

const companiesController = {};

// Fetch all the companies.
companiesController.index = async (req, res, next) => {
  try {
    const companies = await Company.findAndCountAll({
      order: [
        ['id', 'desc']
      ]
    });

    const data = { title: "Companies", companies: companies.rows, count: companies.count };
    res.render("companies/index.view.html", { data });
  } catch (err) {
    next(err);
  }
};

// Add company page.
companiesController.add = (req, res) => {
  res.render("companies/add.view.html", { data: { title: "Add new company" }});
}

// Edit company page.
companiesController.edit = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await getCompanyService(id);

    const data = { title: "Edit this company", company }
    res.render("companies/edit.view.html", { data });
  } catch (err) {
    next(err);
  }
}

// Show company page.
companiesController.show = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await getCompanyService(id);

    const data = { title: "Show this company", company };
    res.render("companies/show.view.html", { data });
  } catch (err) {
    next(err);
  }
}

// Create a new company.
companiesController.create = async (req, res, next) => {
  const { name, website } = req.body;

  try {
    const company = await Company.create({
      name,
      website,
      active: 1,
      createdBy: req.user.id
    }, {silent: true});

    res.redirect(`/companies/${company.id}`);
    return;
  } catch (err) {
    next(err);
  }
}

// Update an existing company.
companiesController.update = async (req, res, next) => {
  const id = req.params.id;
  const { name, website } = req.body;

  try {
    const company = await getCompanyService(id);

    company.name = name;
    company.website = website;
    company.updatedBy = req.user.id;

    await company.save();

    res.redirect(`/companies/${company.id}`);
    return;
  } catch (err) {
    next(err);
  }
}

// Delete a company.
companiesController.destroy = async (req, res, next) => {
  const id = req.params.id;

  try {
    const company = await Company.destroy({ where: { id }});

    res.redirect("/companies");
    return;
  } catch (err) {
    next(err);
  }
}

module.exports = companiesController;