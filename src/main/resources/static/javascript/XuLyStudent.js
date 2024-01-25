const widthController = document.querySelector(".controller-wrapper");
const content = document.querySelector(".content");

console.log(window.innerWidth);

// Get the width of the controller-wrapper element
const controllerWidth = widthController.offsetWidth;

// Set the width of the content element
content.style.width = window.innerWidth - controllerWidth + "px";

// ------------------------

const featureItems = document.querySelectorAll(".controller-wrapper .item");
const thi = featureItems[0];
const quanLiBaithi = featureItems[1];
const quanLiThi = featureItems[2];
const contentInner = document.querySelector(".content-inner");

featureItems.forEach((item) => {
    item.addEventListener("click", () => {
        handleClearFeatureList();
        item.classList.add("active");
    });
});

function clearContent() {
    const contents = document.querySelectorAll(".content>div");
    contents.forEach((content) => (content.style.display = "none"));
}
quanLiBaithi.addEventListener("click", () => {
    // contentInner = document.querySelector(".content-inner");
    // contentInner.style.display = "none";
    clearContent();
    handleQuanLi("quanLiExamStudent");
});

thi.addEventListener("click", () => {
    clearContent();
    handleQuanLi("thiStudent");
});
