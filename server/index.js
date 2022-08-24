const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const crypto = require("crypto");
const randomId = () => crypto.randomBytes(8).toString("hex");

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];
let rooms = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  socket.on("createNewRoom", (data) => {
    rooms.push({
      roomName: data.roomName,
      roomId: randomId(),
    });
    console.log(rooms);
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("newUser", (data) => {
    users.push(data);
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
