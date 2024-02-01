package com.doantracnghiem.doantracnghiem.Controller;

import java.util.List;
import java.util.Map;
// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Service.CauHoiService;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;
import com.doantracnghiem.doantracnghiem.Service.TableGiangVien;
import com.doantracnghiem.doantracnghiem.Service.UpdateGiangVien;

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
    CauHoiService cauHoiService;

    @Autowired
    TableGiangVien tableGiangVien;

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
        return cauHoiService.deleteQuestion(maCauHoi);
    }
    // @GetMapping("/getQuestionBySubject/{maGv}")
    // public List<Object[]> getQuestionBySubject(@PathVariable("maGv") String maGv)
}
