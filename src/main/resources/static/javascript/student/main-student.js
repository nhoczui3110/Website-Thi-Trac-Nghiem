function switchView(index) {
    const xem_lich_thi = document.getElementById("xem-lich-thi");
    const xem_diem = document.getElementById("xem-diem");
    const sua_thong_tin = document.getElementById("sua-thong-tin")
    const li = [xem_lich_thi, xem_diem, sua_thong_tin]
    for (let i = 0; i < 3; i++) {
        li[i].style.display = "none";
    }
    li[index].style.display = "block";
}
function setView() {
    const xem_lich_thi = document.getElementById("xem-lich-thi");
    const xem_diem = document.getElementById("xem-diem");
    const sua_thong_tin = document.getElementById("sua-thong-tin")
    xem_lich_thi.style.display = "block";
    xem_diem.style.display = "none";
    sua_thong_tin.style.display = "none";
}
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

function setCheckInput() {
    const errorList = document.querySelectorAll('.error')
    const ho = document.getElementById('ho')
    const ten = document.getElementById('ten')
    const diaChi = document.getElementById('diachi')
    const ngaySinh = document.getElementById('ngaysinh')
    const passWord = document.getElementById('password')
    const confirmPassword = document.getElementById('confirm-password')
    ho.addEventListener('input', function () {
        if (ho.value === '') {
            errorList[0].innerHTML = "Vui lòng nhập thông tin"
            permitBtn(false)
        }
        else {
            errorList[0].innerHTML = ''
            permitBtn(null)
        }
    })
    ten.addEventListener('input', function () {
        if (ten.value === '') {errorList[1].innerHTML = "Vui lòng nhập thông tin";permitBtn(false)}
        else {errorList[1].innerHTML = '';permitBtn(null)}
    })
    diaChi.addEventListener('input', function () {
        if (diaChi.value === '') {errorList[3].innerHTML = "Vui lòng nhập thông tin";permitBtn(false)}
        else {errorList[3].innerHTML = '';permitBtn(null)}
    })
    ngaySinh.addEventListener('input', function () {
        if (ngaySinh.value === '') {errorList[4].innerHTML = "Vui lòng nhập thông tin";permitBtn(false)}
        else {errorList[4].innerHTML = '';permitBtn(null)}
    })
    passWord.addEventListener('input', function () {
        if (passWord.value === '') {errorList[5].innerHTML = "Vui lòng nhập thông tin";permitBtn(false)}
        else {errorList[5].innerHTML = '';permitBtn(null)}
    })
    confirmPassword.addEventListener('input', function () {
        if (confirmPassword.value === '') errorList[6].innerHTML = "Vui lòng nhập thông tin"
        else if (confirmPassword.value != passWord.value) errorList[6].innerHTML = "Mật khẩu không khớp"
        else errorList[6].innerHTML = ''
        permitBtn()
    })
}
setCheckInput()

function permitBtn(checkAllow) {
    const btn = document.getElementById("infoBtn")
    if (checkAllow != null && checkAllow == false) {
        btn.disabled = true;
        return
    }
    var formData = {
        ho: document.getElementById('ho').value,
        ten: document.getElementById('ten').value,
        gioiTinh: document.getElementById('gioitinh').value,
        diaChi: document.getElementById('diachi').value,
        ngaySinh: document.getElementById('ngaysinh').value,
        passWord: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirm-password').value
    }
    for (var key in formData) {
        console.log(key)
        if (formData.hasOwnProperty(key) && formData[key].trim() === '') {
            btn.disabled = true
            return; // Nếu có trường trống thì dừng vòng lặp
        }
    }
    console.log(formData['passWord'])
    console.log(formData['confirmPassword'])
    if (formData['passWord'] != formData['confirmPassword']) {
        btn.disabled = true;
        return
    }
    btn.disabled = false;
}
function saveInfo(event) {
    event.preventDefault();
    var dataInfo = {
        masv: document.getElementById("masv").value,
        ho: document.getElementById('ho').value,
        ten: document.getElementById('ten').value,
        gioiTinh: document.getElementById('gioitinh').value,
        diaChi: document.getElementById('diachi').value,
        ngaySinh: document.getElementById('ngaysinh').value,
        passWord: document.getElementById('password').value
    }
    console.log(dataInfo)

    console.log(dataInfo)
    fetch("/admin/student",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataInfo)
            }).then(() => {
                
            }
            ).catch((error) => { window.alert(error) })

}


// ====================Main==============================
// ==================biến======================
const icon = document.getElementById("icon");
const main_container = document.getElementsByClassName("main-container")[0];
const btn = document.getElementById("thi-btn")
// ================gắn sự kiện==========================
setView()
main_container.addEventListener("click", bodyClick);

// function showViewXemLichThi(){
//     const xem_lich_thi = document.getElementById("xem-lich-thi");
//     const xem_diem = document.getElementById("xem-diem");
//     var status = xem_lich_thi.style.display;
//     if (status === "none"){
//         xem_lich_thi.style.display = "block";
//         xem_diem.style.display = "none";
//     }
// }
// function showViewXemDiem(){
//     const xem_lich_thi = document.getElementById("xem-lich-thi");
//     const xem_diem = document.getElementById("xem-diem");
//     var status = xem_diem.style.display;
//     if (status === "none"){
//         xem_lich_thi.style.display = "none";
//         xem_diem.style.display = "block";
//     }
// xem_lich_thi.addEventListener("click",showViewXemLichThi);
// xem_diem.addEventListener("click",showViewXemDiem);
// icon.addEventListener("click",iconClick);
// main_container.addEventListener("click",bodyClick);
// xem_lich_thi.addEventListener("click",()=>{switchView(0)});
// }
// const xem_lich_thi = document.getElementById("item1");
// const xem_diem = document.getElementById("item2");
// xem_diem.addEventListener("click",()=>{switchView(1)});
// icon.addEventListener("click", iconClick);