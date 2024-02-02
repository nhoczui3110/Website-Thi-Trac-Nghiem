let currentPage = 1;
let initialProfile;
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

function renderQuestion(questions) {
    const contentBottom = document.querySelector(".content-bottom");
    contentBottom.style.minWidth = "1200px";
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    if (!Array.isArray(questions)) return;
    questions.forEach((item) => {
        const tr = document.createElement("tr");
        const maCauHoi = item[0];
        const noiDungCauHoi = item[3];
        const dapAnDung = item[4];
        item.forEach((cell, index) => {
            // index 4 la thu tu lua chon dung
            if (index !== 4) {
                const td = document.createElement("td");
                // index = 3 la noi dung cau hoi
                if (index === 3) td.classList.add("question-content");
                td.textContent = stringFormat(cell);
                tr.appendChild(td);
            }
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
            // tao lua chon
            const selectionWrapper =
                document.querySelector(".selection-wrapper");
            selectionWrapper.innerHTML = "";
            for (let i = 0; i < questionDetail.length; i++) {
                const selection = document.createElement("span");
                selection.classList.add("selection");

                // questionDetail[i][0] la  noi dung lua chon
                selection.textContent = `${i + 1}. ${stringFormat(
                    questionDetail[i][0]
                )}`;

                // questionDetail[i][1] la thu tu cua lua chon
                if (questionDetail[i][1] === dapAnDung) {
                    selection.classList.add("correct");
                }
                selectionWrapper.appendChild(selection);
            }
            const questionContent = document.querySelector(
                ".modal .question-content"
            );
            console.log(questionContent);
            // questionDetail[i][1] la noi dung cau hoi
            questionContent.textContent = stringFormat(noiDungCauHoi);
            const questionId = document.querySelector(".question-id span");
            questionId.textContent = maCauHoi;
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
        function deleteQuestion(maCauHoi) {
            const searchCauHoi = document.querySelector("#search-cauhoi");
            const sortMh = document.querySelector("#sort-monhoc");
            fetch(`/lecturer/deleteQuestion/${maCauHoi}`, {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(maCauHoi),
            })
                .then((response) => response.text())
                .then(() => {
                    getNumOfQuestion(
                        initialProfile.maGv,
                        sortMh.value,
                        true,
                        getQuestionByMaGvAndMaMh
                    );
                    searchCauHoi.value = "";
                    toast({
                        type: "success",
                        title: "Success!",
                        message: `Xóa thành công câu hỏi có mã ${maCauHoi}`,
                    });
                });
        }
        trashBtn.onclick = function () {
            popup(
                {
                    type: "remove",
                    title: `Xóa câu hỏi có mã câu hỏi ${maCauHoi}`,
                    desc: "Hành động này sẽ xóa câu hỏi của bạn",
                },
                deleteQuestion,
                maCauHoi
            );
        };
    });
}

function getQuestionByMaGvAndMaMh(magv, mamh, pageNumber) {
    const validPageNumber = Math.max(1, pageNumber);
    fetch(`/lecturer/questionManagement/${magv}/${mamh}/${validPageNumber}`)
        .then((response) => response.json())
        .then((questions) => {
            currentPage = pageNumber;
            renderQuestion(questions);
        });
}

function getNumOfQuestion(magv, mamh, remove, callback) {
    fetch(`/lecturer/CountQuestionBySubjectAndLecturer/${magv}/${mamh}`)
        .then((response) => response.json())
        .then((maxPage) => {
            if (remove && currentPage > maxPage) {
                currentPage--;
            } else currentPage = 1;
            renderPageNumber(maxPage, getQuestionByMaGvAndMaMh, magv, mamh);
            console.log(maxPage);
            callback(magv, mamh, currentPage);
        });
}
function renderPageNumber(maxPage, callback, ...params) {
    function clearPageNumber() {
        const items = document.querySelectorAll(".page-number .item");
        if (items) items.forEach((item) => item.classList.remove("active"));
    }

    const pageNumber = document.querySelector(".page-number");
    pageNumber.innerHTML = "";

    function updatePage(page) {
        clearPageNumber();
        const pageNums = document.querySelectorAll(".table-controller .item");
        pageNums[page - 1].classList.add("active");
        // getQuestionByMaGvAndMaMh(
        //     initialProfile.maGv,
        //     document.querySelector("#sort-monhoc").value,
        //     page
        // );
        callback(...params, page);
    }

    function handleButtonClick(offset) {
        const newPage = currentPage + offset;
        console.log(newPage);
        if (newPage >= 1 && newPage <= maxPage) {
            currentPage += offset;
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

function renderSortMonHoc(subjects) {
    const sortMh = document.querySelector("#sort-monhoc");
    const subjectsHtmlArray = subjects.map(
        (item) => `<option value="${item[0]}">${item[1]}</option>`
    );
    currentPage = 1;
    let htmlTemplate = subjectsHtmlArray.join("");
    htmlTemplate += `<option value="all">All</option>`;
    sortMh.innerHTML = htmlTemplate;
    getNumOfQuestion(
        initialProfile.maGv,
        sortMh.value,
        true,
        getQuestionByMaGvAndMaMh
    );
    sortMh.addEventListener("change", () => {
        getNumOfQuestion(
            initialProfile.maGv,
            sortMh.value,
            true,
            getQuestionByMaGvAndMaMh
        );
    });
}

function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall > delay) {
            lastCall = now;
            func(...args);
        }
    };
}

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

function getMonhoc(callback) {
    fetch(`/lecturer/getSubjectByLecturer/${initialProfile.maGv}`)
        .then((response) => response.json())
        .then((subjects) => {
            // renderCauHoi(questionInfo);
            callback(subjects);
            const searchInput = document.querySelector("#search-cauhoi");
            const debounceCountCauHoiByFinding = debounce(
                countCauHoiByFinding,
                300
            );
            searchInput.addEventListener("input", () => {
                const searchValue =
                    searchInput.value === "" ? " " : searchInput.value;
                debounceCountCauHoiByFinding(searchValue, initialProfile.maGv);
            });
        })
        .catch((error) => console.log("Error: ", error));
}

function checkSaveProfileBtn() {
    const currentProfile = getCurrentProfile();
    console.log("vo profile");
    console.log(currentProfile);
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
    const throttleCheckSaveProFileBtn = throttle(checkSaveProfileBtn, 1000);
    saveBtn.addEventListener("click", throttleCheckSaveProFileBtn);
}

function countCauHoiByFinding(keyword, magv) {
    fetch(`/lecturer/countCauHoiByFinding/${magv}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: keyword,
    })
        .then((response) => response.json())
        .then((maxPage) => {
            currentPage = 1;
            getCauHoiByFinding(keyword, magv, currentPage);
            renderPageNumber(maxPage, getCauHoiByFinding, keyword, magv);
        });
}

function getCauHoiByFinding(keyword, maGv, page) {
    fetch(`/lecturer/searchCauHoi/${maGv}/${page}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: keyword,
    })
        .then((response) => response.json())
        .then((questions) => {
            renderQuestion(questions);
        })
        .catch((error) => console.log(error));
}

function searchCauHoi(keyword, maGv) {
    getCauHoiByFinding(keyword, maGv, currentPage);
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

    let gender = !!parseInt(
        Array.from(inputGenders).find((input) => input.checked).value
    );

    currentProfile["gioiTinh"] = gender;
    console.log(gender);
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
