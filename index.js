const express = require("express");
const app = express();
const path = require("path");
const Chat = require("./models/chat.js");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// method Call

main()
  .then(() => {
    console.log("connection Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

//   main function
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/chatting_webapplication");
}

// home routes

app.get("/", (req, res) => {
  res.send("Working root");
});

// Index Routes

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();

  res.render("index.ejs", { chats });
});

// create new chat routes
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// create new chat routes
app.post("/chats", (req, res) => {
  let { from, message, to } = req.body;
  let newChat = new Chat({
    from: from,
    message: message,
    to: to,
    created_at: new Date(),
  });

  newChat
    .save()
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
    res.redirect("/chats");
});

// Update routes

app.get("/chats/:id/edit", async(req,res)=> {
  let {id} = req.params;
  let chats = await Chat.findById(id);
  res.render("update.ejs",{chats});
});

app.put("/chats/:id", async (req,res) => {
  let {id} = req.params;
  let{message: newMsg} = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id ,{message : newMsg} , {runvalidators : true, new : true});
  res.redirect("/chats");
})


app.listen(3000, () => {
  console.log("app is listening on port no. 3000");
});
