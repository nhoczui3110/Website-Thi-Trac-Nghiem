function switchView(index) {
    const xem_lich_thi = document.getElementById("xem-lich-thi");
    const xem_diem = document.getElementById("xem-diem");
    const sua_thong_tin = document.getElementById("sua-thong-tin")
    const doi_mat_khau = document.getElementById("doi-mat-khau")
    const li = [xem_lich_thi, xem_diem, sua_thong_tin,doi_mat_khau]
    for (let i = 0; i <4 ; i++) {
        li[i].style.display = "none";
    }
    li[index].style.display = "block";
}
// function setView() {
//     const xem_lich_thi = document.getElementById("xem-lich-thi");
//     const xem_diem = document.getElementById("xem-diem");
//     const sua_thong_tin = document.getElementById("sua-thong-tin")
//     const doi_mat_khau = document.getElementById("doi-mat-khau")
//     xem_lich_thi.style.display = "block";
//     xem_diem.style.display = "none";
//     sua_thong_tin.style.display = "none";
//     doi_mat_khau.style.display = "none";
// }
function iconClick(event) {
    const li = document.getElementById("profile-logout");
    let status = li.style.display;
    if (status === "none" || status === "") {
        li.style.display = "block";
    }
    else {
        li.style.display = "none";
    }
    event.stopPropagation();
}
function bodyClick() {
    const li = document.getElementById("profile-logout");
    li.style.display = "none";
}

function CheckInfoInput() {
    const errorList = document.querySelectorAll('.error')
    const ho = document.getElementById('ho')
    const ten = document.getElementById('ten')
    const diaChi = document.getElementById('diachi')
    const ngaySinh = document.getElementById('ngaysinh')
    const passWord = document.getElementById('password')
    const confirmPassword = document.getElementById('confirm-password')
    const newPassword= document.getElementById('new-password');

    ho.addEventListener('input', function () {
        if (ho.value === '') {
            errorList[0].innerHTML = "Vui lòng nhập thông tin"
 
        }
        else {
            errorList[0].innerHTML = ''
        }
    })
    ten.addEventListener('input', function () {
        if (ten.value === '') {errorList[1].innerHTML = "Vui lòng nhập thông tin";}
        else {errorList[1].innerHTML = '';

    }
    })
    diaChi.addEventListener('input', function () {
        if (diaChi.value === '') {errorList[3].innerHTML = "Vui lòng nhập thông tin";}
        else {errorList[3].innerHTML = '';
    }
    })
    ngaySinh.addEventListener('input', function () {
        if (ngaySinh.value === '') {errorList[4].innerHTML = "Vui lòng nhập thông tin";}
        else {errorList[4].innerHTML = '';
    }
    })
    passWord.addEventListener('input', function () {
        if (passWord.value === '') {errorList[5].innerHTML = "Vui lòng nhập thông tin";}
        else {errorList[5].innerHTML = '';
    }
    })
    newPassword.addEventListener('input',function(){
        if(newPassword.value === '')errorList[6].innerHTML = "Vui lòng nhập thông tin";
        else errorList[6].innerHTML = '';
    })
    confirmPassword.addEventListener('input', function () {
        if (confirmPassword.value === '') errorList[7].innerHTML = "Vui lòng nhập thông tin"
        //else if (confirmPassword.value != newPassword.value) errorList[6].innerHTML = "Mật khẩu không khớp"
        else errorList[7].innerHTML = ''
    })
}

function CheckBeforeSendInfo() {
    const errorList = document.querySelectorAll('.right-child-container-bottom #modify-info .error')
    let check = true;
    for (let i = 0; i < errorList.length; i++) {
        if(errorList[i].innerHTML != ''){
            check = false;
            errorList[i].classList.add('shake-animation')
        }
        else errorList[i].classList.remove('shake-animation')
      }
      return check;
}
function CheckBeforeSendPassword(){
    const errorList = document.querySelectorAll('.right-child-container-bottom #change-password .error')
    console.log(errorList)
    let check = true;
    for (let i = 0; i < errorList.length; i++) {
        if(errorList[i].innerHTML != ''){
            check = false;
            errorList[i].classList.add('shake-animation')
        }
        else errorList[i].classList.remove('shake-animation')
        console.log(errorList[i].innerHTML)
    }
    const passWord = document.getElementById('password')
    const confirmPassword = document.getElementById('confirm-password')
    const newPassword= document.getElementById('new-password');
    if(passWord.value === '') {
        errorList[0].innerHTML ="Vui lòng nhập thông tin";
        check = false;
    }
    if(newPassword.value === '') {
        errorList[1].innerHTML ="Vui lòng nhập thông tin";
        check = false;
    }
    console.log(newPassword.value==='')
    if(confirmPassword.value === '') {
        errorList[2].innerHTML ="Vui lòng nhập thông tin";
        check = false;
    }
    else if (confirmPassword.value != newPassword.value) {
        errorList[2].innerHTML = "Mật khẩu không khớp"
        check  = false;
    }
    return check;
}
function saveInfo(event) {
    event.preventDefault();
    if(CheckBeforeSendInfo() === false)return;
    var dataInfo = {
        masv: document.getElementById("masv").value,
        ho: document.getElementById('ho').value,
        ten: document.getElementById('ten').value,
        gioiTinh: document.getElementById('gioitinh').value,
        diaChi: document.getElementById('diachi').value,
        ngaySinh: document.getElementById('ngaysinh').value,
    }
    const message = document.querySelector(".right-child-container-bottom #modify-info #info-message")
    console.log(message)
    console.log(dataInfo)

    console.log(dataInfo)
    fetch("/admin/student",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataInfo)
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
                
            }
            ).then((data)=>{
                message.innerHTML = data;
            }).catch((error) => { 
                window.alert(error) 
            })

}

function changePassword(event){
    event.preventDefault();
    if(CheckBeforeSendPassword()===false) return;
    var dataInfo = {
        masv: document.getElementById("masv").value,
        password: document.getElementById('password').value,
        newPassword: document.getElementById('new-password').value
    }
    console.log(dataInfo)
    const message = document.querySelector(".right-child-container-bottom  #message")
    console.log(message)
    fetch("/admin/studentpassword",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataInfo)
            }).then((respone) => {
                return respone.text()
            }
            ).then(data=>{
                if(data==="Sai mật khẩu") message.style.color = "red";
                else message.style.color = "black";
                message.innerHTML = data;

                
            }) .catch((error) => { window.alert(error) })
}
// ====================Main==============================
// ==================biến======================
const icon = document.getElementById("icon");
const main_container = document.getElementsByClassName("main-container")[0];
const btn = document.getElementById("thi-btn")
// ================gắn sự kiện==========================
// setView()
main_container.addEventListener("click", bodyClick);
CheckInfoInput()