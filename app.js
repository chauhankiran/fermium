const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello, world");
})

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log(`Application is up and running at http://localhost:${PORT}`);
})
