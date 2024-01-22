const featureItems = document.querySelectorAll(".controller-wrapper .item");
const quanLiSv = featureItems[1];
const quanLiGv = featureItems[2];
console.log(quanLiGv);

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
        <div class="select-wrapper">
            <label for="classes">Chọn lớp:</label>
            <select id="classes" name="class">
                <option value="D21CQCN01-N">D21CQCN01-N</option>
                <option value="D21CQCN02-N">D21CQCN02-N</option>
            </select>
        </div>
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
    }
}

function addModal(type) {
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
    <span>Add Students</span>
</a>`;

    const contentBottom = document.querySelector(".content-bottom");
    contentBottom.insertAdjacentHTML("afterend", templateBtn);

    if (type === "sv") {
        const modalContainer = document.querySelector(".modal-container");
        modalContainer.innerHTML = createForm(type);
        Validator(".register-form");
    }

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
            nextElement.classList.remove("invalid");
            nextElement.textContent = "";
        });
    }
    const registerBtn = document.querySelector(".btn-register");
    const closeBtn = document.querySelector(".closeBtn");
    const modal = document.querySelector(".modal");
    const modalContainer = document.querySelector(".modal-container");

    modal.addEventListener("click", closeModal);

    // Ngan su kien noi bot ke tu modal container
    modalContainer.addEventListener("click", (event) =>
        event.stopPropagation()
    );

    closeBtn.addEventListener("click", closeModal);

    console;
    registerBtn.addEventListener("click", openModal);
}

function handleQuanLiSv(type) {
    clearTable();
    addModal(type);
    const text = document.querySelector(".content-top .text");
    const contentBottom = document.querySelector(".content-bottom");
    const findWrapper = document.createElement("div");
    const tableSv = document.createElement("table");
    const thead = createThead(type);
    const tbody = document.createElement("tbody");

    tableSv.classList.add("table");
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

    tableSv.appendChild(thead);
    tableSv.appendChild(tbody);
    contentBottom.appendChild(findWrapper);
    contentBottom.appendChild(tableSv);

    if ((type = "sv")) text.textContent = "Students";
}

//  Su li xu kien
featureItems.forEach((item) => {
    item.addEventListener("click", () => {
        handleClearFeatureList();
        item.classList.add("active");
    });
});

quanLiSv.addEventListener("click", () => handleQuanLiSv("sv"));
