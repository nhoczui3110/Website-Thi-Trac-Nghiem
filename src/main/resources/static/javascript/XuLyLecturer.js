let initialProfile;
function getProfileLecturer(callback) {
    fetch("/lecturer/profile")
        .then((response) => response.json())
        .then((profile) => {
            initialProfile = { ...profile };
            callback(profile);
        })
        .catch((error) => console.log("Error: ", error));
}

function checkSaveProfileBtn() {
    const currentProfile = getCurrentProfile();
    const checkedValid = Object.keys(currentProfile).every((key) => {
        return currentProfile[key] === initialProfile[key];
    });
    if (checkedValid) {
        const errorMessage = document.querySelector(".error-message");
        errorMessage.textContent = "Thông tin thay đổi giống ban đầu";
    } else {
        fetch(`/lecturer/update-profile/${initialProfile.maGv}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currentProfile),
        })
            .then((response) => response.text())
            .then((data) => {
                getProfileLecturer(renderProfile);
            })
            .catch((error) => console.log(error));
    }
}

function renderProfile(profile) {
    const inputs = document.querySelectorAll(".config-form input");
    const inputGenders = document.querySelectorAll(
        '.config-form input[name="gioiTinh"]'
    );
    const selects = document.querySelectorAll(".config-form select");
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
    selects.forEach((select) => {
        select.value = profile[select.getAttribute("name")];
    });
    const saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click", checkSaveProfileBtn);
}

function getCurrentProfile() {
    let currentProfile = {};
    const inputs = document.querySelectorAll(".config-form input");
    const inputGenders = document.querySelectorAll(
        '.config-form input[name="gioiTinh"]'
    );
    const selects = document.querySelectorAll(".config-form select");

    inputs.forEach((input) => {
        if (input.getAttribute("name") !== "gioiTinh") {
            currentProfile[input.getAttribute("name")] = input.value;
        }
    });

    let gender = Array.from(inputGenders).find((input) => input.checked);
    currentProfile["gioiTinh"] = !!gender;

    selects.forEach((select) => {
        currentProfile[select.getAttribute("name")] = select.value;
    });

    return currentProfile;
}

function profileHandler() {
    clearContentWrapper();
    const contentProfile = document.querySelector(".content-profile");
    contentProfile.style.display = "flex";
    Validator(".config-form", true);
    getProfileLecturer(renderProfile);
}

function startLecturer() {
    const profileBtn = document.querySelectorAll(".setting-wrapper .item")[0];
    profileBtn.addEventListener("click", profileHandler);
}
startLecturer();
