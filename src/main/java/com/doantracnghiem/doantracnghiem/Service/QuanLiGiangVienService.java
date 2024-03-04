package com.doantracnghiem.doantracnghiem.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

import javax.swing.text.html.parser.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.EntityResponse;

import com.doantracnghiem.doantracnghiem.Entity.DangKyThi;
import com.doantracnghiem.doantracnghiem.Entity.DayHoc;
import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Entity.Lop;
import com.doantracnghiem.doantracnghiem.Entity.MonHoc;
import com.doantracnghiem.doantracnghiem.Repository.CauHoiRepository;
import com.doantracnghiem.doantracnghiem.Repository.DangKyThiRepository;
import com.doantracnghiem.doantracnghiem.Repository.DayHocRepository;
import com.doantracnghiem.doantracnghiem.Repository.GiangVienRepository;
import com.doantracnghiem.doantracnghiem.Repository.LopRepository;
import com.doantracnghiem.doantracnghiem.Repository.MonHocRepository;
import com.doantracnghiem.doantracnghiem.Repository.ThiRepository;

@Service
public class QuanLiGiangVienService {
    @Autowired
    private GiangVienRepository giangVienRepository;
    @Autowired
    private LopRepository lopRepository;
    @Autowired
    private CauHoiRepository cauHoiRepository;
    @Autowired
    private DangKyThiRepository dangKyThiRepository;
    @Autowired
    private ThiRepository thiRepository;
    @Autowired
    private MonHocRepository monHocRepository;
    @Autowired
    private DayHocRepository dayHocRepository;

    public List<GiangVien> getAllGiangVien() {
        return giangVienRepository.findAllGvWithoutDelete();
    }

    public List<Lop> getAllClasses() {
        return lopRepository.findAll();
    }

    public int countCauHoiByMonHoc(String mamh) {
        return cauHoiRepository.countCauHoiByMonHoc(mamh);
    }

    public boolean createExam(Map<String, Object> examInfo) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        DangKyThi dangKyThi = new DangKyThi();
        dangKyThi.setMaLop((String) examInfo.get("maLop"));
        dangKyThi.setMagv((String) examInfo.get("maGv"));
        dangKyThi.setManv((String) examInfo.get("maNv"));
        dangKyThi.setSoCau((Integer.parseInt((String) examInfo.get("soCau"))));
        dangKyThi.setThoiLuong(Integer.parseInt((String) examInfo.get("thoiGianThi")));
        dangKyThi.setTrangThaiXoa(false);
        dangKyThi.setMamh((String) examInfo.get("maMh"));
        try {
            LocalDate date = LocalDate.parse((String) examInfo.get("ngayThi"), formatter);
            dangKyThi.setNgayThi(date);
        } catch (DateTimeParseException e) {
            System.out.println("Không thể chuyển đổi chuỗi thành LocalDate: " + e.getMessage());
        }
        int lanThi = (dangKyThiRepository.findByMaLopAndMamh((String) examInfo.get("maLop"),
                (String) examInfo.get("maMh"))).size() + 1;
        dangKyThi.setLan(lanThi);
        DangKyThi temp = dangKyThiRepository.save(dangKyThi);
        thiRepository.insertThiByIddk(temp.getIddk());
        return true;
    }

    public boolean deleteLecturer(String magv) {
        GiangVien gv = giangVienRepository.findById(magv).orElse(null);
        if (gv != null) {
            gv.setTrangThaiXoa(true);
            giangVienRepository.save(gv);
            return true;
        }
        return false;
    }

    public List<GiangVien> searchLecturer(String keyword) {
        return giangVienRepository.searchGiangVien(keyword);
    }

    public List<MonHoc> getAllMonHoc() {
        return monHocRepository.findAllMonHoc();
    }

    // 0 la success, 1 la trung username, 2 la trung id
    @SuppressWarnings("null")
    public Integer addLecturer(Map<String, Object> lecturer) {
        GiangVien checkUsername = giangVienRepository.findByUserName((String) lecturer.get("username"));
        GiangVien checkId = giangVienRepository.findById((String) lecturer.get("magv")).orElse(null);
        if (checkUsername != null) {
            return 1;
        } else if (checkId != null) {
            return 2;
        }
        GiangVien giangVien = new GiangVien();
        boolean gender = ((int) lecturer.get("gender") != 0);
        giangVien.setGioiTinh(gender);
        giangVien.setHo((String) lecturer.get("lastname"));
        giangVien.setTen((String) lecturer.get("firstname"));
        giangVien.setPassWord((String) lecturer.get("password"));
        giangVien.setHocHam((String) lecturer.get("hocham"));
        giangVien.setHocVi((String) lecturer.get("hocvi"));
        giangVien.setTrangThaiXoa(false);
        giangVien.setMaGv((String) lecturer.get("magv"));
        giangVien.setUserName((String) lecturer.get("username"));
        giangVienRepository.save(giangVien);

        try {
            List<String> subjects = (List) lecturer.get("subjects");
            for (int i = 0; i < subjects.size(); i++) {
                DayHoc dh = new DayHoc();
                dh.setMagv((String) lecturer.get("magv"));
                dh.setMamh((String) subjects.get(i));
                dh.setTrangThaiXoa(false);
                dayHocRepository.save(dh);
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }

        return 0;
    }

    public void deleteMonHocGiangVien(int iddh) {
        DayHoc dayhoc = dayHocRepository.findById(iddh).orElse(null);
        if (dayhoc != null) {
            dayHocRepository.delete(dayhoc);
        }
    }

    public ResponseEntity<String> updateGiangVien(Map<String, Object> lecturer) {
        GiangVien giangVien = giangVienRepository.findById((String) lecturer.get("magv")).orElse(null);
        if (giangVien != null) {
            boolean gender = ((int) lecturer.get("gender") != 0);
            giangVien.setGioiTinh(gender);
            giangVien.setHo((String) lecturer.get("lastname"));
            giangVien.setTen((String) lecturer.get("firstname"));
            giangVien.setHocHam((String) lecturer.get("hocham"));
            giangVien.setHocVi((String) lecturer.get("hocvi"));
            giangVien.setTrangThaiXoa(false);
            giangVien.setMaGv((String) lecturer.get("magv"));
            giangVienRepository.save(giangVien);
            try {
                List<Map<String, Object>> subjects = (List) lecturer.get("subjects");
                for (int i = 0; i < subjects.size(); i++) {
                    Map<String, Object> temp = subjects.get(i);
                    int iddh = (int) temp.get("iddh");
                    if (iddh != 0) {
                        DayHoc dayHoc = dayHocRepository.findById(iddh).orElse(null);
                        dayHoc.setMamh((String) temp.get("mamh"));
                        dayHocRepository.save(dayHoc);
                    } else {
                        DayHoc dayHoc = new DayHoc();
                        dayHoc.setMagv((String) lecturer.get("magv"));
                        dayHoc.setMamh((String) temp.get("mamh"));
                        dayHoc.setTrangThaiXoa(false);
                        dayHocRepository.save(dayHoc);
                    }
                }

                return ResponseEntity.status(HttpStatus.OK).body("Cập nhật dữ liệu thành công");
            } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
            }
        }

        return ResponseEntity.status(HttpStatus.OK).body("Cập nhật dữ liệu không thành công");
    }
}
