const mongoose = require ("mongoose");
const Chat = require("./models/chat.js");

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
  await mongoose.connect('mongodb://127.0.0.1:27017/chatting_webapplication');
  
}

//  data 

const allChats = [
    {
        from : "amit",
        to : "upender",
        message: "HI how are you? ",
        created_at : new Date()
      },
      {
        from : "vishal",
        to : "vipin",
        message: "can you teach me js callbacks ? ",
        created_at : new Date()
      },
      {
        from : "Harinder",
        to : "Deepak",
        message: "Nukri lagi kya bhaii? ",
        created_at : new Date()
      },
      {
        from : "Prince ",
        to : "Sanjeev",
        message: "Bohot Maze Kar rha hai? ",
        created_at : new Date()
      },

]

Chat.insertMany(allChats);
