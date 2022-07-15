const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
//server
const app = express();
dotenv.config();
//connecting to Database
connectDB();
app.use(express.json()); //to accept JSON data
//express JS api
app.get("/", (req, res) => {
  res.send("API is Running Now! Bro!");
});

app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);
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
