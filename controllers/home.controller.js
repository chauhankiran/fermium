const homeController = {};

homeController.index = (req, res) => {
  res.render("home/index.view.html", { data: { title: "Fermium" }});
};

module.exports = homeController;