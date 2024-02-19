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
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.KetQuaThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.LichThi;
import com.doantracnghiem.doantracnghiem.Entity.SinhVien;
import com.doantracnghiem.doantracnghiem.Service.CauHoiThiService;
import com.doantracnghiem.doantracnghiem.Service.KetQuaThiService;
import com.doantracnghiem.doantracnghiem.Service.SinhVienService;
import com.doantracnghiem.doantracnghiem.Service.XemDiemThiService;
import com.doantracnghiem.doantracnghiem.Service.XemLichThiService;

import jakarta.servlet.http.HttpSession;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Controller
public class ThiController {
    @Autowired
    private XemLichThiService lichThiService;
    @Autowired
    private XemDiemThiService xemDiemThiService;
    @Autowired
    private CauHoiThiService cauHoiThiService;
    @Autowired
    private SinhVienService sinhVienService;
    @Autowired 
    private KetQuaThiService ketQuaThiService;
    // @ModelAttribute("ketqua")
    @GetMapping("/main-student")
    public String main_student(Model model, HttpSession session) {
        System.out.println('s');
        session.setAttribute("masv", "N21DCCN067");
        String masv = (String)session.getAttribute("masv");
        List<LichThi> lichthi = lichThiService.xemLichThi(masv);
        List<Diem> diem = xemDiemThiService.xemDiemThi(masv);
        SinhVien sv = sinhVienService.getSinhVienInfo(masv);
        model.addAttribute("sv", sv);
        // model.addAttribute("masv", masv);
        model.addAttribute("lichthi", lichthi);
        model.addAttribute("diemthi", diem);
        return "/student/main-student";
    }
    @PostMapping("/thi")
    public String thi(@RequestParam(name = "idthi")Integer IDTHI,
    @RequestParam(name = "mamh")String maMH,
    @RequestParam(name = "tenmh")String tenMh,
    @RequestParam(name = "ngaythi")Date ngayThi,
    @RequestParam(name = "lanthi") Integer lanThi,
    @RequestParam(name = "socau")Integer soCau,
    @RequestParam(name = "thoiluong") Integer thoiLuong,
    HttpSession session,
    Model model){
        System.out.println("====================");
        System.out.println(maMH);
        System.out.println(IDTHI);
        System.out.println("====================");
        List<Integer> dap_an = new ArrayList<>();
        DanhSachCauHoiThiDTO list = cauHoiThiService.layCauHoiThi(maMH, soCau,IDTHI,dap_an);
        model.addAttribute("idthi", IDTHI);
        model.addAttribute("tenmh",tenMh);
        model.addAttribute("ngaythi",ngayThi);
        model.addAttribute("lanthi",lanThi);
        model.addAttribute("socau",soCau);
        model.addAttribute("thoiluong",thoiLuong);
        model.addAttribute("danhsachch", list);
        session.setAttribute("tenmh",tenMh);
        session.setAttribute("ngaythi",ngayThi);
        session.setAttribute("lanthi",lanThi);
        session.setAttribute("socau",soCau);
        session.setAttribute("thoiluong",thoiLuong);
        session.setAttribute("danhsachch", list);
        session.setAttribute("dapan", dap_an);
        return "/student/thi";
    }
    @PostMapping("/ketqua")
    @SuppressWarnings("unchecked")
    public String tmp(@ModelAttribute DanhSachCauHoiThiDTO danhSach,HttpSession session,Model model){
        List<Integer> dap_an = (List<Integer>)session.getAttribute("dapan");
        cauHoiThiService.chenDapAn(danhSach, dap_an);
        float diem = cauHoiThiService.luuCauHoiThi(danhSach);
        String tenMh = (String)session.getAttribute("tenmh");
        Date ngayThi = (Date) session.getAttribute("ngaythi");
        int lanThi = (int) session.getAttribute("lanthi");
        int soCau = (int) session.getAttribute("socau");
        int thoiLuong = (int) session.getAttribute("thoiluong");
        
        session.removeAttribute("dapan");
        session.removeAttribute("tenmh");
        session.removeAttribute("ngaythi");
        session.removeAttribute("lanthi");
        session.removeAttribute("socau");
        session.removeAttribute("thoiluong");


        model.addAttribute("tenmh",tenMh);
        model.addAttribute("ngaythi",ngayThi);
        model.addAttribute("lanthi",lanThi);
        model.addAttribute("socau",soCau);
        model.addAttribute("thoiluong",thoiLuong);
        model.addAttribute("danhsach", danhSach);
        model.addAttribute("diem", diem);
        return "/student/exam-result";
    }
    @GetMapping("/xemketqua")
    public String xemKetQua(@RequestParam(name = "idThi") int idThi,Model model){
        KetQuaThiDTO kq = cauHoiThiService.layKetQua(idThi);
        model.addAttribute("tenmh",kq.getTenMh());
        model.addAttribute("ngaythi",kq.getNgayThi());
        model.addAttribute("lanthi",kq.getLan());
        model.addAttribute("socau",kq.getSoCau());
        model.addAttribute("thoiluong",kq.getThoiLuong());
        model.addAttribute("diem", kq.getDiem());
        DanhSachCauHoiThiDTO danhSach = ketQuaThiService.layDanhSachCauHoiThi(idThi);
        model.addAttribute("danhsach", danhSach);
        return "/student/exam-result"; 
    }
}   
