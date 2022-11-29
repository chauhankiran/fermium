const homeController = {};

homeController.index = (req, res) => {
  res.render("home/index.view.html", { data: { title: res.locals.globalAppName }});
};

module.exports = homeController;