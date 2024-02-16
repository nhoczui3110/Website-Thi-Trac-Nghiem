package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "MONHOC")
public class MonHoc {
    @Id
    @Column(name = "MAMH")
    private String mamh;
    @Column(name = "TENMH")
    private String tenmh;
    @Column(name = "SOTIETLT")
    private int soTietLt;
    @Column(name = "SOTIETTH")
    private int soTietTh;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

    public String getMamh() {
        return mamh;
    }

    public void setMamh(String mamh) {
        this.mamh = mamh;
    }

    public String getTenmh() {
        return tenmh;
    }

    public void setTenmh(String tenmh) {
        this.tenmh = tenmh;
    }

    public int getSoTietLt() {
        return soTietLt;
    }

    public void setSoTietLt(int soTietLt) {
        this.soTietLt = soTietLt;
    }

    public int getSoTietTh() {
        return soTietTh;
    }

    public void setSoTietTh(int soTietTh) {
        this.soTietTh = soTietTh;
    }

    public boolean isTrangThaiXoa() {
        return trangThaiXoa;
    }

    public void setTrangThaiXoa(boolean trangThaiXoa) {
        this.trangThaiXoa = trangThaiXoa;
    }

    public MonHoc(String mamh, String tenmh, int soTietLt, int soTietTh, boolean trangThaiXoa) {
        this.mamh = mamh;
        this.tenmh = tenmh;
        this.soTietLt = soTietLt;
        this.soTietTh = soTietTh;
        this.trangThaiXoa = trangThaiXoa;
    }

    public MonHoc() {

    }
}
