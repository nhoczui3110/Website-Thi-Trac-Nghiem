package com.doantracnghiem.doantracnghiem.Service;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Entity.SinhVien;
import com.doantracnghiem.doantracnghiem.Repository.SinhVienRepository;
import com.doantracnghiem.doantracnghiem.Repository.ThiRepository;

@Service
public class QuanLySinhVienService {
    @Autowired
    private SinhVienRepository sinhVienRepository;
    @Autowired 
    private ThiRepository thiRepository;
    public List<SinhVien> getAllStudent(){
        return sinhVienRepository.getAllStudent();
    }
    public SinhVien getStudent(String masv){
        return sinhVienRepository.findSinhVienByMasv(masv);
    }
    public void updateInfo(Map<String,Object> studentInfo){
        sinhVienRepository.updateInfo((String)studentInfo.get("masv"),
                                      (String)studentInfo.get("ho"),
                                      (String)studentInfo.get("ten"), 
                                      Boolean.parseBoolean((String)studentInfo.get("gioiTinh")),
                                      (String)studentInfo.get("diaChi"),
                                      Date.valueOf(String.valueOf(studentInfo.get("ngaySinh"))),
                                      (String)studentInfo.get("passWord"));
    }
    public void modifyInfo(Map<String,Object> studentInfo){
        System.out.println("hello");
        Date ngaySinh = Date.valueOf(LocalDate.parse((String)studentInfo.get("ngaySinh"), DateTimeFormatter.ISO_DATE));
        // LocalDate ngaySinh = LocalDate.parse((String)studentInfo.get("ngaySinh"), DateTimeFormatter.ISO_DATE);
        System.out.println("ngay sinh ==========="+ngaySinh.toString());
        sinhVienRepository.modifyInfo((String)studentInfo.get("masv"),
                                      (String)studentInfo.get("ho"),
                                      (String)studentInfo.get("ten"), 
                                      (Boolean)studentInfo.get("gioiTinh"),
                                      (String)studentInfo.get("diaChi"),
                                      ngaySinh);
    }
    public ResponseEntity<String> addStudent(SinhVien sv){
        if (sinhVienRepository.findSinhVienByMasv(sv.getMasv()) != null){
            return ResponseEntity.ok().body("Mã sinh viên đã tồn tại trong cơ sở dữ liệu");
        }
        if(sinhVienRepository.findSinhVienByUserName(sv.getUserName())!=null){
            return ResponseEntity.ok().body("User name đã tồn tại trong cơ sở dữ liệu");
        }
        sinhVienRepository.save(sv);
        return ResponseEntity.ok().body("Lưu thành công");
    }
    public ResponseEntity<String> deleteStudent(String masv){
        if(thiRepository.checkExsitsThi(masv).size()>0){
            return ResponseEntity.badRequest().body("SINH VIÊN ĐÃ ĐĂNG KÝ THI KHÔNG THỂ XÓA");
        }
        sinhVienRepository.deleteStudent(masv);
        return ResponseEntity.ok().body("Xóa thành công");
    }
}
