"use strict";
const telegram = window.Telegram.WebApp;

sayHello();
setMainButton();

function setMainButton() {
  telegram.MainButton.setText("Бросить кубик!");
  telegram.MainButton.onClick(rollDice);
  telegram.MainButton.show();
}

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

function rollDN(dN) {
  return Math.floor(Math.random() * dN) + 1;
}

function rollDice() {
  const dN = document.getElementById("dice-input").value;
  if (dN > 99999) {
    telegram.showAlert("Число граней не может быть больше 99 999");
    return;
  }

  const result = rollDN(dN || 6);
  const diceElement = document.getElementById("dice");

  diceElement.classList.contains("dice_rotate")
    ? diceElement.classList.remove("dice_rotate")
    : diceElement.classList.add("dice_rotate");

  diceElement.innerText = result;
}

function downloadTxt() {
  telegram.openLink("https://filesamples.com/samples/document/txt/sample1.txt");
}

function requestWriteAccess() {
  telegram.requestWriteAccess(requestWriteAccessCallBack);
}

function requestWriteAccessCallBack(isGranted) {
  telegram.showAlert(
    isGranted ? "Вы предоставили доступ!" : "А может всё-таки дадите доступ?.."
  );
}

function requestContact() {
  telegram.requestContact(requestContactCallBack);
}

function requestContactCallBack(isGranted) {
  telegram.showAlert(
    isGranted
      ? "Вы поделились номером телефона!"
      : "Как жаль, что вы не поделились номером телефона :("
  );
}

function showStyles() {
  document.getElementById("styles").innerText = JSON.stringify(
    telegram.themeParams
  );
}
