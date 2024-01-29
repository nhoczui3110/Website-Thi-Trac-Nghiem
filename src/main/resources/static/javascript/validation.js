function Validator(selector, anotherCheck) {
    let formRules = {};
    let validateRules = {
        required: function (value) {
            return value ? undefined : "Vui lòng nhập trường này";
        },
        email: function (value) {
            let rex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return rex.test(value) ? undefined : "Vui lòng nhập email hợp lệ";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập tối thiểu ${min} ký tự`;
            };
        },
        max: function (max) {
            return function (value) {
                return value.length <= max
                    ? undefined
                    : `Vui lòng nhập tối đa ${max} ký tự`;
            };
        },
        confirmPassword: function (confirmValue, originalValue) {
            return confirmValue === originalValue
                ? undefined
                : "Mật khẩu xác nhận không khớp";
        },
    };

    let formElement = document.querySelector(selector);
    if (formElement) {
        let inputs = formElement.querySelectorAll("[name][rules]");
        for (let input of inputs) {
            let rules = input.getAttribute("rules").split("|");
            for (let rule of rules) {
                let isRuleHasValue = rule.includes(":");
                let ruleInfo;
                if (isRuleHasValue) {
                    ruleInfo = rule.split(":");
                    rule = ruleInfo[0];
                }
                let ruleFunc = validateRules[rule];
                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }
            }

            input.onblur = handleValidate;
            input.onfocus = handleClear;
        }

        function handleValidate(event) {
            let rules = formRules[event.target.name];

            for (let rule of rules) {
                let message;
                // if (event.target.name === "confirmPassword") {
                //     console.log("vo day");
                //     // console.log(event.target.name);
                //     // For confirmPassword, pass both current value and original password value
                //     message = rule(
                //         event.target.value,
                //         getOriginalPasswordValue()
                //     );
                // } else {
                //     // For other fields, only pass the current value
                //     message = rule(event.target.value);
                // }
                message = rule(event.target.value, getOriginalPasswordValue());
                if (message !== undefined) {
                    let parentEle = event.target.parentElement;
                    if (parentEle) {
                        parentEle.classList.add("invalid");
                        let formMessage = parentEle.nextElementSibling;
                        formMessage.textContent = message;
                    }
                    return false;
                }
            }
            return true;
        }

        function handleClear(event) {
            let parentEle = event.target.parentElement;
            if (parentEle.classList.contains("invalid")) {
                parentEle.classList.remove("invalid");
                let formMessage = parentEle.nextElementSibling;
                formMessage.textContent = "";
            }
        }

        function getOriginalPasswordValue() {
            // Assuming the original password input has the name 'password'
            let originalPasswordInput =
                formElement.querySelector('[name="password"]');
            return originalPasswordInput ? originalPasswordInput.value : "";
        }
        formElement.addEventListener("submit", function (event) {
            event.preventDefault();
            let isValid = true;

            for (let input of inputs) {
                if (!handleValidate({ target: input })) {
                    isValid = false;
                }
            }

            if (isValid && !anotherCheck) {
                formElement.submit();
            }
        });
    }
}

// Example usage:
