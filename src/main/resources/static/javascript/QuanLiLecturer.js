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
function renderAllGiangVien(listLecturer) {
    const content = document.querySelector(
        ".content-wrapper[data-name='lecturer']"
    );
    const contentBottom = content.querySelector(".content-bottom");
    contentBottom.style.width = "1200px";

    // Xu ly table
    const searchLecturerEl = content.querySelector("#search-lecturer");
    console.log(searchLecturerEl);
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
                trashBtn.classList.add("fa-solid", "fa-trash", "trash");
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
                trashBtn.addEventListener("click", () => {
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
                });
                td.appendChild(addExam);
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
                console.log("data", data);
                resolve(data); // Resolve with the fetched data
            });
    });
}

async function addLecturerHandler() {
    const btnRegister = document.querySelector(
        ".content-wrapper[data-name='lecturer']"
    );

    const formEl = document.querySelector(
        ".modal-container[data-name='lecturer']"
    );
    btnRegister.addEventListener("click", () => {
        formEl.querySelectorAll(".select-subject").forEach((wrapper) => {
            wrapper.remove();
        });
    });
    let subjects = await getAllMonHoc();
    console.log("subjects", subjects);
    if (formEl) {
        let countSelectSubject = 1;
        const addBtn = formEl.querySelector(".add-btn");
        addBtn.onclick = () => {
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
            removeBtn.classList.add("fa-solid", "fa-xmark");
            formMessage.classList.add("form-message");
            select.innerHTML = templateOption.join();
            inputWrapper.appendChild(label);
            selectSubjectWrapper.appendChild(select);
            selectSubjectWrapper.appendChild(removeBtn);
            inputWrapper.appendChild(selectSubjectWrapper);
            addBtn.insertAdjacentElement("beforebegin", inputWrapper);
            addBtn.insertAdjacentElement("beforebegin", formMessage);
            removeBtn.onclick = function () {
                inputWrapper.remove();
            };
            countSelectSubject++;
        };
        const submitBtn = formEl.querySelector(".btn");
        submitBtn.onclick = (event) => {
            event.preventDefault();
            const allInput = [...formEl.querySelectorAll("input")];
            const selectSubjects = [
                ...formEl.querySelectorAll(".select-subject select"),
            ];
            let checkMathSubject = false;
            let checkEmptyInput = allInput.every((input) => input.value);
            for (let i = 0; i < selectSubjects.length; i++) {
                const selectSubject = selectSubjects[i];
                for (let j = i + 1; j < selectSubjects.length; j++) {
                    const anotherSelectSubject = selectSubjects[j];
                    if (selectSubject.value === anotherSelectSubject.value) {
                        checkMathSubject = true;
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
            } else if (checkMathSubject) {
                toast({
                    type: "error",
                    title: "Môn học bị trùng",
                    message: "Vui lòng những môn học không trùng nhau",
                });
            } else {
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
                            closeModal(formEl);
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
                console.log(getInfoLecturerFromForm(formEl));
            }
        };
    }
}

function getInfoLecturerFromForm(formEl) {
    const lecturer = {};
    const allInput = [...formEl.querySelectorAll("input")];
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
    allSelectSubject.forEach((select) => {
        lecturer["subjects"] = lecturer["subjects"] || [];
        lecturer["subjects"].push(select.value);
    });
    return lecturer;
}
