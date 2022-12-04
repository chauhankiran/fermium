const crypto = require("crypto");
const { User } = require("../models");

const authController = {};

authController.showLogin = (req, res) => {
  res.render("auth/login.view.html", { data: { title: "Login" }});
};

authController.showRegister = (req, res) => {
  res.render("auth/register.view.html", { data: { title: "Register" }});
};

authController.login = async (req, res, next) => {
  res.status(501).send("Not Implemented")
}

authController.register = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Validations
  if (!firstName) {
    req.flash("alert", "First name is required.");
    res.render("auth/register.view.html");
    return;
  }

  if (!lastName) {
    req.flash("alert", "Last name is required.");
    res.render("auth/register.view.html");
    return;
  }

  if (!email) {
    req.flash("alert", "Email is required.");
    res.render("auth/register.view.html");
    return;
  }

  if (!password) {
    req.flash("alert", "Password is required.");
    res.render("auth/register.view.html");
    return;
  }

  if (password.length < 8) {
    req.flash("alert", "Password must be at least 8 characters long.");
    res.render("auth/register.view.html")
    return;
  }

  if (password !== confirmPassword) {
    req.flash("alert", "Entered password doesn't match.");
    res.render("auth/register.view.html");
    return;
  }

  try {
    // Create SHA256 hash hex for the password.
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash
    }, {silent: true})

    // TODO: In future, we'll send email for account creation confirmation.
    req.flash("info", "Account is created. Please login.");
    res.render("auth/login.view.html");
    return;
  } catch (err) {
    // TODO: Need improvements here?
    if (err.name === "SequelizeUniqueConstraintError") {
      req.flash("alert", "We already have an account with this email.");
      res.render("auth/register.view.html");
      return;
    } else {
      next(err);  
    }
  } 
}

module.exports = authController;