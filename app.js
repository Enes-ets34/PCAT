const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res) => {
  // app.sendFile(path.resolve(__dirname, "/public/index.html"));
  res.render("index");
});
app.get("/about", (req, res) => {

  res.render("about");
});
app.get("/add", (req, res) => {

  res.render("add");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
