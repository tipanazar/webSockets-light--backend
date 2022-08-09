// const express = require("express");
// const http = require("http");
// const path = require("path");
const ws = new require("ws");

// const app = express();
let users = [];

// app.use(express.static(path.join(__dirname, "./public")));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// const httpServer = http.createServer(app);
const wsServer = new ws.Server({ port: 5000 });
// const wsServer = new ws.Server({ server: httpServer });

wsServer.on("connection", (newUser) => {
    console.log('Connected')
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

// httpServer.listen(5000, () => {
//   console.log("Server started. Port: ", 5000);
// });
