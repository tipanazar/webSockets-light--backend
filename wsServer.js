// const express = require("express");
// const http = require("http");
// const path = require("path");
const ws = new require("ws");

const app = express();
let users = [];

// app.use(express.static(__dirname)); // ./public
// app.get("/", (req, res) => {
//   res.sendFile(__dirname); // "index.html"
// });

// const httpServer = http.createServer();

const port = process.env.PORT || 5000;
const wsServer = new ws.Server(port);
// const wsServer = new ws.Server({ server: httpServer });

wsServer.on("connection", (newUser) => {
  console.log("Connected");
  users.push(newUser);
  setTimeout(() => {
    newUser.send("Вы в чате");
  }, 1000);

  newUser.on("message", (data) => {
    const parsedData = JSON.parse(data);
    const stringedData = JSON.stringify(parsedData);
    users.forEach((user) => {
      if (user !== newUser) {
        user.send(stringedData);
      }
    });
  });

  users.forEach((user) => {
    if (user !== newUser) {
      user.send("У нас новый участник!!!");
    }
  });
});

// const port = process.env.PORT || 5000;
// httpServer.listen(port, () => {
//   console.log("Server started. Port: ", port);
// });
