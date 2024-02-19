package com.doantracnghiem.doantracnghiem.Entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SINHVIEN")
public class SinhVien {
    @Id
    @Column(name = "MASV")
    private String masv;
    @Column(name = "HO")
    private String ho;
    @Column(name = "TEN")
    private String ten;
    @Column(name = "GIOITINH")
    private String gioiTinh;
    @Column(name = "DIACHI")
    private String diaChi;
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
    public Date getNgaySinh() {
        return ngaySinh;
    }
    public void setNgaySinh(Date ngaySinh) {
        this.ngaySinh = ngaySinh;
    }
    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getPassWord() {
        return passWord;
    }
    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }
    public String getMaLop() {
        return maLop;
    }
    public void setMaLop(String maLop) {
        this.maLop = maLop;
    }
    @Column(name = "NGAYSINH")
    private Date ngaySinh;
    @Column(name = "USERNAME")
    private String userName;
    @Column(name = "PASSWORD")
    private String passWord;
    @Column(name = "MALOP")
    private String maLop;
    public String toString(){
        return ten + "  " + maLop;
    }
}
