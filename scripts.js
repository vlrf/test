"use strict";
const telegram = window.Telegram.WebApp;

sayHello();

function sayHello() {
  document.getElementById("hello").textContent += telegram.initData
    ? ` ${telegram.initData}!`
    : " Незнакомец!";
}
