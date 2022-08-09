const mainBlock = document.querySelector(".mainBlock");
const userNameForm = document.querySelector(".userNameForm");
const chatBlock = document.querySelector(".chatBlock");
const userMessageForm = document.querySelector(".messageForm");

let userName = "";

if (window.innerWidth > 500) {
  mainBlock.style.height = "90vh";
  mainBlock.style.border = "5px solid black";
}

//* Запуск WS сервера
const ws = new WebSocket("ws://localhost:5000");
// const ws = new WebSocket("wss://websockets-light.herokuapp.com");
ws.onopen = () => {
  console.log("Connected");
};
ws.onmessage = (ev) => {
  ev.data === "Вы в чате"
    ? console.log(ev.data)
    : ev.data === "У нас новый участник!!!"
    ? console.log(ev.data)
    : receiveMessage(ev.data);
  function receiveMessage(data) {
    const { name, message } = JSON.parse(data);
    chatBlock.insertAdjacentHTML(
      "beforeend",
      `<p class="message">
  <span class="messageName">${name}</span></br>
  <span class="messageText">${message}</span>
</p>`
    );
  }
};

userNameForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  userName = ev.target.userName.value;
  ev.target.reset();
  userNameForm.style.display = "none";
});

userMessageForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (userName === "") {
    return alert("Enter your name first!");
  }
  const message = ev.target.userMessage.value;
  chatBlock.insertAdjacentHTML(
    "beforeend",
    `<p class="myMessage">${message}</p>`
  );
  ev.target.reset();
  const data = {
    name: userName,
    message,
  };
  ws.send(JSON.stringify(data));
});
