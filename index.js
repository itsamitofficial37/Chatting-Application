const express = require("express");
const app = express();

const path = require("path");
const mongoose = require("mongoose");

main()
  .then(() => {
    console.log("connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://localhost:27017/chatting_webapplication");
}

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");

app.get("/", (req, res) => {
  res.send("Working root");
});

app.listen(3000, () => {
  console.log("app is listening on port no. 3000");
});
