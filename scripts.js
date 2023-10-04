"use strict";
const telegram = window.Telegram.WebApp;

sayHello();
pasteData();
setMainButton();

function sayHello() {
  const params = parseQueryParams(telegram.initData);
  let userData = {};
  if (params?.user) {
    userData = JSON.parse(params.user);
  }

  document.getElementById("hello").textContent += userData.first_name
    ? ` ${userData.first_name} ${userData.last_name}!`
    : " Незнакомец!";
}

function parseQueryParams(query) {
  if (!query) {
    return {};
  }
  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split("&")
    .reduce((params, param) => {
      const key = param.substr(0, param.indexOf("="));
      const value = param.substr(param.indexOf("=") + 1);
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
      return params;
    }, {});
}

function pasteData() {
  document.getElementById("data").textContent = JSON.stringify(
    telegram.initDataUnsafe
  );
}

function close() {
  telegram.close();
}

function sendData() {
  //Keyboard button.!!!!!!!!
  telegram.sendData(
    document.getElementById("dices").textContent ||
      "О нет! Я не совершил бросков кубика!.."
  );
}

function setMainButton() {
  telegram.MainButton.setText("Бросить кубик!");
  telegram.MainButton.onClick(mainButtonClicked);
}

function toggleMainButtonVisibility() {
  telegram.MainButton.isVisible
    ? telegram.MainButton.hide()
    : telegram.MainButton.show();
}

function toggleMainButtonActivity() {
  telegram.MainButton.isActive
    ? telegram.MainButton.disable()
    : telegram.MainButton.enable();
}

function mainButtonClicked() {
  document.getElementById("dices").textContent = `Результат броска: ${rollDN(
    6
  )}`;
}

function rollDN(dN) {
  return Math.floor(Math.random() * dN) + 1;
}
