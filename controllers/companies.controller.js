const companiesController = {};

companiesController.index = (req, res) => {
  res.render("companies/index.view.html", { data: { title: res.locals.globalAppName }});
};

module.exports = companiesController;