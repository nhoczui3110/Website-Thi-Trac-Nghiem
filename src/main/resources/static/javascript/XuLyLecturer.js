function stringFormat(string) {
    if (typeof string !== "string") return string;
    return string
        .trim()
        .toLowerCase()
        .replace(/^\w/, (c) => c.toUpperCase());
}

function getProfileLecturer(callback) {
    fetch("/lecturer/profile")
        .then((response) => response.json())
        .then((profile) => {
            initialProfile = { ...profile };
            if (callback) callback(profile);
        })
        .catch((error) => console.log("Error: ", error));
}

function renderSortMonHoc(subjects) {
    const sortMh = document.querySelector("#sort-monhoc");
    const subjectsHtmlArray = subjects.map(
        (item) => `<option value="${item[0]}">${item[1]}</option>`
    );
    let currentPage = 1;
    const htmlTemplate = subjectsHtmlArray.join("");
    sortMh.innerHTML = htmlTemplate;
    function getNumOfQuestion(magv, mamh) {
        fetch(`/lecturer/CountQuestionBySubjectAndLecturer/${magv}/${mamh}`)
            .then((response) => response.json())
            .then((maxPage) => {
                renderPageNumber(maxPage, getQuestionByMaGvAndMaMh);
                getQuestionByMaGvAndMaMh(magv, mamh, currentPage);
            });
    }
    function renderQuestion(questions) {
        const contentBottom = document.querySelector(".content-bottom");
        contentBottom.style.minWidth = "1200px";
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";
        questions.forEach((item) => {
            const tr = document.createElement("tr");
            const maCauHoi = item[0];
            item.forEach((cell, index) => {
                const td = document.createElement("td");
                if (index == 3) td.classList.add("question-content");
                td.textContent = stringFormat(cell);
                tr.appendChild(td);
            });

            const actionTd = document.createElement("td");
            const iconWrapper = document.createElement("div");
            const moreBtn = document.createElement("i");
            const editBtn = document.createElement("i");
            const trashBtn = document.createElement("i");

            iconWrapper.classList.add("icon-wrapper");
            moreBtn.classList.add("fa-solid", "fa-circle-info", "more");
            editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
            trashBtn.classList.add("fa-solid", "fa-trash", "trash");

            iconWrapper.appendChild(moreBtn);
            iconWrapper.appendChild(editBtn);
            iconWrapper.appendChild(trashBtn);
            actionTd.appendChild(iconWrapper);
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
            function renderQuestionDetail(questionDetail) {
                const questionDetailModal = document.querySelector(
                    ".modal-container[data-name='question-detail']"
                );
                const modal = document.querySelector(".modal");
                openModal(questionDetailModal);
                const closeBtn = questionDetailModal.querySelector("i");
                closeBtn.onclick = function () {
                    closeModal(questionDetailModal);
                };
                modal.onclick = function () {
                    closeModal(questionDetailModal);
                };
            }

            function getQuestionDetail(maCauHoi, callback) {
                fetch(`/lecturer/questionDetail/${maCauHoi}`)
                    .then((response) => response.json())
                    .then((questionDetail) => {
                        callback(questionDetail);
                    });
            }
            moreBtn.onclick = function () {
                getQuestionDetail(maCauHoi, renderQuestionDetail);
            };
        });
    }
    function getQuestionByMaGvAndMaMh(magv, mamh, pageNumber) {
        fetch(`/lecturer/questionManagement/${magv}/${mamh}/${pageNumber}`)
            .then((response) => response.json())
            .then((questions) => {
                currentPage = pageNumber;
                renderQuestion(questions);
            });
    }
    function renderPageNumber(maxPage) {
        function clearPageNumber() {
            const items = document.querySelectorAll(".page-number .item");
            if (items) items.forEach((item) => item.classList.remove("active"));
        }

        const pageNumber = document.querySelector(".page-number");
        pageNumber.innerHTML = "";

        function updatePage(page) {
            clearPageNumber();
            const pageNums = document.querySelectorAll(
                ".table-controller .item"
            );
            console.log(pageNums[page - 1]);
            pageNums[page - 1].classList.add("active");
            getQuestionByMaGvAndMaMh(
                initialProfile.maGv,
                document.querySelector("#sort-monhoc").value,
                page
            );
        }

        function handleButtonClick(offset) {
            const newPage = currentPage + offset;
            if (newPage >= 1 && newPage <= maxPage) {
                updatePage(newPage);
            }
        }

        const prevBtn = document.querySelector(".table-controller .prev");
        const nextBtn = document.querySelector(".table-controller .next");

        prevBtn.onclick = function () {
            handleButtonClick(-1);
        };
        nextBtn.onclick = function () {
            handleButtonClick(1);
        };
        for (let i = 0; i < maxPage; i++) {
            const item = document.createElement("span");
            if (i === 0) item.classList.add("active");
            item.classList.add("item");
            item.textContent = `${i + 1}`;
            pageNumber.appendChild(item);
            item.addEventListener("click", () => {
                updatePage(i + 1);
            });
        }
    }
    getNumOfQuestion(initialProfile.maGv, sortMh.value);
    sortMh.addEventListener("change", () => {
        getNumOfQuestion(initialProfile.maGv, sortMh.value);
    });
}

function getMonhoc(callback) {
    fetch(`/lecturer/getSubjectByLecturer/${initialProfile.maGv}`)
        .then((response) => response.json())
        .then((subjects) => {
            // renderCauHoi(questionInfo);
            callback(subjects);
        })
        .catch((error) => console.log("Error: ", error));
}

function checkSaveProfileBtn() {
    const currentProfile = getCurrentProfile();
    const checkedValid = Object.keys(currentProfile).every((key) => {
        return currentProfile[key] === initialProfile[key];
    });
    if (checkedValid) {
        toast({
            type: "error", // Default type is "success"
            title: "Error!!", // Default title is "Success!"
            message: "Thông tin người người dùng không thay đổi", // Default message is an empty string
            duration: 3000, // Default duration is 3000 milliseconds (3 seconds)
        });
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
                toast({
                    type: "success", // Default type is "success"
                    title: "Success!", // Default title is "Success!"
                    message: "Lưu thông tin người dùng thành công.", // Default message is an empty string
                    duration: 3000, // Default duration is 3000 milliseconds (3 seconds)
                });
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

(function start() {
    getProfileLecturer();
    startTable({
        cauhoi: () => {
            getMonhoc(renderSortMonHoc);
        },
    });
    const profileBtn = document.querySelectorAll(".setting-wrapper .item")[0];
    profileBtn.addEventListener("click", profileHandler);
})();
