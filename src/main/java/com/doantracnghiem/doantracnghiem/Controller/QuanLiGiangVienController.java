package com.doantracnghiem.doantracnghiem.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Entity.Lop;
import com.doantracnghiem.doantracnghiem.Entity.MonHoc;
import com.doantracnghiem.doantracnghiem.Service.QuanLiGiangVienService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/admin")
public class QuanLiGiangVienController {
    @Autowired
    QuanLiGiangVienService quanLiGiangVienService;

    @GetMapping("/getAllLecturer")
    public List<GiangVien> getAllGiangVien() {
        return quanLiGiangVienService.getAllGiangVien();
    }

    @GetMapping("/getAllClasses")
    public List<Lop> getAllClasses() {
        return quanLiGiangVienService.getAllClasses();
    }

    @GetMapping("/countCauHoiByMonHoc/{mamh}")
    public int countCauHoiByMonHoc(@PathVariable("mamh") String mamh) {
        return quanLiGiangVienService.countCauHoiByMonHoc(mamh);
    }

    @PostMapping("/createExam")
    public boolean createExam(@RequestBody Map<String, Object> exam) {
        // TODO: process POST request

        return quanLiGiangVienService.createExam(exam);
    }

    @DeleteMapping("/deleteLecturer")
    public boolean deleteLecturer(@RequestBody String magv) {
        System.out.println("MaGV" + magv);
        return quanLiGiangVienService.deleteLecturer(magv);
    }

    @PostMapping("/searchLecturer")
    public List<GiangVien> getMethodName(@RequestBody String keyword) {
        System.out.println("keyword: " + keyword + "keyword");
        return quanLiGiangVienService.searchLecturer(keyword);
    }

    @GetMapping("/getAllMonHoc")
    public List<MonHoc> getAllMonHoc() {
        return quanLiGiangVienService.getAllMonHoc();
    }

    @PostMapping("/addLecturer")
    public int addLecturer(@RequestBody Map<String, Object> lecturer) {
        return quanLiGiangVienService.addLecturer(lecturer);
    }
}
