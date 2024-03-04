// ==============================================================================
function getALLStudent(callback) {
    fetch("/admin/student", { method: "GET" })
        .then((response) => response.json())
        .then((listStudent) => {
            if (callback) {
                console.log(listStudent);
                callback(listStudent);
            }
        });
}
function renderAllStudent(listStudent) {
    const content = document.querySelector(
        ".content-wrapper[data-name='student']"
    );
    const contentBottom = content.querySelector(".content-bottom");
    contentBottom.style.width = "1200px";
    contentBottom.style.minHeight = null;
    contentBottom.style.height = "600px";

    // Xu ly table
    // const searchLecturerEl = content.querySelector("#search-lecturer");
    // if (searchLecturerEl) {
    //     searchLecturerEl.oninput = () => {
    //         const keyword =
    //             searchLecturerEl.value === "" ? " " : searchLecturerEl.value;
    //         const debounceSeachGiangVien = debounce(searchGiangVien, 300);
    //         debounceSeachGiangVien(keyword);
    //     };
    // }
    const tbody = contentBottom.querySelector("tbody");
    tbody.innerHTML = "";
    const ths = contentBottom.querySelectorAll("th");
    listStudent.forEach((student) => {
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
                trashBtn.addEventListener("click", () => {
                    popup(
                        {
                            type: "remove",
                            // title: `Xóa giảng viên có mã ${lecturer["maGv"]}?`,
                            title: `Xóa giảng viên có mã magv`,
                            desc: "Hành động này sẽ xóa giảng viên của bạn!",
                        },
                        false,
                        () => {
                            deleteStudent(student)
                        }
                    );
                });
                editBtn.addEventListener("click", () => {
                    // updateLecturerHandler(lecturer);
                    editStudent(student)
                });
                // td.appendChild(addExam);
                td.appendChild(editBtn);
                td.appendChild(trashBtn);
            } else if (th.getAttribute("data-name") === "gioiTinh") {
                gender = student["gioiTinh"];
                if (gender === true) td.textContent = "Nữ";
                else td.textContent = "Nam";
            } else {
                td.textContent = student[th.getAttribute("data-name")];
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function editStudent(student) {
    renderClassOption("m-classes")
    const modalContainer = document.querySelector(
        ".modal-container[data-name='modify-student']"
    );
    const inputMaSV =
        modalContainer.querySelector("input#m-masv");
    inputMaSV.value = student["masv"];
    const inputHo =
        modalContainer.querySelector("input#m-lastname-student");
    inputHo.value = student["ho"];
    const inputTen =
        modalContainer.querySelector("input#m-firstname-student");
    inputTen.value = student["ten"];

    const inputDiaChi = modalContainer.querySelector("input#m-address")
    inputDiaChi.value = student["diaChi"]

    const inputNgaySinh = modalContainer.querySelector("input#m-birthday-student")
    inputNgaySinh.value = student["ngaySinh"]
    const inputGioiTinhNam = modalContainer.querySelector("input#m-male-student")
    const inputGioiTinhNu = modalContainer.querySelector("input#m-female-student")
    if (student["gioiTinh"] === false) {
        inputGioiTinhNam.checked = true
    }
    else {
        inputGioiTinhNu.checked = true
    }
    const form = modalContainer.querySelector("form");
    form.onsubmit = (event) => {
        event.preventDefault();
    };
    openModal(modalContainer);
    const submitBtn =
        modalContainer.querySelector(".registerSubmitBtn");
    submitBtn.onclick = function (event) {
        let gt;
        if (inputGioiTinhNam.checked === true) gt = false;
        else gt = true;
        dataInfo = {
            masv: inputMaSV.value,
            ho: inputHo.value,
            ten: inputTen.value,
            gioiTinh: gt,
            ngaySinh: inputNgaySinh.value,
            diaChi: inputDiaChi.value
        }
        event.preventDefault();
        fetch(`/admin/mstudent/${student["masv"]}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataInfo)
            }).then(() => {
                toast({
                    type: "success",
                    title: "Thành công!",
                    message: `Cập nhật thông tin thành công`,
                });
                closeModal(modalContainer)
            }
            ).catch((error) => { window.alert(error) })
    };
}

function deleteStudent(student) {
    fetch(`/admin/student/${student["masv"]}`, {
        method: "DELETE"
    }).then((response) => {
        if (response.status === 200) {
            toast({
                type: "success",
                title: "Thành công!",
                message: `Xóa sinh viên thành công`,
            });
            getALLStudent(renderAllStudent)
        }
        if (response.status === 400) {
            toast({
                type: "success",
                title: "Lỗi!",
                message: `Sinh viên đã đăng ký thi không thể xóa sinh viên`,
            });
        }
    }
    ).catch((error) => {
        toast({
            type: "success",
            title: "Lỗi!",
            message: `Không thể xóa sinh viên`,
        });
    })
}

function addNewStudent() {
    renderClassOption("classes")
    const modalContainer = document.querySelector(
        ".modal-container[data-name='student']"
    );
    const inputMaSV = modalContainer.querySelector("input#masv")
    const inputHo = modalContainer.querySelector("input#lastname-student")
    const inputTen = modalContainer.querySelector("input#firstname-student")
    const inputUserName = modalContainer.querySelector("input#username-student")
    const inputPassword = modalContainer.querySelector("input#password-student")
    const inputGioiTinh = modalContainer.querySelector(".box-wrapper")
    const inputNgaySinh = modalContainer.querySelector("input#birthday-student")
    const inputDiaChi = modalContainer.querySelector("input#address")
    const inputMaLop = modalContainer.querySelector("#classes")
    const btnSubmit = modalContainer.querySelector(".registerSubmitBtn")
    btnSubmit.onclick = function () {
        gioiTinh = inputGioiTinh.querySelector('input[name = "gender"]:checked').value
        dataInfo = {
            masv: inputMaSV.value,
            ho: inputHo.value,
            ten: inputTen.value,
            userName: inputUserName.value,
            passWord: inputPassword.value,
            gioiTinh: inputGioiTinh.querySelector('input[name = "gender"]:checked').value,
            ngaySinh: inputNgaySinh.value,
            diaChi: inputDiaChi.value,
            maLop: inputMaLop.options[inputMaLop.selectedIndex].value
        }
        fetch(`/admin/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataInfo)
        }).then(async (response) => {
                const message = await response.text();
                if(message === "Lưu thành công"){
                    toast({
                        type: "success",
                        title: "Thành công!",
                        message: message,
                    });
                }
                if(message === "User name đã tồn tại trong cơ sở dữ liệu"){
                    toast({
                        type: "success",
                        title: "Thất bại!",
                        message: message,
                    });
                }
                if(message === "Mã sinh viên đã tồn tại trong cơ sở dữ liệu"){
                    toast({
                        type: "success",
                        title: "Thất bại!",
                        message: message,
                    });
                }
            })
            .catch((error) => {
                console.error("Error during fetch:", error);
            })

        closeModal(modalContainer)
    }
}

function renderClassOption(id){
     fetch("/admin/class")
    .then( (response)=>response.json())
    .then((data)=>{
        const classes = document.getElementById(id)
        console.log(data)
        const template = data.map((classItem)=>{
                return `<option value="${classItem.maLop}">${classItem.tenLop}</option>`;
        })
        classes.innerHTML = template.join();
    })
}