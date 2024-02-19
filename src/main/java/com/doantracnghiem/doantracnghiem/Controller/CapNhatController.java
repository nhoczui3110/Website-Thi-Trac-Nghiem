package com.doantracnghiem.doantracnghiem.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.doantracnghiem.doantracnghiem.Service.SinhVienService;

class UserInfo {
    private String masv;
    private String ho;
    private String ten;
    private String gioiTinh;
    private String diaChi;

    // Các getter và setter

    public String getMasv() {
        return masv;
    }

    public void setMasv(String masv) {
        this.masv = masv;
    }

    public String getHo() {
        return ho;
    }

    public void setHo(String ho) {
        this.ho = ho;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    @Override
    public String toString() {
        return "UserInfo [masv=" + masv + ", ho=" + ho + ", ten=" + ten + ", gioiTinh=" + gioiTinh + ", diaChi="
                + diaChi + "]";
    }
    
}
@RestController
public class CapNhatController {
    @Autowired
    private SinhVienService sVienService;
    @PostMapping("/api/updateInfo")
    public String updateInfo(@RequestBody UserInfo userInfo) {
        System.out.println("update");
        // Xử lý thông tin người dùng ở đây (ví dụ: lưu vào cơ sở dữ liệu)
        // Trong thực tế, bạn có thể sử dụng một service để xử lý
        // Ví dụ: userService.updateUserInfo(userInfo);
        System.out.println(userInfo);
        sVienService.updateInfo(userInfo.getMasv(), userInfo.getTen(), userInfo.getHo(), userInfo.getGioiTinh(), userInfo.getDiaChi());
        return "Thông tin đã được cập nhật: " + userInfo.toString();
    }
}
