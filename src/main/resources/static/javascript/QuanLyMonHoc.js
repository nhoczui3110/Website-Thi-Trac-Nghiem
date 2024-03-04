function getQuanLiMonHoc(callback) {
    fetch("/admin/getAllMonHoc")
        .then((response) => response.json())
        .then((listMonHoc) => callback(listMonHoc));
}

function deleteMonHoc(mamh) {
    fetch(`/admin/deleteMonHoc/${mamh}`, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        toast({
            type: "success",
            title: "Thành công!",
            message: `Xóa thành công môn học có mã ${mamh}`,
        });
        getQuanLiMonHoc(renderAllMonHoc);
    });
}

function searchMonHoc(keyword) {
    fetch(`/admin/searchMonHoc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: keyword,
    })
        .then((response) => response.json())
        .then((listMonHoc) => {
            if (listMonHoc) {
                renderAllMonHoc(listMonHoc);
            }
        });
}

function renderAllMonHoc(listMonHoc) {
    const content = document.querySelector(
        ".content-wrapper[data-name='monhoc']"
    );
    const contentBottom = content.querySelector(".content-bottom");
    contentBottom.style.width = "1200px";
    contentBottom.style.minHeight = null;
    contentBottom.style.height = "600px";
    const btnRegister = document.querySelector(
        ".content-wrapper[data-name='monhoc'] .btn-register"
    );
    btnRegister.onclick = addMonHocHandler;
    const searchMonHocEl = content.querySelector("#search-monhoc");
    const debounceSearchMonHoc = debounce(searchMonHoc, 300);
    if (searchMonHocEl) {
        searchMonHocEl.oninput = () => {
            const keyword =
                searchMonHocEl.value === "" ? " " : searchMonHocEl.value;
            debounceSearchMonHoc(keyword);
        };
    }
    const tbody = contentBottom.querySelector("tbody");
    tbody.innerHTML = "";
    const ths = contentBottom.querySelectorAll("th");
    listMonHoc.forEach((monHoc) => {
        const tr = document.createElement("tr");
        ths.forEach((th) => {
            const td = document.createElement("td");
            if (th.getAttribute("data-name") === "action") {
                const trashBtn = document.createElement("i");
                const editBtn = document.createElement("i");
                editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
                trashBtn.classList.add("fa-solid", "fa-trash", "trash");
                trashBtn.addEventListener("click", () => {
                    popup(
                        {
                            type: "remove",
                            title: `Xóa môn học có mã ${monHoc["mamh"]}?`,
                            desc: "Hành động này sẽ xóa môn học của bạn!",
                        },
                        false,
                        () => {
                            deleteMonHoc(monHoc["mamh"]);
                        }
                    );
                });
                editBtn.onclick = function () {
                    updateMonHocHandler(monHoc);
                };
                td.appendChild(editBtn);
                td.appendChild(trashBtn);
            } else {
                td.textContent = monHoc[th.getAttribute("data-name")];
            }
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

function updateMonHocHandler(monhoc) {
    const formEl = document.querySelector(
        ".modal-container[data-name='monhoc'] form"
    );
    const modalContainer = document.querySelector(
        ".modal-container[data-name='monhoc']"
    );
    const firstMonHocInfo = {};
    openModal(modalContainer);
    const allInput = [...modalContainer.querySelectorAll("input")];
    allInput.forEach((input) => {
        monHocValue = monhoc[`${input.getAttribute("name")}`];
        input.value =
            typeof monHocValue === "string" ? monHocValue.trim() : monHocValue;
        if (input.getAttribute("name") === "mamh") {
            input.readOnly = true;
        }
        firstMonHocInfo[input.getAttribute("name")] =
            typeof monHocValue === "string" ? monHocValue.trim() : monHocValue;
    });
    const throttleUpdateMonHoc = throttle(updateMonHoc, 1000);
    if (formEl) {
        const submitBtn = formEl.querySelector(".btn");
        submitBtn.onclick = function (event) {
            event.preventDefault();
            const currentInput = {};
            allInput.forEach((input) => {
                if (
                    input.getAttribute("name") === "soTietLt" ||
                    input.getAttribute("name") === "soTietTh"
                ) {
                    currentInput[input.getAttribute("name")] = parseInt(
                        input.value
                    );
                } else {
                    currentInput[input.getAttribute("name")] = input.value;
                }
            });
            console.log(currentInput);
            if (
                JSON.stringify(currentInput) == JSON.stringify(firstMonHocInfo)
            ) {
                return;
            }

            throttleUpdateMonHoc(getMonHocFromForm);
        };
    }
}

function updateMonHoc(callback) {
    const monhoc = callback();
    if (!monhoc) return;
    const modalContainer = document.querySelector(
        ".modal-container[data-name='monhoc']"
    );
    fetch(`/admin/updateMonHoc`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(monhoc),
    })
        .then((response) => response.json())
        .then((data) => {
            // data = 0 la thanh cong, 1 la ma mon hoc bi trung
            if (data == 0) {
                toast({
                    type: "success",
                    title: "Sửa môn học thành công!",
                    message: `Môn học có mã ${monhoc["mamh"]} đã được update`,
                });
                closeModal(modalContainer);
                getQuanLiMonHoc(renderAllMonHoc);
            } else {
                toast({
                    type: "error",
                    title: "Thất bại",
                    message: `Không thể sửa mỗn học có mã ${monhoc["mamh"]}`,
                });
            }
        });
}

function addMonHocHandler() {
    const formEl = document.querySelector(
        ".modal-container[data-name='monhoc'] form"
    );
    const mamhInput = formEl.querySelector("input[name='mamh']");
    mamhInput.readOnly = false;
    const throttleAddMonHoc = throttle(addMonHoc, 1000);
    if (formEl) {
        const submitBtn = formEl.querySelector(".btn");
        submitBtn.onclick = function (event) {
            event.preventDefault();
            throttleAddMonHoc(getMonHocFromForm);
        };
    }
}
function getMonHocFromForm() {
    let monhoc = {};
    const modalContainer = document.querySelector(
        ".modal-container[data-name='monhoc']"
    );
    const allInput = [...modalContainer.querySelectorAll("input")];
    let checkfilledInput = true;
    allInput.forEach((input) => {
        if (!input.value) {
            checkfilledInput = false;
        }
        monhoc[input.getAttribute("name")] = input.value;
    });
    if (!checkfilledInput) {
        toast({
            type: "error",
            title: "Không hợp lệ!",
            message: "Vui lòng nhập đầy đủ input",
        });
        return;
    }
    return monhoc;
}

function addMonHoc(callback) {
    const modalContainer = document.querySelector(
        ".modal-container[data-name='monhoc']"
    );
    const monhoc = callback();
    if (monhoc) {
        fetch(`/admin/addMonHoc`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(monhoc),
        })
            .then((response) => response.json())
            .then((data) => {
                // data = 0 la thanh cong, data = 1 la ma mon hoc da ton tai
                if (data == 0) {
                    toast({
                        type: "success",
                        title: "Thành công!",
                        message: `Thêm thành công môn học có mã ${monhoc["mamh"]}}`,
                    });
                    closeModal(modalContainer);
                    getQuanLiMonHoc(renderAllMonHoc);
                } else {
                    toast({
                        type: "error",
                        title: "Mã môn học không được trùng",
                        message: `Môn học có mã ${monhoc["mamh"]} đã có trong cơ sở dữ liệu}`,
                    });
                }
            });
    }
}
