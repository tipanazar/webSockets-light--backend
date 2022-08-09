const ws = new require("ws");

const wsServer = new ws.Server({ port: 3000 });

const users = [];

wsServer.on("connection", (newUser) => {
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
