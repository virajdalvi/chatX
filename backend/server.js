const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
//server
const app = express();
dotenv.config();
//express JS api
app.get("/", (req, res) => {
  res.send("API is Running Now! Bro!");
});
//Chat api
app.get("/api/chat", (req, res) => {
  res.send(chats);
});
//User specific data that is single chat by the user
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  res.send(singleChat);
});
//adding the .env port
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is hereby started on PORT ${PORT}`));
