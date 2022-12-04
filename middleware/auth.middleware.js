const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(403).send("Forbidden");
    return;
  }
}

module.exports = auth;