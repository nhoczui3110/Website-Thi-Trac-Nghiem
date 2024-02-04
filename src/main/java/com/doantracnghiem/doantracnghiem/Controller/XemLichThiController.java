package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.Diem;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.LichThi;
import com.doantracnghiem.doantracnghiem.Service.XemDiemThiService;
import com.doantracnghiem.doantracnghiem.Service.XemLichThiService;

import jakarta.servlet.http.HttpSession;

import java.util.List;

@Controller
public class XemLichThiController {
    @Autowired
    private XemLichThiService lichThiService;
    @Autowired
    private XemDiemThiService xemDiemThiService;
    @GetMapping("/main-student")
    public String main_student(Model model, HttpSession session) {
        session.setAttribute("masv", "N21DCCN067");
        String masv = (String)session.getAttribute("masv");
        List<LichThi> lichthi = lichThiService.xemLichThi(masv);
        List<Diem> diem = xemDiemThiService.xemDiemThi(masv);
        model.addAttribute("lichthi", lichthi);
        model.addAttribute("diemthi", diem);
        return "/student/main-student";
    }

}
