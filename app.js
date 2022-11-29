const nunjucks = require("nunjucks");
const morgan = require("morgan");
const express = require("express");
const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
app.listen(PORT, () => {
  console.log(`Application is up and running at http://localhost:${PORT}`);
})
