package com.doantracnghiem.doantracnghiem.Entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "GIANGVIEN")
public class GiangVien implements Serializable {
    @Id
    @Column(name = "MAGV")
    private String maGv;
    @Column(name = "HO")
    private String ho;
    @Column(name = "TEN")
    private String ten;
    @Column(name = "GIOITINH") // 0: nam, 1: nu
    private boolean gioiTinh;
    @Column(name = "HOCVI")
    private String hocVi;
    @Column(name = "HOCHAM")
    private String hocHam;
    @Column(name = "USERNAME")
    private String userName;
    @Column(name = "PASSWORD")
    private String passWord;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

    public String getMaGv() {
        return maGv;
    }

    public String getHo() {
        return ho;
    }

    public String getTen() {
        return ten;
    }

    public boolean getGioiTinh() {
        return gioiTinh;
    }

    public String getHocVi() {
        return hocVi;
    }

    public String getHocHam() {
        return hocHam;
    }

    public String getUserName() {
        return userName;
    }
}
