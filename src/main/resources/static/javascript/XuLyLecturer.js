let currentPage = 1;
let initialProfile;
let subjectObject;
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
            console.log(initialProfile);
            if (callback) callback(profile);
        })
        .catch((error) => console.log("Error: ", error));
}

function renderLuaChon(orderSelection, noiDungLuaChon, isEdit) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    const templateSelection = `<div class="input-wrapper input-selection">
                <input
                    type="radio"
                    name="luaChon"
                    value="placehoder"
                    id="${orderSelection}"
                    data-num="${orderSelection}"
                    class="radio-luachon"
                    hidden
                />
                <label for="${orderSelection}">Nhập lựa chọn:</label>
                <input type="text" name="noiDungLuaChon" rules="required" value="${noiDungLuaChon}" data-count="${orderSelection}">
                <i class="fa-solid fa-trash trash"></i>
                <div class="bar"></div>
                </div>
                <span class="form-message"></span>`;
    const addSelectionBtn = modalContainer.querySelector(".add-btn");
    if (addSelectionBtn) {
        addSelectionBtn.insertAdjacentHTML("beforebegin", templateSelection);
    } else {
        const btnController = modalContainer.querySelector(".btn-controller");
        btnController.insertAdjacentHTML("beforebegin", templateSelection);
    }
    if (!isEdit) {
        const deleteSelectionBtn = document.querySelector(
            `.input-wrapper input[data-num='${orderSelection}'] ~ .trash`
        );
        const inputWrapper = deleteSelectionBtn.parentElement;
        deleteSelectionBtn.onclick = function () {
            if (modalContainer.querySelectorAll(".input-selection").length <= 1)
                return;
            inputWrapper.remove();
        };
    }
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
        const tenMonHoc = item[1];
        const hinhThuc = item[2];
        const noiDungCauHoi = item[3];
        let dapAnDung = item[4];
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
            // questionDetail[i][1] la noi dung cau hoi
            questionContent.textContent = stringFormat(noiDungCauHoi);
            const questionId = document.querySelector(".question-id span");
            questionId.textContent = maCauHoi;
        }

        function getQuestionDetail(maCauHoi, callback) {
            fetch(`/lecturer/questionDetail/${maCauHoi}`)
                .then((response) => response.json())
                .then((questionDetail) => {
                    console.log(questionDetail);
                    console.log("Dap an dung ne: ", dapAnDung);
                    callback(questionDetail);
                });
        }
        function deleteLuaChon(maLuaChon, deleteSelectionBtn) {
            fetch(`/lecturer/deleteSelection/${maCauHoi}/${maLuaChon}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Xóa lựa chọn không thành công");
                    }
                    return response.json();
                })
                .then((data) => {
                    dapAnDung = data;
                    console.log("DapAnDung mới:", dapAnDung);
                    toast({ message: "Xóa lựa chọn thành công!" });
                    deleteSelectionBtn.parentElement.remove();
                })
                .catch((error) => {
                    console.error("Lỗi:", error);
                    toast({ message: "Xóa lựa chọn không thành công!" });
                });
        }
        function addSelection(order, noiDungLuaChon) {
            if (!noiDungLuaChon.trim()) {
                toast({
                    type: "error",
                    message: "Vui lòng không bỏ trống nội dung lựa chọn",
                });
                return;
            }
            const numOfSelection = document.querySelectorAll(
                ".modal-container[data-name='create-cauhoi'] .input-selection"
            ).length;
            const orderSelection = numOfSelection + 1;
            const selectionObject = {};
            selectionObject["thuTuLuaChon"] = orderSelection;
            selectionObject["maCauHoi"] = maCauHoi;
            selectionObject["noiDungLuaChon"] = noiDungLuaChon;
            fetch(`/lecturer/addSelection/${maCauHoi}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectionObject),
            }).then((data) => {
                toast({
                    type: "success",
                    message: "Thêm lựa chọn thành công!",
                });
            });
            renderLuaChon(order, noiDungLuaChon);
        }
        function renderQuestionEdit(questionDetail) {
            resetSelectionQuestion();
            let orderSelection = 1;
            const modalContainer = document.querySelector(
                ".modal-container[data-name='create-cauhoi']"
            );
            openModal(modalContainer);
            const form = modalContainer.querySelector(".register-form");
            form.addEventListener("submit", (e) => {
                e.preventDefault();
            });
            if (hinhThuc.toUpperCase() !== "YES/NO") {
                const addSelectionBtn = document.createElement("div");
                addSelectionBtn.classList.add("add-btn");
                addSelectionBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
                const btnController = form.querySelector(".btn-controller");
                btnController.insertAdjacentElement(
                    "beforebegin",
                    addSelectionBtn
                );
                addSelectionBtn.onclick = function () {
                    popup(
                        {
                            type: "remove",
                            title: "Thêm lựa chọn",
                            desc: "Vui lòng nhập nội dung lựa chọn",
                        },
                        true,
                        addSelection,
                        orderSelection
                    );
                    orderSelection++;
                };
            }

            const cauHoi = modalContainer.querySelector("textarea");
            cauHoi.textContent = noiDungCauHoi;
            const selectMonHoc = modalContainer.querySelector("select");
            const templateOption = subjectObject.map(
                (item) =>
                    `<option value="${item[0]}" data-name="${item[1]}">${item[1]}</option>`
            );
            selectMonHoc.innerHTML = templateOption.join("");
            const selectedMonHoc = selectMonHoc.querySelector(
                `option[data-name='${tenMonHoc}']`
            );
            selectMonHoc.value = selectedMonHoc.value;
            questionDetail.forEach((item) => {
                const isEdit = true;
                const maLuaChon = item[2];
                renderLuaChon(orderSelection, item[0], isEdit);
                modalContainer
                    .querySelector(`input[data-count='${orderSelection}']`)
                    .setAttribute("data-id", maLuaChon);
                if (item[1] === dapAnDung) {
                    const radioCorrect = modalContainer.querySelector(
                        `input[data-num='${orderSelection}']`
                    );
                    radioCorrect.checked = true;
                }
                if (hinhThuc.toUpperCase() !== "YES/NO") {
                    const deleteSelectionBtn = document.querySelector(
                        `.input-wrapper input[data-num='${orderSelection}'] ~ .trash`
                    );
                    deleteSelectionBtn.addEventListener("click", function () {
                        popup(
                            {
                                type: "remove",
                                title: "Xóa lựa chọn",
                                desc: "Hành đông này sẽ xóa lựa chon của bạn",
                            },
                            false,
                            deleteLuaChon,
                            maLuaChon,
                            deleteSelectionBtn
                        );
                    });
                }
                orderSelection++;
            });

            const submitBtn =
                modalContainer.querySelector(".registerSubmitBtn");
            function submitQuestion() {
                const radioValue = modalContainer.querySelector(
                    "input[type='radio']:checked"
                );
                const inputs = document.querySelectorAll(
                    "input[name='noiDungLuaChon']"
                );
                const textArea = document.querySelector(
                    "textarea[name='noiDungCauHoi']"
                );
                const check = Array.from(inputs).every(
                    (input) => !!input.value
                );
                if (radioValue && check && textArea.value) {
                    fetch(
                        `/lecturer/updateQuestion/${initialProfile.maGv}/${maCauHoi}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(
                                getCurrentUpdateQuestion(hinhThuc)
                            ),
                        }
                    ).then(() => {
                        closeModal(
                            document.querySelector(
                                ".modal-container[data-name='create-cauhoi']"
                            )
                        );
                        toast({
                            type: "success", // Default type is "success"
                            title: "Success!", // Default title is "Success!"
                            message: "Cập nhật câu hỏi thành công", // Default message is an empty string
                            duration: 3000, // Default duration is 3000 milliseconds (3 seconds)
                        });
                        getMonhoc(renderSortMonHoc);
                    });
                } else {
                    toast({
                        type: "error",
                        title: "Thông tin không đầy đủ",
                        message: "Vui lòng nhập đầu đủ thông tin câu hỏi",
                    });
                }
            }
            const throttleSubmitQuestion = throttle(submitQuestion, 1000);
            submitBtn.onclick = throttleSubmitQuestion;
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
                false,
                deleteQuestion,
                maCauHoi
            );
        };
        editBtn.onclick = function () {
            getQuestionDetail(maCauHoi, renderQuestionEdit);
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
            subjectObject = [...subjects];
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
    const checkedValid = Object.keys(currentProfile).every((key) => {
        return currentProfile[key] === initialProfile[key];
    });
    const allInput = document.querySelectorAll(".config-form input");
    const checkFilledInput = Array.from(allInput).every((input) => input.value);
    if (checkedValid) {
        toast({
            type: "error", // Default type is "success"
            title: "Error!!", // Default title is "Success!"
            message: "Thông tin người người dùng không thay đổi", // Default message is an empty string
            duration: 3000, // Default duration is 3000 milliseconds (3 seconds)
        });
    } else if (!checkFilledInput) {
        toast({
            type: "error", // Default type is "success"
            title: "Error!!", // Default title is "Success!"
            message: "Vui lòng nhập đầy đủ thông tin!", // Default message is an empty string
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
    const nameEle = document.querySelector(".profile-left .name");
    nameEle.textContent = `${initialProfile.ten}`;
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
        select.value = profile[select.getAttribute("name")].toUpperCase();
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

function handleTypeQuestion() {
    const nextBtn = document.querySelector(".modal-container .next-btn");
    nextBtn.addEventListener("click", () => {
        const typeQuestion = document.querySelector(
            ".modal-container[data-name='cauhoi'] .type-selection"
        ).value;
        renderFormCreateQuestion(typeQuestion);
    });
}

function resetSelectionQuestion() {
    const template = `<form action="/login" class="register-form" method="post">
        <div class="input-wrapper">
            <label for="monHoc">Chọn môn học:</label>
            <select id="monHoc" name="monHoc"></select>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="noiDungCauHoi">Nội dung câu hỏi</label>
            <textarea
                name="noiDungCauHoi"
                id="noiDungCauHoi"
                cols="30"
                rows="2"
                required
            ></textarea>
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="btn-controller">
            <button
                type="submit"
                href="#!"
                class="btn registerSubmitBtn"
            >
                Register
            </button>
            <a href="#!" class="btn-trans closeBtn">Close</a>
        </div>
    </form>`;
    const modalContainer = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    modalContainer.innerHTML = template;
}

function renderYesNoQuestion(typeQuestion) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    const template = `<div class="box-wrapper">
        <input
            type="radio"
            name="yes/no"
            id="yes"
            checked
            class="radio-luachon"
            hidden
            data-name="Yes"
        />
        <label for="yes">Yes</label>
        <input
            type="radio"
            name="yes/no"
            id="no"
            class="radio-luachon"
            hidden
            data-name="No"
        />
        <label for="no">No</label>
    </div>`;
    const btnController = document.querySelector(
        ".modal-container[data-name='create-cauhoi'] .btn-controller"
    );
    btnController.insertAdjacentHTML("beforebegin", template);
    const form = modalContainer.querySelector(".register-form");
    const textArea = modalContainer.querySelector(
        "textarea[name='noiDungCauHoi']"
    );
    const submitBtn = btnController.querySelector(".registerSubmitBtn");
    function submitQuestion() {
        fetch(`/lecturer/addQuestion/${initialProfile.maGv}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(getCurrentAddQuestion(typeQuestion)),
        }).then(() => {
            closeModal(
                document.querySelector(
                    ".modal-container[data-name='create-cauhoi']"
                )
            );
            toast({
                type: "success", // Default type is "success"
                title: "Success!", // Default title is "Success!"
                message: "Thêm câu hỏi thành công", // Default message is an empty string
                duration: 3000, // Default duration is 3000 milliseconds (3 seconds)
            });
            getMonhoc(renderSortMonHoc);
        });
    }
    submitBtn.addEventListener("click", () => {
        if (textArea.value) {
            submitQuestion();
        } else {
            toast({
                type: "error",
                title: "Thông tin không đầy đủ",
                message: "Vui lòng nhập đầu đủ thông tin câu hỏi",
            });
        }
    });
}

function renderSelectionQuestion(orderSelection, typeQuestion) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    const form = modalContainer.querySelector(".register-form");
    const addSelectionBtn = document.createElement("div");
    addSelectionBtn.classList.add("add-btn");
    addSelectionBtn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    const btnController = form.querySelector(".btn-controller");
    btnController.insertAdjacentElement("beforebegin", addSelectionBtn);
    renderLuaChon(orderSelection++, "");
    addSelectionBtn.onclick = function () {
        renderLuaChon(orderSelection++, "");
    };
    const submitBtn = modalContainer.querySelector(".registerSubmitBtn");
    function submitQuestion() {
        const radioValue = modalContainer.querySelector(
            "input[type='radio']:checked"
        );
        const inputs = document.querySelectorAll(
            "input[name='noiDungLuaChon']"
        );
        const textArea = document.querySelector(
            "textarea[name='noiDungCauHoi']"
        );
        const check = Array.from(inputs).every((input) => !!input.value);
        if (radioValue && check && textArea.value) {
            fetch(`/lecturer/addQuestion/${initialProfile.maGv}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(getCurrentAddQuestion(typeQuestion)),
            }).then(() => {
                closeModal(
                    document.querySelector(
                        ".modal-container[data-name='create-cauhoi']"
                    )
                );
                toast({
                    type: "success", // Default type is "success"
                    title: "Success!", // Default title is "Success!"
                    message: "Thêm câu hỏi thành công", // Default message is an empty string
                    duration: 3000, // Default duration is 3000 milliseconds (3 seconds)
                });
                getMonhoc(renderSortMonHoc);
            });
        } else {
            toast({
                type: "error",
                title: "Thông tin không đầy đủ",
                message: "Vui lòng nhập đầu đủ thông tin câu hỏi",
            });
        }
    }
    const throttleSubmitQuestion = throttle(submitQuestion, 1000);
    submitBtn.onclick = throttleSubmitQuestion;
}

function getCurrentUpdateQuestion(typeQuestion) {
    const question = {};
    const modalContainer = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    const selectMonHoc = modalContainer.querySelector("select[name='monHoc']");
    question["monHoc"] = selectMonHoc.value;
    const textArea = modalContainer.querySelector("textarea");
    question["noiDungCauHoi"] = textArea.value;
    const radios = document.querySelectorAll(".radio-luachon");
    radios.forEach((radio, index) => {
        if (radio.checked) question["dapAnDung"] = index + 1;
    });
    question["luaChon"] = [];
    if (typeQuestion === "YES/NO") {
    } else {
        const inputs = modalContainer.querySelectorAll(
            "input[name='noiDungLuaChon']"
        );
        inputs.forEach((input, index) => {
            const selectInfo = {};
            selectInfo.maLuaChon = parseInt(input.getAttribute("data-id"));
            selectInfo.noiDungLuaChon = input.value;
            question["luaChon"].push(selectInfo);
        });
    }
    console.log("log: ", question);
    return question;
}

function getCurrentAddQuestion(typeQuestion) {
    const question = {};
    question["hinhThuc"] = typeQuestion;
    const modalContainer = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    const selectMonHoc = modalContainer.querySelector("select[name='monHoc']");
    question["monHoc"] = selectMonHoc.value;
    const textArea = modalContainer.querySelector("textarea");
    question["noiDungCauHoi"] = textArea.value;
    const radios = document.querySelectorAll(".radio-luachon");
    radios.forEach((radio, index) => {
        if (radio.checked) question["dapAnDung"] = index + 1;
    });
    question["luaChon"] = [];
    if (typeQuestion === "YES/NO") {
        radios.forEach((radio, index) => {
            const obj = {};
            obj.thuTuLuaChon = index + 1;
            obj.noiDungLuaChon = radio.getAttribute("data-name");
            question["luaChon"].push(obj);
        });
    } else {
        const inputs = modalContainer.querySelectorAll(
            "input[name='noiDungLuaChon']"
        );
        inputs.forEach((input, index) => {
            const selectInfo = {};
            selectInfo.thuTuLuaChon = index + 1;
            selectInfo.noiDungLuaChon = input.value;
            question["luaChon"].push(selectInfo);
        });
    }
    return question;
}

function renderFormCreateQuestion(typeQuestion) {
    resetSelectionQuestion();

    let orderSelection = 1;
    const modalTypeQuestion = document.querySelector(
        ".modal-container[data-name='cauhoi']"
    );
    const modalCreateQuestion = document.querySelector(
        ".modal-container[data-name='create-cauhoi']"
    );
    closeModal(modalTypeQuestion);
    openModal(modalCreateQuestion);
    const selectMonHoc = modalCreateQuestion.querySelector("select");
    console.log(subjectObject);
    const templateOption = subjectObject.map(
        (item) => `<option value="${item[0]}">${item[1]}</option>`
    );
    selectMonHoc.innerHTML = templateOption.join("");
    const form = modalCreateQuestion.querySelector(".register-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
    });
    if (typeQuestion === "YES/NO") {
        renderYesNoQuestion(typeQuestion);
    } else {
        renderSelectionQuestion(orderSelection, typeQuestion);
    }
}

function getMaLop(callback) {
    fetch(`/lecturer/getMaLop/${initialProfile.maGv}`)
        .then((response) => response.json())
        .then((listMaLop) => {
            callback(listMaLop);
            console.log("first time");
            getDangKyThi(renderDangKyThi, listMaLop[0]);
        });
}

function renderSortMaLop(listMaLop) {
    const content = document.querySelector(".content-xemdiem");
    const contentBottom = content.querySelector(".content-bottom");
    const sortLop = contentBottom.querySelector("datalist#sort-malop");
    const inputSortLop = contentBottom.querySelector(
        "input[list='sort-malop']"
    );
    inputSortLop.value = listMaLop[0];
    const template = listMaLop.map((malop) => {
        return `<option value="${malop.trim()}">${malop.trim()}</option>`;
    });
    console.log(template);
    sortLop.innerHTML = template.join("");
    inputSortLop.onchange = function () {
        console.log("sortlop");
        getDangKyThi(renderDangKyThi, inputSortLop.value);
    };
}

function getDangKyThi(callback, malop) {
    fetch(`/lecturer/getDangKyThi/${initialProfile.maGv}/${malop}`)
        .then((response) => response.json())
        .then((listDangKyThi) => {
            callback(listDangKyThi);
        });
}

function getDiemSinhVien(iddk, callback) {
    fetch(`/lecturer/getDiemSinhVien/${iddk}`)
        .then((response) => response.json())
        .then((listSinhVien) => {
            callback(listSinhVien);
        });
}

function renderListSinhVien(listSinhVien) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='xemdiem']"
    );
    const tableWrapper = modalContainer.querySelector(".table-wrapper");
    tableWrapper.s;
    openModal(modalContainer);
    const tbody = modalContainer.querySelector("tbody");
    const ths = modalContainer.querySelectorAll("th");
    tbody.innerHTML = "";
    listSinhVien.forEach((sinhvien) => {
        const tr = document.createElement("tr");
        ths.forEach((th) => {
            const td = document.createElement("td");
            td.textContent = sinhvien[th.getAttribute("data-name")];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function renderDangKyThi(listDangKyThi) {
    const content = document.querySelector(".content-xemdiem");
    const contentBottom = content.querySelector(".content-bottom");
    contentBottom.style.minWidth = "1200px";

    // Xu ly table
    const tbody = contentBottom.querySelector("tbody");
    tbody.innerHTML = "";
    const ths = contentBottom.querySelectorAll("th");
    if (!listDangKyThi) return;
    listDangKyThi.forEach((dkthi) => {
        const tr = document.createElement("tr");
        ths.forEach((th) => {
            const td = document.createElement("td");
            if (th.getAttribute("data-name") === "action") {
                const more = document.createElement("i");
                more.classList.add("fa-solid", "fa-ellipsis");
                td.appendChild(more);
                more.addEventListener("click", () => {
                    console.log(dkthi);
                    getDiemSinhVien(dkthi.iddk, renderListSinhVien);
                });
            } else {
                td.textContent = dkthi[th.getAttribute("data-name")];
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    // console.log(listDangKyThi);
}

// function getProfileLecturerPromise() {
//     return new Promise((resolve, reject) => {
//         getProfileLecturer();
//     });
// }

// (function start() {
//     getProfileLecturer().then(getMaLop(renderSortMaLop, true));
//     startTable({
//         cauhoi: () => {
//             getMonhoc(renderSortMonHoc);
//             handleTypeQuestion();
//         },
//         xemdiem: () => {
//             getMaLop(renderSortMaLop);
//             getDangKyThi(renderDangKyThi);
//         },
//     });
//     const profileBtn = document.querySelectorAll(".setting-wrapper .item")[0];
//     profileBtn.addEventListener("click", profileHandler);
// })();

function getProfileLecturerPromise() {
    return new Promise((resolve, reject) => {
        getProfileLecturer(resolve); // Gọi resolve để báo hiệu rằng promise đã hoàn thành
    });
}

function showInfo() {
    const profileBtn = document.querySelectorAll(".setting-wrapper .item")[0];
    profileBtn.addEventListener("click", profileHandler);
    const helloText = document.querySelector(".user-wrapper .text");
    helloText.textContent = `Hello, ${initialProfile.ten}`;
}

(async function start() {
    try {
        await getProfileLecturerPromise(); // Sử dụng await để đợi cho promise hoàn thành
        getMaLop(renderSortMaLop);
        showInfo();
        startTable({
            cauhoi: () => {
                getMonhoc(renderSortMonHoc);
                handleTypeQuestion();
            },
            xemdiem: () => {
                getMaLop(renderSortMaLop);
                getDangKyThi(renderDangKyThi);
            },
        });
    } catch (error) {
        console.log("Error: ", error);
    }
})();
