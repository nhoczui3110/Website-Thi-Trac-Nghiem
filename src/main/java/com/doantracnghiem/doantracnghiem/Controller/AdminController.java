package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.jms.JmsProperties.Listener.Session;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.NhanVien;
import com.doantracnghiem.doantracnghiem.Service.AdminService;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    AdminService adminService;
    @Autowired
    DangNhapService dangNhapService;

    @GetMapping("/getAdminInfo")
    public NhanVien getAdminInfo(HttpSession session) {
        return dangNhapService.getUserByUsernameNhanVien((String) session.getAttribute("username"));
    }
}
