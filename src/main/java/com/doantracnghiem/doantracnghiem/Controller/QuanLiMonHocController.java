package com.doantracnghiem.doantracnghiem.Controller;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.MonHoc;
import com.doantracnghiem.doantracnghiem.Service.QuanLiGiangVienService;
import com.doantracnghiem.doantracnghiem.Service.QuanLyMonHocService;

@RequestMapping("/admin")
@RestController
public class QuanLiMonHocController {
    @Autowired
    QuanLyMonHocService quanLyMonHocService;

    // @GetMapping("/getMonHoc")
    // public List<MonHoc> getMonHoc() {
    // return quanLiGiangVienService.getAllMonHoc();
    // }
    @DeleteMapping("/deleteMonHoc/{mamh}")
    public void deleteMonHoc(@PathVariable("mamh") String mamh) {
        quanLyMonHocService.deleteMonHoc(mamh);
    }

    @PostMapping("/searchMonHoc")
    public List<MonHoc> searchMonHoc(@RequestBody String keyword) {
        System.out.println(keyword);
        return quanLyMonHocService.searchMonHoc(keyword);
    }

    @PostMapping("/addMonHoc")
    public int addMonHoc(@RequestBody Map<String, Object> monHoc) {
        return quanLyMonHocService.addMonHoc(monHoc);
    }

    @PatchMapping("/updateMonHoc")
    public int updateMonHoc(@RequestBody Map<String, Object> monHoc) {
        System.out.println("vo day");
        return quanLyMonHocService.updateMonHoc(monHoc);
    }

}
