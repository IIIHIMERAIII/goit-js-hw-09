const bodyRef = document.querySelector("body");
const startBtnRef = document.querySelector("[data-start]")
const stopBtnRef = document.querySelector("[data-stop]")
let timerId = null;

stopBtnRef.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


function colorChanger() {
    const color = getRandomHexColor();
    bodyRef.style.backgroundColor = color;
}

startBtnRef.addEventListener("click", onStart);
    
function onStart() {
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;
    colorChanger();

    timerId = setInterval(() => {
        colorChanger();
    }, 1000);   
}

stopBtnRef.addEventListener("click", () => {
    startBtnRef.disabled = false;
    stopBtnRef.disabled = true;
    clearInterval(timerId);
})