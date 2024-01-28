package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;
import jakarta.servlet.http.HttpSession;

@RestController
public class LecturerController {
    @Autowired
    DangNhapService service;

    @GetMapping("/lecturer/profile")
    public GiangVien getInfo(HttpSession session) {
        return service.getUserByUsernameGiangVien((String) session.getAttribute("username"));
    }
}
