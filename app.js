require("dotenv").config();
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const cookie = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const express = require("express");
const { sequelize } = require("./models")
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookie(process.env.COOKIE_SECRET))
app.use(session({
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
    resave: 'true',
    secret: process.env.SESSION_SECRET
}))
app.use(flash());

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
