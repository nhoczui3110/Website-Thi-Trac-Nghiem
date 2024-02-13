package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.Diem;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.KetQua;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.LichThi;
import com.doantracnghiem.doantracnghiem.Service.CauHoiThiService;
import com.doantracnghiem.doantracnghiem.Service.XemDiemThiService;
import com.doantracnghiem.doantracnghiem.Service.XemLichThiService;

import jakarta.servlet.http.HttpSession;

import java.sql.Date;
import java.util.List;

@Controller
public class ThiController {
    @Autowired
    private XemLichThiService lichThiService;
    @Autowired
    private XemDiemThiService xemDiemThiService;
    @Autowired
    private CauHoiThiService cauHoiThiService;
    // @ModelAttribute("ketqua")
    public KetQua getKetQua(Integer number){
        System.out.println("avnca");
        return new KetQua(number);
    }
    @GetMapping("/main-student")
    public String main_student(Model model, HttpSession session) {
        System.out.println('s');
        session.setAttribute("masv", "N21DCCN067");
        String masv = (String)session.getAttribute("masv");
        List<LichThi> lichthi = lichThiService.xemLichThi(masv);
        List<Diem> diem = xemDiemThiService.xemDiemThi(masv);
        model.addAttribute("lichthi", lichthi);
        model.addAttribute("diemthi", diem);
        return "/student/main-student";
    }
    @PostMapping("/thi")
    public String thi(@RequestParam(name = "idthi")Integer IDTHI,
    @RequestParam(name = "mamh")String maMH,
    @RequestParam(name = "tenmh")String tenMh,
    @RequestParam(name = "ngaythi")Date ngayThi,
    @RequestParam(name = "lanthi") String lanThi,
    @RequestParam(name = "socau")Integer soCau,
    @RequestParam(name = "thoiluong") Integer thoiLuong,
    HttpSession session,
    Model model){
        System.out.println("====================");
        System.out.println(maMH);
        System.out.println(IDTHI);
        System.out.println("====================");
        KetQua tmp = getKetQua(soCau);
        DanhSachCauHoiThiDTO list = cauHoiThiService.layCauHoiThi(maMH, soCau,IDTHI);
        model.addAttribute("idthi", IDTHI);
        model.addAttribute("tenmh",tenMh);
        model.addAttribute("ngaythi",ngayThi);
        model.addAttribute("lanthi",lanThi);
        model.addAttribute("socau",soCau);
        model.addAttribute("thoiluong",thoiLuong);
        model.addAttribute("danhsachch", list);
        model.addAttribute("ketqua", tmp);
        session.setAttribute("danhsachch", list);
        return "/student/thi";
    }
    // @PostMapping("/ketqua")
    // public String xemKetQua(@ModelAttribute("ketqua") KetQua ketqua,HttpSession session)
    // {
    //     DanhSachCauHoiThiDTO list = (DanhSachCauHoiThiDTO)session.getAttribute("danhsachch");
    //     list.showTest();
    //     ketqua.show();   
    //     return "/student/exam-result";
    // }
    @PostMapping("/ketqua")
    public String tmp(@ModelAttribute DanhSachCauHoiThiDTO danhSach){
        cauHoiThiService.luuCauHoiThi(danhSach);
        danhSach.showTest();
        return "/student/exam-result";
    }
}   
