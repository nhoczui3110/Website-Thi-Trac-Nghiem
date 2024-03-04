let adminInfo;
function getAdminInfo() {
    return new Promise((resolve) => {
        fetch("/admin/getAdminInfo")
            .then((response) => response.json())
            .then((data) => {
                adminInfo = { ...data };
                console.log(data);
                resolve();
            });
    });
}

async function start() {
    await getAdminInfo();
    let classes;
    startTable({
        lecturer: () => {
            getAllGiangVien(renderAllGiangVien);
            getAllClasses(renderClassesExam);
            addLecturerHandler();
        },
        monhoc: () => {
            getQuanLiMonHoc(renderAllMonHoc);
            // addMonHocHandler();
        },
<<<<<<< HEAD
=======
        student: ()=>{
            getALLStudent(renderAllStudent);
           
            addNewStudent();
        },
        lophoc:()=>{
            getALLClass(renderAllClass);
            addNewClass();
        }
>>>>>>> quang
    });
}

start();
