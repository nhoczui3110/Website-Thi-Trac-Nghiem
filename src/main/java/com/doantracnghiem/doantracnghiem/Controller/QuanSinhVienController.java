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
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.SinhVien;
import com.doantracnghiem.doantracnghiem.Service.QuanLySinhVienService;


@RestController
@RequestMapping("/admin")
public class QuanSinhVienController {
    @Autowired private QuanLySinhVienService quanLySinhVienService;
    @GetMapping("/student")
    public List<SinhVien> getAllStudent(){
        System.out.println(quanLySinhVienService.getAllStudent());
        return quanLySinhVienService.getAllStudent();
    }
    @GetMapping("/student/{masv}")
    public SinhVien getStudent(@PathVariable(name = "masv") String masv) {
        return quanLySinhVienService.getStudent(masv);
    }
    @DeleteMapping("/student/{masv}")
    public ResponseEntity<String> deleteStudent(@PathVariable(name = "masv") String masv){
        System.out.println("==============loi==================");
        return quanLySinhVienService.deleteStudent(masv);
    }
    //sinh viên cập nhật thông tin
    @PatchMapping("/student")
    public int updateInfo(@RequestBody Map<String,Object> studentInfo){
        System.out.println(studentInfo.toString());
        try{
            quanLySinhVienService.updateInfo(studentInfo);
            return 1;
        }
        catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }
    // nhan vien sửa thông tin
    @PatchMapping("/mstudent/{masv}")
    public ResponseEntity<String> modifyInfo(@PathVariable(name = "masv") String masv, @RequestBody Map<String,Object> studentInfo){
        System.out.println(studentInfo.toString());
            quanLySinhVienService.modifyInfo(studentInfo);
            return ResponseEntity.ok().body("Sửa thông tin thành công");
    }
    @PostMapping("/student")
    public ResponseEntity<String> addStudent(@RequestBody SinhVien sv){
        System.out.println("den day");
        return quanLySinhVienService.addStudent(sv);
    }
}
