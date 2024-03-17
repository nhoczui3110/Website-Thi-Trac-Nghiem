
// =========================class========================================

class AddNewStudentForm{
    static modalContainer = document.querySelector(".modal-container[data-name='student']");
    static inputMaSV = AddNewStudentForm.modalContainer.querySelector("input#masv")
    static inputHo = AddNewStudentForm.modalContainer.querySelector("input#lastname-student")
    static inputTen = AddNewStudentForm.modalContainer.querySelector("input#firstname-student")
    static inputUserName = AddNewStudentForm.modalContainer.querySelector("input#username-student")
    static inputPassword = AddNewStudentForm.modalContainer.querySelector("input#password-student")
    static inputConfirmPassword = AddNewStudentForm.modalContainer.querySelector("input#confirm-password-student")
    static inputGioiTinh = AddNewStudentForm.modalContainer.querySelector(".box-wrapper")
    static inputNgaySinh = AddNewStudentForm.modalContainer.querySelector("input#birthday-student")
    static inputDiaChi = AddNewStudentForm.modalContainer.querySelector("input#address")
    static inputMaLop = AddNewStudentForm.modalContainer.querySelector("#classes")
    static btnSubmit = AddNewStudentForm.modalContainer.querySelector(".registerSubmitBtn")
    static form = AddNewStudentForm.modalContainer.querySelector("form");
    static btnOpenForm = document.getElementById('addStudent')
    static errorList = AddNewStudentForm.modalContainer.querySelectorAll('.form-message')
    static getDataInfo(){
        let check = true
        let dataInfo= {
            ho: AddNewStudentForm.inputHo.value,
            ten: AddNewStudentForm.inputTen.value,
            userName: AddNewStudentForm.inputUserName.value,
            passWord: AddNewStudentForm.inputPassword.value,
            confirmPassword: AddNewStudentForm.inputConfirmPassword.value,
            gioiTinh: AddNewStudentForm.inputGioiTinh.querySelector('input[name = "gender"]:checked').value,
            diaChi: AddNewStudentForm.inputDiaChi.value,
            masv: AddNewStudentForm.inputMaSV.value,
            maLop: AddNewStudentForm.inputMaLop.options[AddNewStudentForm.inputMaLop.selectedIndex].value,
            ngaySinh: AddNewStudentForm.inputNgaySinh.value
        }
        let index = 0
        let temp= {}
        for(const key in dataInfo){
            AddNewStudentForm.errorList[index].style.color = 'red';
            temp[key] = AddNewStudentForm.errorList[index]
            if(dataInfo[key]===''){
                console.log(key)
                temp[key].innerHTML = 'Vui lòng nhập trường này';
                check = false;
            }
            else this.errorList[index].innerHTML = '';
            index ++;
        }
        if(check === true)return dataInfo;
        else return null;
    }
    static clearData(){
        AddNewStudentForm.inputHo.value = "";
        AddNewStudentForm.inputTen.value= "";
        AddNewStudentForm.inputUserName.value="";
        AddNewStudentForm.inputPassword.value="";
        AddNewStudentForm.inputConfirmPassword.value="";
        AddNewStudentForm.inputDiaChi.value="";
        AddNewStudentForm.inputMaSV.value="";
        AddNewStudentForm.inputNgaySinh.value="";
    }
    static submitForm(event){
        event.preventDefault()
        let dataInfo = AddNewStudentForm.getDataInfo()
        if(dataInfo === null)return
        fetch(`/admin/student`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataInfo)
        }).then(async (response) => {
                const message = await response.text();
                if(message === "Lưu thành công"){
                    toast({
                        type: "success",
                        title: "Thành công!",
                        message: message,
                    });
                    // closeModal(modalContainer)
                    Student.getStudentByClassCodeByFetch(Render.RenderAllStudent,Render.getCurrentClassId())
                    AddNewStudentForm.clearData()
                }
                if(message === "User name đã tồn tại trong cơ sở dữ liệu"){
                    toast({
                        type: "error",
                        title: "Thất bại!",
                        message: message,
                    });
                }
                if(message === "Mã sinh viên đã tồn tại trong cơ sở dữ liệu"){
                    toast({
                        type: "error",
                        title: "Thất bại!",
                        message: message,
                    });
                }
            })
            .catch((error) => {
                console.error("Error during fetch:", error);
            })
    }
    static setUpEventHandle(){
        AddNewStudentForm.btnOpenForm.onclick = ()=>Render.supportChooseClass()(0)
        AddNewStudentForm.btnSubmit.onclick = this.submitForm
    }
}
class EditForm{
    static modalContainer = document.querySelector(".modal-container[data-name='modify-student']");
    static inputMaSV = EditForm.modalContainer.querySelector("input#m-masv");
    static inputHo = EditForm.modalContainer.querySelector("input#m-lastname-student");
    static inputTen = EditForm.modalContainer.querySelector("input#m-firstname-student");
    static inputDiaChi = EditForm.modalContainer.querySelector("input#m-address")
    static inputNgaySinh = EditForm.modalContainer.querySelector("input#m-birthday-student")
    static inputGioiTinhNam = EditForm.modalContainer.querySelector("input#m-male-student")
    static inputGioiTinhNu = EditForm.modalContainer.querySelector("input#m-female-student")
    static submitBtn =EditForm.modalContainer.querySelector(".registerSubmitBtn");
    static getDataInfo(){
        return{
            masv: EditForm.inputMaSV.value,
            ho: EditForm.inputHo.value,
            ten: EditForm.inputTen.value,
            gioiTinh: gt,
            ngaySinh: EditForm.inputNgaySinh.value,
            diaChi: EditForm.inputDiaChi.value
        }
    }
    static editStudent(student) {
        EditForm.inputMaSV.value = student["masv"];
        EditForm.inputHo.value = student["ho"];
        EditForm.inputTen.value = student["ten"];
        EditForm.inputDiaChi.value = student["diaChi"]
        EditForm.inputNgaySinh.value = student["ngaySinh"]
        
        if (student["gioiTinh"] === false) {
            EditForm.inputGioiTinhNam.checked = true
        }
        else {
            EditForm.inputGioiTinhNu.checked = true
        }
        openModal(EditForm.modalContainer);
        Render.supportChooseClass()(1)
        EditForm.submitBtn.onclick = function (event) {
            let gt;
            if (inputGioiTinhNam.checked === true) gt = false;
            else gt = true;
            const dataInfo = EditForm.getDataInfo()
            event.preventDefault();
            fetch(`/admin/mstudent/${student["masv"]}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataInfo)
                }).then(() => {
                    toast({
                        type: "success",
                        title: "Thành công!",
                        message: `Cập nhật thông tin thành công`,
                    });
                    closeModal(modalContainer)
                }
                ).catch((error) => { window.alert(error) })
            };
    }
}
class Render{
    static content = document.querySelector(".content-wrapper[data-name='student']");
    static contentBottom = Render.content.querySelector(".content-bottom");
    static tbody = Render.contentBottom.querySelector("tbody");
    static searchStudent = Render.content.querySelector("#search-student");
    static ths = Render.contentBottom.querySelectorAll("th");
    static cmbMain = document.getElementById('cmb-class')
    static cmbCreate = document.getElementById('classes')
    static cmbEdit = document.getElementById('m-classes')
    static supportChooseClass(){
        return debounce((option = 0)=>{
            if(option === 0)Render.cmbCreate.selectedIndex = Render.cmbMain.selectedIndex
            else Render.cmbEdit.selectedIndex = Render.cmbMain.selectedIndex
        },100)
    }
    static getCurrentClassId(){
        return Render.cmbMain.options[Render.cmbMain.selectedIndex].value
    }
    static setClassSelectedHandle(){
        const classes = document.getElementById('cmb-class')
        classes.addEventListener('change',()=>{
            let maLop = classes.options[classes.selectedIndex].value
            if(maLop !=null){
                Student.getStudentByClassCode(Render.RenderAllStudent,maLop)
            }
        })
    }
    static RenderAllStudent(listStudent) {
        Render.contentBottom.style.width = "1200px";
        Render.contentBottom.style.minHeight = null;
        Render.contentBottom.style.height = "600px";
    
        const debounceSeachStudent = debounce(Student.searchStudents, 1500);
        if (Render.searchStudent) {
            Render.searchStudent.oninput = () => {
                debounceSeachStudent(Render.searchStudent.value);
            };
        }
        Render.tbody.innerHTML = "";
        listStudent.forEach((student) => {
            const tr = document.createElement("tr");
            Render.ths.forEach((th) => {
                const td = document.createElement("td");
                if (th.getAttribute("data-name") === "action") {
                    const addExam = document.createElement("i");
                    const trashBtn = document.createElement("i");
                    const editBtn = document.createElement("i");
                    trashBtn.classList.add("fa-solid", "fa-trash", "trash");
                    editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
                    addExam.classList.add(
                        "fa-solid",
                        "fa-file-circle-question",
                        "add-exam-btn"
                    );
                    trashBtn.addEventListener("click", () => {
                        popup(
                            {
                                type: "remove",
                                title: `Xác nhận xóa`,
                                desc: "Hành động này sẽ xóa sinh viên!",
                            },
                            false,
                            () => {
                                Student.deleteStudent(student)
                            }
                        );
                    });
                    editBtn.addEventListener("click", () => {
                        EditForm.editStudent(student)
                    });
                    td.appendChild(editBtn);
                    td.appendChild(trashBtn);
                } else if (th.getAttribute("data-name") === "gioiTinh") {
                    const gender = student["gioiTinh"];
                    if (gender === true) td.textContent = "Nữ";
                    else td.textContent = "Nam";
                } else {
                    td.textContent = student[th.getAttribute("data-name")];
                }
                tr.appendChild(td);
            });
            Render.tbody.appendChild(tr);
        });
    }

    static RenderClasses(){//chạy đầu tiên
        fetch("/admin/class")//=> lấy toàn bộ lớp học
        .then( (response)=>response.json())
        .then((data)=>{
            const cmb_Main = Render.cmbMain
            const cmb_Edit = Render.cmbEdit
            const cmb_Create = Render.cmbCreate
            let maLop = data[0].maLop;
            const template = data.map((classItem)=>{
                    return `<option value="${classItem.maLop}">${classItem.tenLop}</option>`;
            })
            cmb_Edit.innerHTML = cmb_Create.innerHTML = cmb_Main.innerHTML = template.join();
            
            if(maLop !=null){
                Student.getStudentByClassCode(Render.RenderAllStudent,maLop)
            }
        })
    }
}


class Student{
    static allStudent;
    static async setAllStudent(){
        await fetch("/admin/student")
        .then((response) => response.json())
        .then((listStudent) => {
           Student.allStudent = listStudent
        });
        Render.RenderClasses()//=> lấy lớp học và show sinh viên theo lớp
    }
    static getStudentByClassCode(callback,maLop){
        if (Student.allStudent) {
            const studentsInClass = Student.allStudent.filter(student => student.maLop === maLop);
            callback(studentsInClass)
        } else {
            console.error("Danh sách sinh viên chưa được tải lên.");
            return [];
        }
    }
    static getStudentByClassCodeByFetch(callback,maLop) {//=> lấy sinh viên theo mã lớp
        fetch("/admin/studentbyclass/"+maLop, { method: "GET" })
            .then((response) => response.json())
            .then((listStudent) => {
                if (callback) {
                    callback(listStudent);
                }
            });
    }
    static searchStudents(keyword){
        fetch('/admin/student/search?keyword=' + keyword+'&malop='+Render.getCurrentClassId())
            .then((response)=>response.json())
            .then((listStudent)=>{
                Render.RenderAllStudent(listStudent)
            })
    }
    static deleteStudent(student){
        fetch(`/admin/student/${student["masv"]}`, {
            method: "DELETE"
        }).then((response) => {
            if (response.status === 200) {
                toast({
                    type: "success",
                    title: "Thành công!",
                    message: `Xóa sinh viên thành công`,
                });
                Student.getStudentByClassCode(Render.RenderAllStudent,student['maLop'])
            }
            if (response.status === 400) {
                toast({
                    type: "success",
                    title: "Lỗi!",
                    message: `Sinh viên đã đăng ký thi không thể xóa sinh viên`,
                });
            }
        }
        ).catch((error) => {
            toast({
                type: "success",
                title: "Lỗi!",
                message: `Không thể xóa sinh viên`,
            });
        })
    }
    static run(){
        Student.setAllStudent()//lấy toàn bộ sinh viên
        Render.setClassSelectedHandle()//gắn xử lý sự kiện khi chon lớp khác
        AddNewStudentForm.setUpEventHandle()//=> gắn sự kiện cho các nút trên form tạo sinh viên
    }
}