// ==============================================================================
function getALLClass(callback) {
    fetch("/admin/class", { method: "GET" })
        .then((response) => response.json())
        .then((listClass) => {
            if (callback) {
                console.log(listClass);
                callback(listClass);
            }
        });
}
function renderAllClass(listClass) {
    const content = document.querySelector(
        ".content-wrapper[data-name='lophoc']"
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
    console.log(ths)
    listClass.forEach((eachClass) => {
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
                            title: `Xóa giảng viên có mã magv`,
                            desc: "Hành động này sẽ xóa giảng viên của bạn!",
                        },
                        false,
                        () => {
                            deleteClass(eachClass)
                        }
                    );
                });
                editBtn.addEventListener("click", () => {
                    editClass(eachClass)
                });
                td.appendChild(editBtn);
                td.appendChild(trashBtn);
            } else {
                td.textContent = eachClass[th.getAttribute("data-name")];
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function editClass(eachClass) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='m-lophoc']"
    );
    console.log(modalContainer)
    console.log(eachClass["maLop"])
    const inputMaLop =
        modalContainer.querySelector("input#classId");
    inputMaLop.value = eachClass["maLop"];
    const inputTenLop =
        modalContainer.querySelector("input#classname");
    inputTenLop.value = eachClass["tenLop"];
    const inputNamNhapHoc =
        modalContainer.querySelector("input#year-admission");
    inputNamNhapHoc.value = eachClass["namNhapHoc"];

    const form = modalContainer.querySelector("form");
    form.onsubmit = (event) => {
        event.preventDefault();
    };
    openModal(modalContainer);
    const submitBtn =
        modalContainer.querySelector(".registerSubmitBtn");
    submitBtn.onclick = function (event) {
        dataInfo = {
            maLop:inputMaLop.value,
            tenLop:inputTenLop.value,
            namNhapHoc:inputNamNhapHoc.value
        }
        console.log(dataInfo)
        console.log("+++++++++++=")
        event.preventDefault();
        fetch(`/admin/class`,
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
                    message: `Cập nhật thông tin thành công abc`,
                });
                closeModal(modalContainer);
                getALLClass(renderAllClass);
            }
            ).catch((error) => { window.alert(error) })
    };
}

function deleteClass(eachClass) {
    fetch(`/admin/class/${eachClass["maLop"]}`, {
        method: "DELETE"
    }).then(async (response) => {
        const message = await response.text();
        if (message === "Xóa lớp học thành công") {
            toast({
                type: "success",
                title: "Thành công!",
                message: message,
            });
            getALLClass(renderAllClass);
        }
    }
    ).catch((error) => {
        toast({
            type: "success",
            title: "Lỗi!",
            message: `Không thể xóa lớp học`,
        });
    })
}

function addNewClass() {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='lophoc']"
    );
    console.log(modalContainer)
    const inputMaLop = modalContainer.querySelector("input#classId");
    const inputTenLop = modalContainer.querySelector("input#classname");
    const inputNamNhapHoc = modalContainer.querySelector("input#year-admission");
    const btnSubmit = modalContainer.querySelector(".registerSubmitBtn")
    btnSubmit.onclick = function () {
        dataInfo = {
            maLop:inputMaLop.value,
            tenLop:inputTenLop.value,
            namNhapHoc:inputNamNhapHoc.value
        }
        fetch(`/admin/class`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataInfo)
        }).then(async (response) => {
                const message = await response.text();
                console.log(message)
                if(message === "Thêm lớp học thành công"){
                    toast({
                        type: "success",
                        title: "Thành công!",
                        message: message,
                    });
                }
                if(message === "Mã lớp học đã tồn tại"){
                    toast({
                        type: "success",
                        title: "Thất bại!",
                        message: message,
                    });
                }
                getALLClass(renderAllClass);
            })
            .catch((error) => {
                console.error("Error during fetch:", error);
            })

        closeModal(modalContainer)
    }
}