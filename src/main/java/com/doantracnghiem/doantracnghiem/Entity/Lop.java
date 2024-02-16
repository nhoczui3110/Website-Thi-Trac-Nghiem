package com.doantracnghiem.doantracnghiem.Entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "LOP")
public class Lop implements Serializable {
    @Id
    @Column(name = "MALOP")
    private String maLop;
    @Column(name = "TENLOP")
    private String tenLop;
    @Column(name = "NAMNHAPHOC")
    private LocalDate namNhapHoc;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

    public Lop(String maLop, String tenLop, LocalDate namNhapHoc, boolean trangThaiXoa) {
        this.maLop = maLop;
        this.tenLop = tenLop;
        this.namNhapHoc = namNhapHoc;
        this.trangThaiXoa = trangThaiXoa;
    }

    public Lop() {

    }

    public String getMaLop() {
        return maLop;
    }

    public void setMaLop(String maLop) {
        this.maLop = maLop;
    }

    public String getTenLop() {
        return tenLop;
    }

    public void setTenLop(String tenLop) {
        this.tenLop = tenLop;
    }

    public LocalDate getNamNhapHoc() {
        return namNhapHoc;
    }

    public void setNamNhapHoc(LocalDate namNhapHoc) {
        this.namNhapHoc = namNhapHoc;
    }

    public boolean isTrangThaiXoa() {
        return trangThaiXoa;
    }

    public void setTrangThaiXoa(boolean trangThaiXoa) {
        this.trangThaiXoa = trangThaiXoa;
    }

}
