require("dotenv").config();
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const helmet = require("helmet");
const cookie = require("cookie-parser");
const session = require("express-session");
const SQLiteStore = require('connect-sqlite3')(session);
const flash = require("express-flash");
const passport = require("passport");
const sqlite3 = require("sqlite3");
const express = require("express");
const { sequelize } = require("./models");
require("./middleware/passport");
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookie(process.env.COOKIE_SECRET))
app.use(session({
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  saveUninitialized: true,
  resave: 'true',
  secret: process.env.SESSION_SECRET,
  store: new SQLiteStore({
    table: "sessions",
    db: "crm_dev.sqlite3"
  }),
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./middleware/globalVariables"))

app.use("/", require("./routes"))

// 404
app.all("*", (req, res) => {
  res.status(400).send("4-0-4");
})

// Default error handler
app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).send("Internal server error");
})

const PORT = process.env.port || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Application is up and running at http://localhost:${PORT}`);
  } catch(err) {
    console.log("Database connection failed.");
    console.log(err);
    process.exit(64);
  }
})
