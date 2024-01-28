package com.doantracnghiem.doantracnghiem.Controller;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.doantracnghiem.doantracnghiem.Repository.NhanVienRepository;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;

import jakarta.persistence.EntityManager;
import jakarta.servlet.http.HttpSession;

import org.springframework.ui.Model;

// import ch.qos.logback.core.model.Model;

@Controller
public class MyController {
    @Autowired
    private DangNhapService dangNhapService;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/student")
    public String student(HttpSession session) {
        if ((String) session.getAttribute("username") != null && (Integer) session.getAttribute("type") == 2) {
            return "student";
        }
        return "redirect:/login";
    }

    @GetMapping("/admin")
    public String admin(HttpSession session) {
        if ((String) session.getAttribute("username") != null && (Integer) session.getAttribute(("type")) == 0) {
            return "admin";
        }
        return "redirect:/login";
    }

    @GetMapping("/lecturer")
    public String lecturer(HttpSession session) {
        if ((String) session.getAttribute("username") != null && (Integer) session.getAttribute("type") == 1) {
            return "lecturer";
        }
        return "redirect:/login";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("username");
        session.removeAttribute("type");
        return "redirect:/login";
    }

    // Kiem tra dang nhap
    @PostMapping("/login")
    public String postLogin(
            @RequestParam(name = "username", defaultValue = "") String username,
            @RequestParam(name = "password", defaultValue = "") String password,
            @RequestParam(name = "remember", defaultValue = "off") String isRemember,
            Model model, HttpSession session) {
        Integer check = dangNhapService.checkAccount(username, password);

        if (check == -1) {
            // Account not found
            System.out.println("Khong ton tai");
            model.addAttribute("error", "Tên đăng nhập hoặc mật khẩu không đúng");
            return "login";
        } else if (check == 0) {
            session.setAttribute("username", username);
            session.setAttribute("type", 0);
            System.out.println("Nhan Vien");

            return "redirect:/admin";
        } else if (check == 1) {
            session.setAttribute("username", username);
            session.setAttribute("type", 1);
            System.out.println("Giang Vien");
            return "redirect:/lecturer";
        } else if (check == 2) {
            session.setAttribute("username", username);
            session.setAttribute("type", 2);
            return "redirect:/student";
        } else {
            return "login";
        }
    }
}
