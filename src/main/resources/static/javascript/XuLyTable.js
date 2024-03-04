function startTable(objectGet) {
    const featureItems = document.querySelectorAll(".feature-list .item");

    featureItems.forEach((item) => {
        item.addEventListener("click", () => {
            console.log("itemfeature");
            handleclearFeatureList();
            item.classList.add("active");
            clearContentWrapper();
            contentWrapper = renderContentWrapper(
                item.getAttribute("data-name")
            );
            if (objectGet) {
                objectGet[item.getAttribute("data-name")]();
            }

            handlerBtnRegister(contentWrapper);
        });
    });
    featureItems[0].classList.add("active");
    contentWrapper = renderContentWrapper(
        featureItems[0].getAttribute("data-name")
    );
}

function clearFormValidation() {
    const formGroups = document.querySelectorAll(".input-wrapper");
    formGroups.forEach((formGroup) => {
        const input = formGroup.querySelector("input");
        if (input) input.value = "";
        formGroup.classList.remove("invalid");
        const formMessage = formGroup.nextElementSibling;
        formMessage.classList.remove("invalid");
        formMessage.textContent = "";
    });
}

function clearModalContainers() {
    const modalContainers = document.querySelectorAll(".modal-container");
    modalContainers.forEach((item) => item.classList.remove("open"));
}

function openModal(modalContainer) {
    const modal = document.querySelector(".modal");
    modal.classList.add("open");
    modalContainer.classList.add("open");
    modalContainer.addEventListener("click", (event) =>
        event.stopPropagation()
    );
    modal.addEventListener("click", () => closeModal(modalContainer));
    const closeBtn = modalContainer.querySelector(`.closeBtn`);
    if (!closeBtn) return;
    closeBtn.addEventListener("click", () => closeModal(modalContainer));
}

function closeModal(modalContainer) {
    const modal = document.querySelector(".modal");
    modal.classList.remove("open");
    modalContainer.classList.remove("open");
    clearFormValidation();
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
        openModal(modalContainer);
        Validator(
            `.modal-container[data-name=${contentWrapper.getAttribute(
                "data-name"
            )}] .register-form`
        );
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
    contentWrappers.forEach((item) => (item.style.display = "none"));
}

function renderContentWrapper(dataName) {
    const contentWrapper = document.querySelector(
        `.content div[data-name=${dataName}]`
    );
    contentWrapper.style.display = "block";

    return contentWrapper;
}
