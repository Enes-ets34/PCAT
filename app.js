const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const Photo = require("./models/Photo");
const fs = require("fs");
const app = express();
const ejs = require("ejs");
const path = require("path");

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// CONNECT DB
mongoose.connect("mongodb://localhost/pcat-test-db");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get("/", async (req, res) => {
  const photos = await Photo.find();
  res.render("index", {
    photos,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});

// Add Page
app.get("/add", (req, res) => {
  res.render("add");
});

// Add  Photo
app.post("/photos", async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/public/uploads/" + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
});

// Get Single Photo
app.get("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  console.log("photo :>> ", {
    photo,
  });
  res.render("photo", { photo });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
