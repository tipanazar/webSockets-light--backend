const ws = new require("ws");

const PORT = process.env.PORT || 5000;

const wsServer = new ws.Server({ port: PORT });

let users = [];
wsServer
  .on("connection", (newUser) => {
    console.log(`Connected to WS server, port: ${PORT}`);
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
  })
  .listen(() => {
    console.log("condasd");
  });
