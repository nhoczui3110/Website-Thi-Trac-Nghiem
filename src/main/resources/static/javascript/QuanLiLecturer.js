function getAllGiangVien(callback) {
    fetch("/admin/getAllLecturer")
        .then((response) => response.json())
        .then((listLecturer) => {
            if (callback) {
                callback(listLecturer);
            }
        });
}

function getMonHocByGiangVien({ callback, maGv }) {
    fetch(`/lecturer/getSubjectByLecturer/${maGv}`)
        .then((response) => response.json())
        .then((listMonHoc) => {
            console.log(callback);
            callback(listMonHoc);
        });
}

function getAllClasses(callback) {
    fetch("/admin/getAllClasses")
        .then((response) => response.json())
        .then((classesList) => {
            classes = [...classesList];
            callback(classesList);
        });
}

function renderClassesExam(classesList) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='exam']"
    );
    const datalistELement = modalContainer.querySelector("datalist#tenlop");
    console.log(classesList);
    const template = classesList.map((classItem) => {
        return `<option value="${classItem.maLop}">${classItem.tenLop}</option>`;
    });
    datalistELement.innerHTML = template.join();
}

function renderMonHocExam(listMonHoc) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='exam']"
    );
    const selectElement = modalContainer.querySelector("select#tenmh");
    const template = listMonHoc.map((monhoc) => {
        return `<option value="${monhoc[0]}">${monhoc[1]}</option>`;
    });
    selectElement.innerHTML = template.join();
}

function getInfoExam() {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='exam']"
    );
    const inputMaGV = modalContainer.querySelector("input#magv");
    const inputMaLop = modalContainer.querySelector("input#malop");
    const inputMaNv = modalContainer.querySelector("input#maNv");
    const selectElement = modalContainer.querySelector("select#tenmh");
    const inputSocau = modalContainer.querySelector("input#socau");
    const inputNgayThi = modalContainer.querySelector("input#ngaythi");
    const inputThoiGianThi = modalContainer.querySelector("input#thoigianthi");
    return {
        maGv: inputMaGV.value,
        maLop: inputMaLop.value,
        maNv: inputMaNv.value,
        maMh: selectElement.value,
        soCau: inputSocau.value,
        ngayThi: inputNgayThi.value,
        thoiGianThi: inputThoiGianThi.value,
    };
}

function deleteQuestion(maGv) {
    console.log("magv", maGv);
    fetch(`/admin/deleteLecturer`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: maGv,
    })
        .then((response) => response.json())
        .then((isSuccess) => {
            if (isSuccess)
                toast({
                    type: "success",
                    title: "Xóa thành công",
                    message: `Xóa thành công giảng viên`,
                });
            getAllGiangVien(renderAllGiangVien);
        })
        .catch((error) => {
            toast({
                type: "error",
                title: "Xóa thất bại",
                message: `Không thể xóa giảng viên`,
            });
        });
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

function checkGiangVien(magv) {
    return new Promise((resolve) => {
        fetch(`admin/canDeleteGiangVien/${magv}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                resolve(result);
            });
    });
}

function renderAllGiangVien(listLecturer) {
    const content = document.querySelector(
        ".content-wrapper[data-name='lecturer']"
    );
    const contentBottom = content.querySelector(".content-bottom");
    contentBottom.style.width = "1200px";
    contentBottom.style.minHeight = null;
    contentBottom.style.height = "600px";

    // Xu ly table
    const searchLecturerEl = content.querySelector("#search-lecturer");
    if (searchLecturerEl) {
        searchLecturerEl.oninput = () => {
            const keyword =
                searchLecturerEl.value === "" ? " " : searchLecturerEl.value;
            const debounceSeachGiangVien = debounce(searchGiangVien, 300);
            debounceSeachGiangVien(keyword);
        };
    }
    const tbody = contentBottom.querySelector("tbody");
    tbody.innerHTML = "";
    const ths = contentBottom.querySelectorAll("th");
    listLecturer.forEach((lecturer) => {
        const tr = document.createElement("tr");
        ths.forEach((th) => {
            const td = document.createElement("td");
            if (th.getAttribute("data-name") === "action") {
                const addExam = document.createElement("i");
                const trashBtn = document.createElement("i");
                const editBtn = document.createElement("i");
                trashBtn.classList.add("fa-solid", "fa-trash", "trash");
                editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
                addExam.classList.add(
                    "fa-solid",
                    "fa-file-circle-question",
                    "add-exam-btn"
                );
                addExam.addEventListener("click", () => {
                    const modalContainer = document.querySelector(
                        ".modal-container[data-name='exam']"
                    );

                    const inputMaGV =
                        modalContainer.querySelector("input#magv");
                    inputMaGV.value = lecturer["maGv"];
                    const inputMaNv =
                        modalContainer.querySelector("input#maNv");
                    inputMaNv.value = adminInfo["manv"];
                    getMonHocByGiangVien({
                        callback: renderMonHocExam,
                        maGv: lecturer["maGv"],
                    });
                    const form = modalContainer.querySelector("form");
                    form.onsubmit = (event) => {
                        event.preventDefault();
                    };
                    openModal(modalContainer);
                    const submitBtn =
                        modalContainer.querySelector(".registerSubmitBtn");
                    submitBtn.onclick = function (event) {
                        event.preventDefault();
                        let numOfQuestion;
                        let infoExam = getInfoExam();
                        console.log(classes);
                        let checkValidClass = false;
                        classes.forEach((item) => {
                            if (item["maLop"] === infoExam["maLop"]) {
                                checkValidClass = true;
                            }
                        });
                        fetch(`/admin/countCauHoiByMonHoc/${infoExam["maMh"]}`)
                            .then((response) => response.json())
                            .then((data) => {
                                numOfQuestion = data;
                                if (numOfQuestion < infoExam["soCau"]) {
                                    toast({
                                        type: "error",
                                        title: "Số câu hỏi không đủ",
                                        message: `Vui lòng giảm số câu hỏi thi <= ${numOfQuestion}`,
                                    });
                                } else if (!checkValidClass) {
                                    toast({
                                        type: "error",
                                        title: "Thông tin lớp không hợp lệ",
                                        message: `Vui lòng chọn lớp trong gợi ý!`,
                                    });
                                } else {
                                    fetch("/admin/createExam", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(infoExam),
                                    }).then((success) => {
                                        if (success) {
                                            toast({
                                                type: "success",
                                                title: "Thêm bài kiểm tra thành công",
                                                message: `Bài kiểm tra của bạn đã được thêm vào Database`,
                                            });
                                            closeModal(modalContainer);
                                        } else {
                                            toast({
                                                type: "error",
                                                title: "Thêm bài kiểm tra thất bại",
                                                message: `Bài kiểm tra của bạn không được thêm vào Database`,
                                            });
                                        }
                                    });
                                }
                            });
                    };
                });
                trashBtn.onclick = async () => {
                    check = await checkGiangVien(lecturer["maGv"]);
                    console.log(check);
                    if (!check) {
                        toast({
                            type: "error",
                            title: "Không thể xóa giảng viên!",
                            message: `Giảng viên đang giảng dạy hoặc đã cho đăng ký thi không thể xóa`,
                        });
                        return;
                    }
                    popup(
                        {
                            type: "remove",
                            title: `Xóa giảng viên có mã ${lecturer["maGv"]}?`,
                            desc: "Hành động này sẽ xóa giảng viên của bạn!",
                        },
                        false,
                        () => {
                            deleteQuestion(lecturer["maGv"]);
                        }
                    );
                    console.log(lecturer);
                };
                editBtn.addEventListener("click", () => {
                    updateLecturerHandler(lecturer);
                });
                td.appendChild(addExam);
                td.appendChild(editBtn);
                td.appendChild(trashBtn);
            } else if (th.getAttribute("data-name") == "gioiTinh") {
                gender = lecturer[th.getAttribute("data-name")];
                if (gender === true) td.textContent = "Nữ";
                else td.textContent = "Nam";
            } else {
                td.textContent = lecturer[th.getAttribute("data-name")];
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}
function searchGiangVien(keyword) {
    fetch(`/admin/searchLecturer`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: keyword,
    })
        .then((response) => response.json())
        .then((listLecturer) => {
            if (listLecturer) {
                renderAllGiangVien(listLecturer);
            }
        });
}
function getAllMonHoc() {
    return new Promise((resolve) => {
        fetch("/admin/getAllMonHoc")
            .then((response) => response.json())
            .then((data) => {
                resolve(data); // Resolve with the fetched data
            });
    });
}

async function addLecturerHandler() {
    const btnRegister = document.querySelector(
        ".content-wrapper[data-name='lecturer'] .btn-register"
    );
    btnRegister.onclick = null;
    let subjects = await getAllMonHoc();
    btnRegister.addEventListener("click", () => {
        const formEl = document.querySelector(
            ".modal-container[data-name='lecturer']"
        );
        if (formEl) {
            let countSelectSubject = 1;
            const addBtn = formEl.querySelector(".add-btn");
            addBtn.onclick = () => {
                renderMonHocGiangVien(countSelectSubject, subjects);
                countSelectSubject++;
            };
            const throttleSubmitLecturer = throttle(checkSubmitLecturer, 1000);
            const submitBtn = formEl.querySelector(".btn");
            submitBtn.onclick = (event) => {
                event.preventDefault();
                throttleSubmitLecturer(formEl, submitAddLecturer);
            };
        }
        toggleVisibilityLecturer("show");
        formEl.querySelectorAll(".select-subject").forEach((wrapper) => {
            wrapper.remove();
        });
    });
}
function checkSubmitLecturer(formEl, callback) {
    const allInput = [...formEl.querySelectorAll("input")];
    const selectSubjects = [
        ...formEl.querySelectorAll(".select-subject select"),
    ];
    let checkMatchSuccess = false;
    let checkEmptyInput = allInput.every((input) => input.value);
    for (let i = 0; i < selectSubjects.length; i++) {
        const selectSubject = selectSubjects[i];
        for (let j = i + 1; j < selectSubjects.length; j++) {
            const anotherSelectSubject = selectSubjects[j];
            if (selectSubject.value === anotherSelectSubject.value) {
                checkMatchSuccess = true;
                break;
            }
        }
    }
    if (!checkEmptyInput) {
        toast({
            type: "error",
            title: "Dữ liệu không đầy đủ",
            message: "Vui lòng nhập đầy đủ các output",
        });
    } else if (checkMatchSuccess) {
        toast({
            type: "error",
            title: "Môn học bị trùng",
            message: "Vui lòng những môn học không trùng nhau",
        });
    } else callback();
}
function submitAddLecturer() {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    const formEl = modalContainer.querySelector("form");
    fetch("/admin/addLecturer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(getInfoLecturerFromForm(formEl)),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data == 0) {
                toast({
                    type: "success",
                    title: "Thành công!",
                    message: "Bạn đã thêm giảng viên thành công",
                });
                closeModal(modalContainer);
                getAllGiangVien(renderAllGiangVien);
            } else if (data == 1) {
                toast({
                    type: "error",
                    title: "Thất bại!",
                    message: "Username đã tồn tại!",
                });
            } else {
                toast({
                    type: "error",
                    title: "Thất bại!",
                    message: "Mã giảng viên đã bị trùng",
                });
            }
        });
}
function getInfoLecturerFromForm(formEl, isEdit) {
    const lecturer = {};
    const allInput = [...formEl.querySelectorAll("input")];
    console.log(allInput);
    const allSelect = formEl.querySelectorAll("select[name]");
    const allSelectSubject = formEl.querySelectorAll(".select-subject select");

    allInput.forEach((input) => {
        if (input.type !== "radio") {
            lecturer[input.getAttribute("name")] = input.value;
        } else {
            if (input.checked) {
                console.log(input);
                lecturer[input.getAttribute("name")] =
                    input.getAttribute("data-name") === "male" ? 0 : 1;
            }
        }
    });
    allSelect.forEach((select) => {
        lecturer[select.getAttribute("name")] = select.value;
    });
    if (!isEdit) {
        allSelectSubject.forEach((select) => {
            lecturer["subjects"] = lecturer["subjects"] || [];
            lecturer["subjects"].push(select.value);
        });
    } else {
        allSelectSubject.forEach((select) => {
            lecturer["subjects"] = lecturer["subjects"] || [];
            data = {};
            data["iddh"] = parseInt(select.getAttribute("data-id")) || 0;
            data["mamh"] = select.value;
            lecturer["subjects"].push(data);
        });
    }
    return lecturer;
}

function btnUpdateLecturer(lecturerInfo) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    fetch("/admin/updateLecturer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lecturerInfo),
    })
        .then((response) => response.text())
        .then((data) => {
            toast({
                type: "success",
                title: "Cập nhật thành công",
                message: data,
            });
            getAllGiangVien(renderAllGiangVien);
            closeModal(modalContainer);
        });
}

function updateLecturerHandler(lecturer) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    const formEl = modalContainer.querySelector("form");
    const submitBtn = modalContainer.querySelector(".registerSubmitBtn");
    submitBtn.onclick = function (event) {
        const throttleUpdateLecturer = throttle(checkSubmitLecturer, 1000);
        event.preventDefault();
        throttleUpdateLecturer(formEl, () => {
            btnUpdateLecturer(getInfoLecturerFromForm(formEl, true));
        });
    };
    modalContainer.querySelectorAll(".select-subject").forEach((wrapper) => {
        wrapper.remove();
    });
    openModal(modalContainer);
    renderInfoLecturerForUpdate(lecturer);
}

function renderInfoLecturerForUpdate(lecturer) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    const formEl = modalContainer.querySelector("form");
    const allInput = formEl.querySelectorAll("input");
    toggleVisibilityLecturer("hidden");
    allInput.forEach((input) => {
        if (input.getAttribute("name") !== "gender") {
            input.value = lecturer[`${input.getAttribute("data-name")}`];
        } else {
            if (
                lecturer["gioiTinh"] === false &&
                input.getAttribute("data-name") === "male"
            )
                input.checked = true;
            else if (
                lecturer["gioiTinh"] === true &&
                input.getAttribute("data-name") === "female"
            )
                input.checked = true;
        }
    });
    promiseRenderMonHocGiangVien(lecturer);
}

async function promiseRenderMonHocGiangVien(lecturer) {
    try {
        const allSubject = await getAllMonHoc(); // Đợi cho đến khi dữ liệu được nhận từ hàm getAllMonHoc()
        const subjects = await new Promise((resolve) => {
            getMonHocByGiangVien({
                callback: function (subjects) {
                    resolve(subjects); // Giải quyết promise với dữ liệu từ callback
                },
                maGv: lecturer["maGv"],
            });
        });
        let count = 1;
        subjects.forEach((subject) => {
            renderMonHocGiangVien(count, allSubject, {
                value: subject[0],
                iddh: subject[2],
                magv: lecturer["maGv"],
            }); // Sử dụng dữ liệu để render
            count++;
        });
        const modalContainer = document.querySelector(
            ".modal-container[data-name='lecturer']"
        );
        const formEl = modalContainer.querySelector("form");
        const addBtn = formEl.querySelector(".add-btn");
        addBtn.onclick = () => {
            count++;
            renderMonHocGiangVien(count, allSubject);
        };
    } catch (error) {
        console.error("Error rendering subjects:", error);
    }
}

function checkCanDeleteMonHocGiangVien(iddh, mamh, magv) {
    return new Promise((resolve) => {
        fetch(`/admin/canDeleteMonHocGiangVien/${iddh}/${magv}/${mamh}`)
            .then((response) => response.json())
            .then((result) => resolve(result));
    });
}

function renderMonHocGiangVien(countSelectSubject, subjects, update) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    const formEl = modalContainer.querySelector("form");
    const addBtn = formEl.querySelector(".add-btn");
    const selectSubjectWrapper = document.createElement("div");
    selectSubjectWrapper.classList.add("select-subject-wrapper");
    const inputWrapper = document.createElement("div");
    inputWrapper.classList.add("input-wrapper", "select-subject");
    const label = document.createElement("label");
    label.textContent = "Tên môn học";
    label.setAttribute("for", `monhoc${countSelectSubject}`);
    const select = document.createElement("select");
    select.setAttribute("id", `monhoc${countSelectSubject}`);

    // select.setAttribute()
    const templateOption = subjects.map((subject) => {
        return `<option value="${subject["mamh"]}">${subject["tenmh"]}</option>`;
    });
    const formMessage = document.createElement("span");
    const removeBtn = document.createElement("i");
    removeBtn.classList.add("fa-solid", "fa-xmark", "remove-btn");
    formMessage.classList.add("form-message");
    select.innerHTML = templateOption.join();
    inputWrapper.appendChild(label);
    selectSubjectWrapper.appendChild(select);
    selectSubjectWrapper.appendChild(removeBtn);
    inputWrapper.appendChild(selectSubjectWrapper);
    addBtn.insertAdjacentElement("beforebegin", inputWrapper);
    addBtn.insertAdjacentElement("beforebegin", formMessage);
    if (update) {
        select.disabled = true;
        select.value = update["value"];
        select.setAttribute("data-id", update["iddh"]);
        removeBtn.onclick = async function () {
            const check = await checkCanDeleteMonHocGiangVien(
                update["iddh"],
                update["value"],
                update["magv"]
            );
            if (!check) {
                toast({
                    type: "error",
                    title: "Lỗi xóa môn học",
                    message:
                        "Không thể xóa môn học đã đăng ký thi hoặc đã thêm câu hỏi",
                });
                return;
            }
            popup(
                {
                    type: "remove",
                    title: `Xóa môn học có mã ${update["value"]}`,
                    desc: "Hành động này sẽ xóa môn học của giảng viên này khỏi database!",
                },
                false,
                () => {
                    fetch("/admin/deleteMonHocGiangVien", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(update["iddh"]),
                    });
                    toast({
                        type: "success",
                        title: "Thành công!",
                        message: `Xóa thành công môn học có mã ${update["value"]}`,
                    });
                    inputWrapper.remove();
                }
            );
        };
    } else {
        removeBtn.onclick = function () {
            inputWrapper.remove();
        };
    }
}
// Dung de an hien input username password, magv
function toggleVisibilityLecturer(show) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    const username = modalContainer.querySelector(
        ".input-wrapper[data-name='username']"
    );
    const password = modalContainer.querySelector(
        ".input-wrapper[data-name='password']"
    );
    const magv = modalContainer.querySelector(
        ".input-wrapper[data-name='magv']"
    );
    if (show === "show") {
        username.style.display = "flex";
        password.style.display = "flex";
        magv.style.display = "flex";
    } else if (show === "hidden") {
        username.style.display = "none";
        password.style.display = "none";
        magv.style.display = "none";
    }
}
