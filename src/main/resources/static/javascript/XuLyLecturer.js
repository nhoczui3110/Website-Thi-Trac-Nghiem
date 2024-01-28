function getProfileLecturer(callback) {
    fetch("/lecturer/profile")
        .then((Response) => Response.json())
        .then(callback)
        .catch((error) => console.log("Error: ", error));
}
function renderProfile(profile) {
    const inputs = document.querySelectorAll(".config-form input");
    // index 0: Nam, index 1: Nu
    const inputGenders = document.querySelectorAll(
        '.config-form input[name="gioiTinh"]'
    );
    const selects = document.querySelectorAll(".config-form select");
    console.log(inputGenders);
    inputs.forEach((input) => {
        if (input.getAttribute("name") !== "gioiTinh") {
            input.value = profile[input.getAttribute("name")];
        }
    });

    if (profile["gioiTinh"] == false) {
        inputGenders[0].checked = true;
        inputGenders[1].checked = false;
    } else {
        inputGenders[1].checked = true;
        inputGenders[0].checked = false;
    }
    console.log(profile);
    selects.forEach(
        (select) => (select.value = profile[select.getAttribute("name")])
    );
}

const featureItems = document.querySelectorAll(".controller-wrapper .item");
const xemDiem = featureItems[0];
const quanLiCauHoi = featureItems[1];
const settingWrapper = document.querySelectorAll(".setting-wrapper .item");
const profileBtn = settingWrapper[0];

featureItems.forEach((item) => {
    item.addEventListener("click", () => {
        handleClearFeatureList();
        item.classList.add("active");
    });
});

profileBtn.addEventListener("click", () => {
    const contentProfile = document.querySelector(".content-profile");
    contentProfile.style.display = "flex";
    Validator(".config-form");
    getProfileLecturer(renderProfile);
});
