const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const { emit } = require("./models/userModel");
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
//chat Routes
app.use("/api/chat",chatRoutes);
//Message Routes
app.use("/api/message",messageRoutes)
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

const server = app.listen(PORT, console.log(`Server is hereby started on PORT ${PORT}`));

const io= require("socket.io")(server,{
  pingTimeout:60000,
  cors:{
    origin:"http://localhost:3000",
  },
})

io.on("connection",(socket)=>{
  console.log(`connected to socket.io`)
  //To check if the user is using only self socket
  socket.on("setup",(userData)=>{
    socket.join(userData._id)
    console.log(userData._id);
    socket.emit('connected')
  })

  //room creation
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  //typing
  socket.on("typing",(room)=>socket.in(room).emit("typing"))
  //stoptyping
  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))
  //who is typing
  socket.on("who typing",(user)=>{
    //console.log(user,"type kar rha 99")
  }) 


  //messages realtime
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
})

