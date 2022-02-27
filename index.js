const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});
 
io.on("connection", (socket) => {
    socket.on('newroom',(room)=> {
      socket.join(room);
    })
    socket.on('message',(msg,room)=>{
      socket.broadcast.to(room).emit('messagerecived',msg)
    })
});

server.listen(3000, () => {
  console.log("app is running on localhost://3000");
});
