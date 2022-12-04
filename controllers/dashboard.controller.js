const dashboardController = {};

dashboardController.index = (req, res) => {
  res.render("dashboard/index.view.html", { data: { title: res.locals.globalAppName }});
};

module.exports = dashboardController;