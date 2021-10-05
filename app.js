const express = require("express");
const app = express();
const path = require("path");

// MIDDLEWARES
app.use(express.static("public"));
app.get("/", (req, res) => {
  app.sendFile(path.resolve(__dirname, "/public/index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
