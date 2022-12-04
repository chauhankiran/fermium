// A middleware used to whitelist part of the application.
// Application wide variables should be prefix with `global`
// to save from future conflicts.
const globalVariables = (req, res, next) => {
  res.locals = {
    request: req,
    globalAppName: "Fermium"
  };
  next();
}

module.exports = globalVariables