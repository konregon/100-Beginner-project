// Just fancy stuff!!
//Added only for accepting the color input and changing body background
const body = document.querySelector("body");
const input = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");

setColor();
input.addEventListener("input", setColor);

function setColor() {
  body.style.backgroundColor = input.value;
  colorCode.innerHTML = input.value;
}
