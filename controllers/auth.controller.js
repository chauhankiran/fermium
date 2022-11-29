const authController = {};

authController.showLogin = (req, res) => {
  res.render("auth/login.view.html", { data: { title: "Login" }});
};

authController.showRegister = (req, res) => {
  res.render("auth/register.view.html", { data: { title: "Register" }});
};

module.exports = authController;