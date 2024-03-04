package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.InfoDTO;
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
    @ModelAttribute("sinhvien")
    public SinhVien getSinhVien(HttpSession session){
        session.setAttribute("masv", "N21DCCN067");//
        String sv = (String)session.getAttribute("masv");
        return sinhVienService.getSinhVienInfo(sv);
    }
    @GetMapping("/main-student")
    public String main_student(Model model, HttpSession session) {
        session.setAttribute("masv", "N21DCCN067");//
        String masv = (String)session.getAttribute("masv");
        List<InfoDTO> lichthi = lichThiService.xemLichThi(masv);
        List<InfoDTO> diem = xemDiemThiService.xemDiemThi(masv);
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
        List<Integer> dap_an = new ArrayList<>();
        DanhSachCauHoiThiDTO list = cauHoiThiService.layCauHoiThi(maMH, soCau,IDTHI,dap_an);
        InfoDTO thongTinThi = new InfoDTO(IDTHI, lanThi, soCau, thoiLuong, tenMh, ngayThi);
        model.addAttribute("thongTinThi", thongTinThi);
        model.addAttribute("danhsachch", list);
        session.setAttribute("dapan"+IDTHI, dap_an);
        return "/student/thi";
    }
    @PostMapping("/ketqua")
    @SuppressWarnings("unchecked")
    public RedirectView tmp(@ModelAttribute DanhSachCauHoiThiDTO danhSach,HttpSession session,RedirectAttributes redirect){
        int idThi = danhSach.getIdThi();
        List<Integer> dap_an = (List<Integer>)session.getAttribute("dapan" + idThi);
        session.removeAttribute("dapan"+idThi);
        cauHoiThiService.chenDapAn(danhSach, dap_an);
        cauHoiThiService.luuCauHoiThi(danhSach);
        redirect.addAttribute("idThi",idThi);
        return new RedirectView("xemketqua");
    }
    @GetMapping("/xemketqua")
    public String xemKetQua(@RequestParam(name = "idThi") int idThi,Model model){
        InfoDTO kq = ketQuaThiService.layKetQua(idThi);
        DanhSachCauHoiThiDTO danhSach = ketQuaThiService.layDanhSachCauHoiThi(idThi);
        model.addAttribute("thongTinKq", kq);
        model.addAttribute("danhsach", danhSach);
        return "/student/exam-result"; 
    }
}   
