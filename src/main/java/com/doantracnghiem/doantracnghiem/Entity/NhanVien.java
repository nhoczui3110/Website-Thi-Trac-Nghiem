package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "NHANVIENGV")
public class NhanVien {
    @Id
    @Column(name = "MANV")
    private String manv;
    @Column(name = "HO")
    private String ho;
    @Column(name = "TEN")
    private String ten;
    @Column(name = "GIOITINH")
    private boolean gioiTinh;
    @Column(name = "USERNAME")
    private String userName;
    @Column(name = "PASSWORD")
    private String passWord;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

    public NhanVien(String manv, String ho, String ten, boolean gioiTinh, String userName, String passWord,
            boolean trangThaiXoa) {
        this.manv = manv;
        this.ho = ho;
        this.ten = ten;
        this.gioiTinh = gioiTinh;
        this.userName = userName;
        this.passWord = passWord;
        this.trangThaiXoa = trangThaiXoa;
    }

    public NhanVien() {

    }

    public String getManv() {
        return manv;
    }

    public void setManv(String manv) {
        this.manv = manv;
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

    public boolean isGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(boolean gioiTinh) {
        this.gioiTinh = gioiTinh;
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

    public boolean isTrangThaiXoa() {
        return trangThaiXoa;
    }

    public void setTrangThaiXoa(boolean trangThaiXoa) {
        this.trangThaiXoa = trangThaiXoa;
    }
}
