package com.doantracnghiem.doantracnghiem.Service;

import java.sql.Date;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @Autowired
    private DangKyService dangKyService;
    public List<SinhVien> getAllStudent(){
        return sinhVienRepository.getAllStudent();
    }
    public SinhVien getStudent(String masv){
        return sinhVienRepository.findSinhVienByMasv(masv);
    }
    public List<SinhVien> getStudentByClass(String malop){
        return sinhVienRepository.getStudentByClass(malop);
    }
    public List<SinhVien> searchStudetnsByKeyword(String keyword,String maLop){
        return sinhVienRepository.searchStudetnsByKeyword(keyword,maLop);
    }
    public ResponseEntity<String> updatePassword(Map<String,Object> passInfo){
        String password =sinhVienRepository.getOldPassword(String.valueOf(passInfo.get("masv")));
        if(!password.equals(String.valueOf(passInfo.get("password"))))
        return ResponseEntity.ok().body("Sai mật khẩu");
        sinhVienRepository.updatePassword((String) passInfo.get("masv"),
                                            (String) passInfo.get("newPassword"));
         return ResponseEntity.ok().body("Thành công");
    }
    public ResponseEntity<String> updateInfo(Map<String,Object> studentInfo){
        String masv = (String)studentInfo.get("masv");
        String ho = (String)studentInfo.get("ho");
        String ten =  (String)studentInfo.get("ten");
        Boolean gioiTinh =  Boolean.parseBoolean((String)studentInfo.get("gioiTinh"));
        String diachi =  (String)studentInfo.get("diaChi");
        Date ngaySinh =  Date.valueOf(String.valueOf(studentInfo.get("ngaySinh")));
        if(masv.trim().equals(""))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mã sinh viên trống");
        if(ho.trim().equals(""))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Họ của sinh viên trống");    
        if(ten.trim().equals(""))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tên của sinh viên trống"); 
        if(diachi.trim().equals(""))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Địa chỉ của sinh viên trống"); 
        if(getStudent(masv) == null)
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mã sinh viên không tồn tại");
        try{
            sinhVienRepository.updateInfo(masv,ho,ten,gioiTinh,diachi,ngaySinh);
            return ResponseEntity.ok().body("Cập nhật thành công");
        }catch(Exception ex){
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cập nhật thất bại");
        }
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
        if(dangKyService.checkExistUserName(sv.getUserName())==true){
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
