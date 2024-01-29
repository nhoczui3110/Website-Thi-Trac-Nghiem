function startTable() {
    const featureItems = document.querySelectorAll(".feature-list .item");

    featureItems.forEach((item) => {
        item.addEventListener("click", () => {
            handleclearFeatureList();
            item.classList.add("active");
            clearContentWrapper();
            contentWrapper = renderContentWrapper(
                item.getAttribute("data-name")
            );
            handlerBtnRegister(contentWrapper);
        });
    });
}
function clearModalContainers() {
    const modalContainers = document.querySelectorAll(".modal-container");
    modalContainers.forEach((item) => item.classList.remove("open"));
}

function handlerBtnRegister(contentWrapper) {
    const btnRegister = contentWrapper.querySelector(".btn-register");
    if (!btnRegister) return;
    btnRegister.addEventListener("click", () => {
        clearModalContainers();
        const modal = document.querySelector(".modal");
        const modalContainer = document.querySelector(
            `.modal-container[data-name=${contentWrapper.getAttribute(
                "data-name"
            )}]`
        );
        const closeBtn = document.querySelector(
            `.modal-container[data-name=${contentWrapper.getAttribute(
                "data-name"
            )}] .closeBtn`
        );
        function openModal() {
            modal.classList.add("open");
            modalContainer.classList.add("open");
        }
        function clearFormValidation() {
            const formGroups = document.querySelectorAll(".input-wrapper");
            formGroups.forEach((formGroup) => {
                formGroup.classList.remove("invalid");
                const formMessage = formGroup.nextElementSibling;
                formMessage.classList.remove("invalid");
                formMessage.textContent = "";
            });
        }
        function closeModal() {
            modal.classList.remove("open");
            modalContainer.classList.remove("open");
            clearFormValidation();
        }
        openModal();
        Validator(".register-form");
        modalContainer.addEventListener("click", (event) =>
            event.stopPropagation()
        );
        modal.addEventListener("click", closeModal);
        closeBtn.addEventListener("click", closeModal);
        // Ngan su kien noi bot ke tu modal container
    });
}

function handleclearFeatureList() {
    const featureItems = document.querySelectorAll(".feature-list .item");
    featureItems.forEach((item) => {
        item.classList.remove("active");
    });
}
function clearContentWrapper() {
    const contentWrappers = document.querySelectorAll(".content > div");
    console.log(contentWrappers);
    contentWrappers.forEach((item) => (item.style.display = "none"));
}

function renderContentWrapper(dataName, callback) {
    const contentWrapper = document.querySelector(
        `.content div[data-name=${dataName}]`
    );
    contentWrapper.style.display = "block";
    // Fetch api
    callback();
    return contentWrapper;
}
startTable();
