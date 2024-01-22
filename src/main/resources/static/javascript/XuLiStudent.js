const widthController = document.querySelector(".controller-wrapper");
const content = document.querySelector(".content");

console.log(window.innerWidth);

// Get the width of the controller-wrapper element
const controllerWidth = widthController.offsetWidth;

// Set the width of the content element
content.style.width = window.innerWidth - controllerWidth + "px";

console.log(controllerWidth);
