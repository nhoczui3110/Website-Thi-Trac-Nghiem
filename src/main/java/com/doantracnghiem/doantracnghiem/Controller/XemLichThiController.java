package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.LichThi;
import com.doantracnghiem.doantracnghiem.Service.XemLichThiService;

import jakarta.servlet.http.HttpSession;

import java.util.List;

@Controller
public class XemLichThiController {
    @Autowired
    private XemLichThiService lichThiService;
    @GetMapping("/xemlichthi")
    public String getMethodName(Model model, HttpSession session) {
        String masv = (String)session.getAttribute("masv");
        List<LichThi> lichthi = lichThiService.xemLichThi(masv);
        model.addAttribute("lichthi", lichthi);
        return "/student/show_exam_schedule";
    }
    
}
