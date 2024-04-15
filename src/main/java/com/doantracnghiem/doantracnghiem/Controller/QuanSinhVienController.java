package com.doantracnghiem.doantracnghiem.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.SinhVien;
import com.doantracnghiem.doantracnghiem.Service.QuanLySinhVienService;

import jakarta.servlet.http.HttpSession;


@RestController
@RequestMapping("/admin")
public class QuanSinhVienController {
    @Autowired private QuanLySinhVienService quanLySinhVienService;
    @GetMapping("/student")
    public List<SinhVien> getAllStudent(){
        return quanLySinhVienService.getAllStudent();
    }
    @GetMapping("/student/{masv}")
    public SinhVien getStudent(@PathVariable(name = "masv") String masv) {
        return quanLySinhVienService.getStudent(masv);
    }
    @GetMapping("/studentbyclass/{malop}")
    public List<SinhVien> getStudentByClass(@PathVariable(name = "malop") String malop){
        return quanLySinhVienService.getStudentByClass(malop);
    }
    @GetMapping("/student/search")
    public List<SinhVien> searchStudetnsByKeyword(@RequestParam("keyword") String keyword,@RequestParam("malop")String maLop){
        return quanLySinhVienService.searchStudetnsByKeyword(keyword,maLop);
    }
    @DeleteMapping("/student/{masv}")
    public ResponseEntity<String> deleteStudent(@PathVariable(name = "masv") String masv){
        return quanLySinhVienService.deleteStudent(masv);
    }
    @PatchMapping("/studentpassword")
    public ResponseEntity<String> updatePassword(@RequestBody Map<String,Object> passInfo){
        return quanLySinhVienService.updatePassword(passInfo);
    }
    //sinh viên cập nhật thông tin
    @PatchMapping("/student")
    public ResponseEntity<String> updateInfo(@RequestBody Map<String,Object> studentInfo,HttpSession session){
        System.out.println((String)session.getAttribute("masv"));
        return quanLySinhVienService.updateInfo(studentInfo);
    }
    // nhan vien sửa thông tin
    @PatchMapping("/mstudent/{masv}")
    public ResponseEntity<String> modifyInfo(@PathVariable(name = "masv") String masv, @RequestBody Map<String,Object> studentInfo){
            quanLySinhVienService.modifyInfo(studentInfo);
            return ResponseEntity.ok().body("Sửa thông tin thành công");
    }
    @PostMapping("/student")
    public ResponseEntity<String> addStudent(@RequestBody SinhVien sv){
        return quanLySinhVienService.addStudent(sv);
    }
}
