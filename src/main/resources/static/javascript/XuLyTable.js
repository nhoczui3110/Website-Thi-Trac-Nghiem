//Handle
function handleClearFeatureList() {
    featureItems.forEach((item) => {
        item.classList.remove("active");
    });
}

function clearTable() {
    const contentBottom = document.querySelector(".content-bottom");
    const btnRegister = document.querySelector(".btn-register");
    if (contentBottom) {
        contentBottom.innerHTML = ``;
    }
    if (btnRegister) {
        btnRegister.parentElement.removeChild(btnRegister);
    }
}

function createForm(type) {
    if (type === "quanLiExamStudent" || type === "thiStudent") return;
    if (type === "sv")
        return `<div class="header">Register</div>
    <form action="/login" class="register-form" method="post">
        <div class="form-wrapper">
            <div class="input-wrapper">
                <label for="lastname">Họ</label>
                <input
                    type="text"
                    placeholder=""
                    name="lastname"
                    id="lastname"
                    autocomplete="nope"
                    rules="required"
                />
                <div class="bar"></div>
            </div>
            <span class="form-message"></span>
            <div class="input-wrapper">
                <label for="firstname">Tên</label>
                <input
                    type="text"
                    placeholder=""
                    name="firstname"
                    id="firstname"
                    autocomplete="nope"
                    rules="required"
                />
                <div class="bar"></div>
            </div>
            <span class="form-message"></span>
        </div>
        <div class="input-wrapper">
            <label for="username">User Name</label>
            <input
                type="text"
                placeholder=""
                name="username"
                id="username"
                autocomplete="nope"
                rules="required"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="password">Password</label>
            <input
                type="password"
                placeholder=""
                name="password"
                id="password"
                rules="required|min:6"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="confirm-password">Confirm Password</label>
            <input
                type="password"
                placeholder=""
                name="confirm-password"
                id="confirm-password"
                rules="required|confirmPassword"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="box-wrapper">
            <input type="radio" name="gender" id="male" checked />
            <label for="male" checked>Nam</label>
            <input type="radio" name="gender" id="female" />
            <label for="female">Nữ</label>
        </div>
        <div class="input-wrapper">
            <label for="address">Địa chỉ</label>
            <input
                type="text"
                placeholder=""
                name="address"
                id="address"
                rules="required"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="masv">Mã Sinh Viên</label>
            <input
                type="text"
                placeholder=""
                name="address"
                id="masv"
                rules="required"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="classes">Chọn lớp:</label>
            <select id="classes" name="class">
                <option value="D21CQCN01-N">D21CQCN01-N</option>
                <option value="D21CQCN02-N">D21CQCN02-N</option>
            </select>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="birthday">Ngày sinh</label>
            <input type="date" name="birthday" id="birthday" rules="required"/>
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
    else if (type === "gv")
        return `<div class="header">Register</div>
    <form action="/login" class="register-form" method="post">
        <div class="form-wrapper">
            <div class="input-wrapper">
                <label for="lastname">Họ</label>
                <input
                    type="text"
                    placeholder=""
                    name="lastname"
                    id="lastname"
                    autocomplete="nope"
                    rules="required"
                />
                <div class="bar"></div>
            </div>
            <span class="form-message"></span>
            <div class="input-wrapper">
                <label for="firstname">Tên</label>
                <input
                    type="text"
                    placeholder=""
                    name="firstname"
                    id="firstname"
                    autocomplete="nope"
                    rules="required"
                />
                <div class="bar"></div>
            </div>
            <span class="form-message"></span>
        </div>
        <div class="input-wrapper">
            <label for="username">User Name</label>
            <input
                type="text"
                placeholder=""
                name="username"
                id="username"
                autocomplete="nope"
                rules="required"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="password">Password</label>
            <input
                type="password"
                placeholder=""
                name="password"
                id="password"
                rules="required|min:6"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="confirm-password">Confirm Password</label>
            <input
                type="password"
                placeholder=""
                name="confirm-password"
                id="confirm-password"
                rules="required|confirmPassword"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="box-wrapper">
            <input type="radio" name="gender" id="male" checked />
            <label for="male" checked>Nam</label>
            <input type="radio" name="gender" id="female" />
            <label for="female">Nữ</label>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="hocvi">Học vị:</label>
            <select id="hocvi" name="hocvi">
                <option value="Tú tài">Tú tài</option>
                <option value="Cử nhân">Cử nhân</option>
                <option value="Thạc sĩ">Thạc sĩ</option>
                <option value="Tiến sĩ">Tiến sĩ</option>
            </select>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="hocham">Học hàm:</label>
            <select id="hocham" name="hocham">
                <option value="Giáo sư">Giáo sư</option>
                <option value="Phó giáo sư">Phó giáo sư</option>
            </select>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="magv">Mã giảng viên</label>
            <input
                type="text"
                placeholder=""
                name="address"
                id="magv"
                rules="required"
            />
            <div class="bar"></div>
        </div>
        <span class="form-message"></span>
        <div class="input-wrapper">
            <label for="birthday">Ngày sinh</label>
            <input type="date" name="birthday" id="birthday" rules="required"/>
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
    else if (type === "thi")
        return `<div class="header">Register</div>
        <form action="/login" class="register-form" method="post">
            <div class="input-wrapper">
                <label for="tengv">Mã giảng viên :</label>
                <select id="tengv" name="magv">
                    <option value="GV01">lUU NGUYEN KI THU</option>
                    <option value="GV02">HUYNH CHI TRUNG</option>
                </select>
            </div>
            <div class="input-wrapper">
                <label for="tenmh">Tên môn học:</label>
                <select id="tenmh" name="mamh">
                    <option value="INIT01">C++</option>
                    <option value="INIT02">Python</option>
                </select>
            </div>
            <div class="input-wrapper">
                <label for="tenlop">Tên lớp: </label>
                <select id="tenlop" name="malop">
                    <option value="D21CQCN01">D21CQCN01</option>
                    <option value="D21CQCN02">D21CQCN02</option>
                </select>
            </div>
            <div class="input-wrapper">
                <label for="lanthi">Lần thi</label>
                <input
                    type="number"
                    placeholder=""
                    name="lanthi"
                    id="lanthi"
                    autocomplete="nope"
                    rules="required"
                />
                <div class="bar"></div>
            </div>
            <span class="form-message"></span>
            <div class="input-wrapper">
                <label for="socau">Số câu</label>
                <input
                    type="number"
                    placeholder=""
                    name="socau"
                    id="socau"
                    autocomplete="nope"
                    rules="required"
                />
                <div class="bar"></div>
            </div>
            <div class="input-wrapper">
                <label for="ngaythi">Ngày thi</label>
                <input type="date" name="ngaythi" id="ngaythi" rules="required"/>
            </div>
            <span class="form-message"></span>
            <div class="input-wrapper">
                <label for="thoigianthi">Thời gian thi</label>
                <input type="time" name="thoigianthi" id="thoigianthi" rules="required"/>
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
}

function createThead(type) {
    const thead = document.createElement("thead");
    if (type === "sv") {
        thead.innerHTML = `<tr>
        <th>Mã sinh viên</th>
        <th>Họ</th>
        <th>Tên</th>
        <th>Giới tính</th>
        <th>Địa chỉ</th>
        <th>Ngày sinh</th>
        <th>Username</th>
        <th>Password</th>
        <th>Action</th>
        </tr>`;
        return thead;
    } else if (type === "gv") {
        thead.innerHTML = `<tr>
        <th>Mã giảng viên</th>
        <th>Họ</th>
        <th>Tên</th>
        <th>Giới tính</th>
        <th>Học vị</th>
        <th>Học hàm</th>
        <th>Username</th>
        <th>Password</th>
        <th>Action</th>
        </tr>`;
        return thead;
    } else if (type === "thi") {
        thead.innerHTML = `<tr>
        <th>Mã môn học</th>
        <th>Mã lớp</th>
        <th>Lần</th>
        <th>Số câu</th>
        <th>Ngày thi</th>
        <th>Thời lượng</th>
        <th>Mã Giáo Viên</th>
        <th>Action</th>
        </tr>`;
        return thead;
    } else if (type === "quanLiExamStudent") {
        thead.innerHTML = `<tr>
        <th>Môn học</th>
        <th>Lần thi</th>
        <th>Điểm</th>
        <th>Số câu</th>
        <th>Ngày thi</th>
        <th>Thời lượng</th>
        <th>Action</th>
        </tr>`;
        return thead;
    } else if (type === "thiStudent") {
        thead.innerHTML = `<tr>
        <th>Môn thi</th>
        <th>Số câu</th>
        <th>Ngày thi</th>
        <th>Thời lượng</th>
        <th>Action</th>
        </tr>`;
        return thead;
    }
}

function addModal(type) {
    if (type === "quanLiExamStudent" || type === "thiStudent") return;
    const templateBtn = `<a href="#!" class="btn-trans btn-register">
    <div class="circle">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
        >
            <path
                d="M15.7857 6.67857H10.3214V1.21429C10.3214 0.543772 9.77766 0 9.10714 0H7.89286C7.22234 0 6.67857 0.543772 6.67857 1.21429V6.67857H1.21429C0.543772 6.67857 0 7.22234 0 7.89286V9.10714C0 9.77766 0.543772 10.3214 1.21429 10.3214H6.67857V15.7857C6.67857 16.4562 7.22234 17 7.89286 17H9.10714C9.77766 17 10.3214 16.4562 10.3214 15.7857V10.3214H15.7857C16.4562 10.3214 17 9.77766 17 9.10714V7.89286C17 7.22234 16.4562 6.67857 15.7857 6.67857Z"
                fill="currentColor"
            />
        </svg>
    </div>
    <span></span>
</a>`;
    const contentBottom = document.querySelector(".content-bottom");
    contentBottom.insertAdjacentHTML("afterend", templateBtn);
    if (type === "sv") {
        const textBtn = document.querySelector(".btn-register span");
        textBtn.textContent = "Thêm sinh viên";
    } else if (type === "gv") {
        const textBtn = document.querySelector(".btn-register span");
        textBtn.textContent = "Thêm giảng viên";
    } else if (type === "thi") {
        const textBtn = document.querySelector(".btn-register span");
        textBtn.textContent = "Thêm bài thi";
    } else if (type === "thi") {
        const textBtn = document.querySelector(".btn-register span");
        textBtn.textContent = "Thêm câu hỏi";
    }
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.innerHTML = createForm(type);
    Validator(".register-form");

    function openModal() {
        modal.classList.add("open");
    }

    function closeModal() {
        modal.classList.remove("open");
        clearFormValidation();
    }

    function clearFormValidation() {
        const formGroups = document.querySelectorAll(".input-wrapper");
        formGroups.forEach((formGroup) => {
            formGroup.classList.remove("invalid");
            const nextElement = formGroup.nextElementSibling;
            console.log(nextElement);
            nextElement.classList.remove("invalid");
            nextElement.textContent = "";
        });
    }
    const registerBtn = document.querySelector(".btn-register");
    const closeBtn = document.querySelector(".closeBtn");
    const modal = document.querySelector(".modal");

    modal.addEventListener("click", closeModal);

    // Ngan su kien noi bot ke tu modal container
    modalContainer.addEventListener("click", (event) =>
        event.stopPropagation()
    );

    closeBtn.addEventListener("click", closeModal);

    console;
    registerBtn.addEventListener("click", openModal);
}

function handleQuanLi(type) {
    clearTable();
    addModal(type);
    const text = document.querySelector(".content-top .text");
    const contentBottom = document.querySelector(".content-bottom");
    const findWrapper = document.createElement("div");
    const table = document.createElement("table");
    const thead = createThead(type);
    const tbody = document.createElement("tbody");
    const tableController = document.createElement("div");
    const contentWrapper = document.querySelector(".content-wrapper");
    tableController.classList.add("table-controller");

    tableController.innerHTML = `
    <span class="text">Previous</span>
                        <div class="page-number">
                            <span class="item">1</span>
                            <span class="item">2</span>
                            <span class="item">3</span>
                        </div>
                        <span class="text"> Next</span>`;
    table.classList.add("table");
    findWrapper.classList.add("find-wrapper");

    findWrapper.innerHTML = `<label for="search">Entries</label>
    <div class="search-wrapper">
        <img
            src="../static/assets/img/search-icon.svg"
            th:src="@{/assets/img/search-icon.svg}"
            alt=""
        />
        <input
            type="text"
            name=""
            id="search"
            placeholder="Search..."
        />
    </div>`;

    table.appendChild(thead);
    table.appendChild(tbody);
    contentBottom.appendChild(findWrapper);
    contentBottom.appendChild(table);
    contentBottom.appendChild(tableController);
    contentWrapper.style.display = "block";
    if (type === "sv") text.textContent = "Students";
    else if (type === "gv") text.textContent = "Lecturers";
    else if (type === "thi" || type === "quanLiExamStudent")
        text.textContent = "Exams";
    else if (type === "thiStudent") text.textContent = "Existing Exam";
}

//  Su li xu kien
