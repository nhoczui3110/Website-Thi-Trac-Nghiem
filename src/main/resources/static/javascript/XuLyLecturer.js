const featureItems = document.querySelectorAll(".controller-wrapper .item");
const xemDiem = featureItems[0];
const quanLiCauHoi = featureItems[1];

featureItems.forEach((item) => {
    item.addEventListener("click", () => {
        handleClearFeatureList();
        item.classList.add("active");
    });
});
