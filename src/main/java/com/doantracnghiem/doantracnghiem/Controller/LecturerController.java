package com.doantracnghiem.doantracnghiem.Controller;

import java.util.Map;
// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;
import com.doantracnghiem.doantracnghiem.Service.UpdateGiangVien;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lecturer")
public class LecturerController {
    @Autowired
    DangNhapService dangNhapService;

    @Autowired
    UpdateGiangVien updateGiangVien;

    @GetMapping("/profile")
    public GiangVien getInfo(HttpSession session) {
        return dangNhapService.getUserByUsernameGiangVien((String) session.getAttribute("username"));
    }

    @PatchMapping("/update-profile/{maGv}")
    public String updatingProfile(@PathVariable("maGv") String maGv, @RequestBody Map<String, Object> updateInfo) {
        updateGiangVien.updateGiangVien(maGv, updateInfo);
        return "Thay doi thanh cong";
    }
}
