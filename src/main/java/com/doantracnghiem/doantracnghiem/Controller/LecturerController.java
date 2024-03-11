package com.doantracnghiem.doantracnghiem.Controller;

import java.util.List;
import java.util.Map;

import org.apache.catalina.connector.Response;
// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.DTO.ThiInfoDTO;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.DangKyThi;
import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Service.QuestionService;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;
import com.doantracnghiem.doantracnghiem.Service.TableGiangVien;
import com.doantracnghiem.doantracnghiem.Service.UpdateGiangVien;
import com.doantracnghiem.doantracnghiem.Service.XemDiemService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/lecturer")
public class LecturerController {
    private int pageSize = 8;
    @Autowired
    DangNhapService dangNhapService;

    @Autowired
    UpdateGiangVien updateGiangVien;

    @Autowired
    QuestionService questionService;

    @Autowired
    TableGiangVien tableGiangVien;

    @Autowired
    XemDiemService xemDiemService;

    @GetMapping("/profile")
    public GiangVien getInfo(HttpSession session) {
        return dangNhapService.getUserByUsernameGiangVien((String) session.getAttribute("username"));
    }

    @PatchMapping("/update-profile/{maGv}")
    public String updatingProfile(@PathVariable("maGv") String maGv, @RequestBody Map<String, Object> updateInfo) {
        updateGiangVien.updateGiangVien(maGv, updateInfo);
        return "Thay doi thanh cong";
    }

    @GetMapping("/getSubjectByLecturer/{maGv}")
    public List<Object[]> getSubjectByLecturer(@PathVariable("maGv") String maGv) {
        return tableGiangVien.getMonHoc(maGv);
    }

    @GetMapping("/CountQuestionBySubjectAndLecturer/{magv}/{mamh}")
    public double getNumOfQuestion(@PathVariable("magv") String maGv,
            @PathVariable("mamh") String maMh) {
        double maxPage = Math
                .ceil((double) tableGiangVien.getCountQuestionByMonHocAndLecturer(maGv, maMh) / (double) pageSize);
        return maxPage;
    }

    @GetMapping("/questionManagement/{magv}/{mamh}/{page}")
    public List<Object[]> questionManagement(@PathVariable("magv") String magv, @PathVariable("mamh") String mamh,
            @PathVariable("page") int pageNumber) {
        return tableGiangVien.getCauHoiByMaGvAndMaMh(magv, mamh, pageNumber, pageSize);
    }

    @GetMapping("/questionDetail/{maCauHoi}")
    public List<Object[]> getLuaChonByMaCauHoi(@PathVariable("maCauHoi") int maCauHoi) {
        return tableGiangVien.getLuaChocByMaCauHoi(maCauHoi);
    }

    @DeleteMapping("/deleteQuestion/{maCauHoi}")
    public String deleteQuestion(@PathVariable("maCauHoi") Integer maCauHoi) {
        return questionService.deleteQuestion(maCauHoi);
    }

    @DeleteMapping("/deleteSelection/{maCauHoi}/{maLuaChon}")
    public int deleteSelection(@PathVariable("maLuaChon") Integer maLuaChon,
            @PathVariable("maCauHoi") Integer maCauHoi) {
        return questionService.deleteSelection(maLuaChon, maCauHoi);
    }

    @PostMapping("/searchCauHoi/{magv}/{page}")
    public List<Object[]> searchCauHoi(@RequestBody String keyword,
            @PathVariable("magv") String magv,
            @PathVariable("page") int pageNumber) {
        List<Object[]> list = tableGiangVien.searchCauHoi(magv, pageNumber, pageSize, keyword);
        return list;
    }

    @PostMapping("/addQuestion/{magv}")
    public ResponseEntity<String> addQuestion(@PathVariable("magv") String magv,
            @RequestBody Map<String, Object> question) {
        questionService.addQuestion(magv, question);
        return ResponseEntity.ok("Add question successfully");
    }

    @PatchMapping("/updateQuestion/{maGv}/{maCauHoi}")
    public ResponseEntity<String> updateQuestion(@PathVariable("maCauHoi") int maCauHoi,
            @RequestBody Map<String, Object> question, @PathVariable("maGv") String maGv) {
        questionService.updateQuestion(maCauHoi, question, maGv);
        return ResponseEntity.ok("Add question successfully");
    }

    @PostMapping("/addSelection/{maCauHoi}")
    public ResponseEntity<String> addSelection(@PathVariable("maCauHoi") Integer maCauHoi,
            @RequestBody Map<String, Object> selection) {
        questionService.addSelection(maCauHoi, selection);
        return ResponseEntity.ok("Add question successfully");
    }

    @GetMapping("/getDiemSinhVien/{iddk}")
    public List<ThiInfoDTO> getDiemSinhVien(@PathVariable("iddk") int iddk) {
        return xemDiemService.getThiInfoFromIddk(iddk);
    }

    // @GetMapping("/finding/{magv}/{keyword}")
    // public double getMaxPageFinding(@PathVariable("magv") String maGv,
    // @PathVariable("keyword") String keyword) {
    // System.out.println("vo day");
    // double maxPage = Math.ceil((double)
    // tableGiangVien.getCountCauHoiByFinding(maGv, keyword) / (double) pageSize);
    // return maxPage;
    // }
    @PostMapping("/countCauHoiByFinding/{magv}")
    public double getMaxPageFinding(@PathVariable("magv") String maGv, @RequestBody String keyword) {
        System.out.println("maGv: " + maGv);
        System.out.println("keyword: " + keyword);
        double maxPage = Math.ceil((double) tableGiangVien.getCountCauHoiByFinding(maGv, keyword) / (double) pageSize);
        return maxPage;
    }

    @GetMapping("/getDangKyThi/{maGv}/{malop}")
    public List<DangKyThi> getDangKyThi(@PathVariable("maGv") String maGv, @PathVariable("malop") String malop) {
        return xemDiemService.getListDangKyThi(maGv, malop);
    }

    @GetMapping("/getMaLop/{maGv}")
    public List<String> getMalop(@PathVariable("maGv") String maGv) {
        return xemDiemService.getMaLop(maGv);
    }

    @GetMapping("/canEditOrDeleteCauHoi/{idch}")
    public boolean canEditOrDeleteCauHoi(@PathVariable("idch") int idch) {
        return questionService.canEditOrDelete(idch);
    }

    // @GetMapping("/getQuestionBySubject/{maGv}")
    // public List<Object[]> getQuestionBySubject(@PathVariable("maGv") String maGv)
}
