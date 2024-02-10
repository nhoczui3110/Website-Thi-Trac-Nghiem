function showViewXemLichThi(){
    const xem_lich_thi = document.getElementById("xem-lich-thi");
    const xem_diem = document.getElementById("xem-diem");
    var status = xem_lich_thi.style.display;
    if (status === "none"){
        xem_lich_thi.style.display = "block";
        xem_diem.style.display = "none";
    }
}
function showViewXemDiem(){
    const xem_lich_thi = document.getElementById("xem-lich-thi");
    const xem_diem = document.getElementById("xem-diem");
    var status = xem_diem.style.display;
    if (status === "none"){
        xem_lich_thi.style.display = "none";
        xem_diem.style.display = "block";
    }
}
function setView(){
    const xem_lich_thi = document.getElementById("xem-lich-thi");
    const xem_diem = document.getElementById("xem-diem");
    xem_lich_thi.style.display = "block";
    xem_diem.style.display = "none";
}
function iconClick(){
    const li = document.getElementById("profile-logout");
    var status = li.style.display;
    if(status === "none" || status === ""){
        li.style.display = "block";
    }
    else{
        li.style.display = "none";
    }
    event.stopPropagation();
}
function bodyClick(){
    const li = document.getElementById("profile-logout");
    li.style.display = "none";
}

// ====================Main==============================
// ==================biến======================
const xem_lich_thi = document.getElementById("item1");
const xem_diem = document.getElementById("item2");
const icon = document.getElementById("icon");
const main_container = document.getElementsByClassName("main-container")[0];
const btn = document.getElementById("thi-btn")
// ================gắn sự kiện==========================
setView()
xem_lich_thi.addEventListener("click",showViewXemLichThi);
xem_diem.addEventListener("click",showViewXemDiem);
icon.addEventListener("click",iconClick);
main_container.addEventListener("click",bodyClick);
