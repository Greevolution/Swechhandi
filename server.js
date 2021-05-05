const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const formatMessage= require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers}= require('./utils/users');

const app = express();
const Path = require('path');
//app.use(express.static(Path.join(__dirname,'css')));
app.use(express.static("FrontEnd"));
app.use(express.static("Map"));
const PORT=process.env.PORT || 1234 ;
const server=http.createServer(app);
const io=socketio(server);

//app.use("/", (req, res) => {
  //res.sendFile(Path.join(__dirname,'FrontEnd','home.html'));
//});
app.get("/", (req, res) => {

  res.sendFile(__dirname+'/FrontEnd/home.html');
});

app.get("/Payments", (req, res) =>{
  res.sendFile(__dirname+"/Payments/payment.html");
});

app.get("/Map",(req,res)=>{
  res.sendFile(__dirname+"/map.html");
});
//Set static folder
app.use(express.static(path.join(__dirname,'public')));
app.get("/plans", (req, res) => {
  console.log("LOL");
    res.sendFile(__dirname +"/public/index.html");
});
const botName='Chat Bot';

//Run when a client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({username,room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    //Welcome current user
    socket.emit('message', formatMessage(botName,`Welcome ${user.username}`));

    //User Connected
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat`));

    //send users and room info
    io.to(user.room).emit('roomUsers',{
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  //listen for chatMessage
  socket.on("chatMessage", (msg)=> {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message',formatMessage(user.username, msg));
  });

  //User Disconnected
  socket.on('disconnect',()=>{
    const user = userLeave(socket.id);

    if (user){
        io.to(user.room).emit('message', formatMessage(botName,`${user.username} has left the chat`));

        //send user and room info
        io.to(user.room).emit('roomUsers',{
          room: user.room,
          users: getRoomUsers(user.room)
        });
    }
  });

});
server.listen(PORT, () => console.log('Server running on port 1234'));
