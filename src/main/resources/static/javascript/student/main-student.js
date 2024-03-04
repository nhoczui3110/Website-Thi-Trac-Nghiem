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
    window.alert('je')
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

function saveInfo(event) {
    event.preventDefault();
    var formData = {
        masv: document.getElementById("masv").value,
        ho: document.getElementById('ho').value,
        ten: document.getElementById('ten').value,
        gioiTinh: document.getElementById('gioitinh').value,
        diaChi: document.getElementById('diachi').value
    }
    window.alert('abc')
    console.log(formData)
    var url = 'http://localhost:8080/api/updateInfo'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })

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