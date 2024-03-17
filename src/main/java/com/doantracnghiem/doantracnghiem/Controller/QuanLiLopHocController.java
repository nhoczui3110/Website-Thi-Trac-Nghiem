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

import com.doantracnghiem.doantracnghiem.Entity.Lop;
import com.doantracnghiem.doantracnghiem.Service.QuanLyLopHocService;

@RestController
@RequestMapping("admin/")
public class QuanLiLopHocController {
    @Autowired
    private QuanLyLopHocService quanLyLopHocService;
    @GetMapping("/class")
    public List<Lop> getAllClass(){
        return quanLyLopHocService.getAllClass();
    }
    @GetMapping("/class/{malop}")
    public Lop getClassById(@PathVariable("malop") String malop){
        return quanLyLopHocService.getClassById(malop);
    }
    @GetMapping("/class/search")
    public List<Lop> searchLopHoc(@RequestParam(value = "keyword",defaultValue = "",required = false) String keyword){
        return quanLyLopHocService.getAllClassByKeyword(keyword);
    }
    @PatchMapping("/class")
    public ResponseEntity<String> updateInfo(@RequestBody Map<String,Object> lop){
        return quanLyLopHocService.updateInfo(lop);
    }
    @DeleteMapping("/class/{malop}")
    public ResponseEntity<String> delelteClass(@PathVariable("malop") String malop){
        return quanLyLopHocService.deleteClass(malop);
    }
    @PostMapping("/class")
    public ResponseEntity<String> addNewClass(@RequestBody Lop lophoc){
       return quanLyLopHocService.addNewClass(lophoc);
    }
}
