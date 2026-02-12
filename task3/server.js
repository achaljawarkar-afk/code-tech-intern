const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
  socket.on("text-change", (data) => {
    socket.broadcast.emit("text-change", data);
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
