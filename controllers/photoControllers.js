const Photo = require("../models/Photo");
const fs = require("fs");
const path = require("path");
exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort("-created_at");
  res.render("index", {
    photos,
  });
};

exports.getSinglePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);

  res.render("photo", { photo });
};

exports.getEditPage = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  console.log("photo :>> ", photo);
  res.render("edit", { photo });
};
exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};
exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  const deletedImage = __dirname + "/../public" + photo.image;
  fs.unlinkSync(deletedImage);
  await Photo.findByIdAndDelete(photo._id);
  res.redirect("/");
};
exports.addPhoto = async (req, res) => {
  const uploadDir = "public/uploads";
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.image;
  let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: "/uploads/" + uploadedImage.name,
    });
    res.redirect("/");
  });
};
