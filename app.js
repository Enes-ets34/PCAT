const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const app = express();
const ejs = require("ejs");

const photoControllers = require("./controllers/photoControllers");
const pageControllers = require("./controllers/pageControllers");

app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);
// TEMPLATE ENGINE
app.set("view engine", "ejs");

// CONNECT DB
mongoose.connect("mongodb://localhost/pcat-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,  
});

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ROUTES
app.get("/", photoControllers.getAllPhotos);
app.get("/about", pageControllers.getAboutPage);
app.get("/add", pageControllers.getAddPhotoPage);
app.get("/edit/:id", pageControllers.getEditPage);

// Add  Photo
app.post("/photos", photoControllers.addPhoto);

// Get Single Photo
app.get("/photos/:id", photoControllers.getSinglePhoto);


//Update Photo
app.put("/photos/:id", photoControllers.updatePhoto);
//Delete Photo
app.delete("/photos/:id", photoControllers.deletePhoto);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
