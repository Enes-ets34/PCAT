const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const Photo = require("./models/Photo");
const fs = require("fs");
const app = express();
const ejs = require("ejs");
const path = require("path");
app.use(methodOverride("_method"));
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
  const photos = await Photo.find().sort("-created_at");
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

  res.render("photo", { photo });
});
// Edit Page
app.get("/edit/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  console.log("photo :>> ", photo);
  res.render("edit", { photo });
});

//Update Photo
app.put("/photos/:id", async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save()
  res.redirect(`/photos/${req.params.id}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
