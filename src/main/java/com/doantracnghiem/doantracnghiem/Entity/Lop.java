package com.doantracnghiem.doantracnghiem.Entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
<<<<<<< HEAD
import java.sql.Date;
=======
import java.time.LocalDate;
>>>>>>> quang

@Entity
@Table(name = "LOP")
public class Lop implements Serializable {
    @Id
    @Column(name = "MALOP")
    private String maLop;
    @Column(name = "TENLOP")
    private String tenLop;
    @Column(name = "NAMNHAPHOC")
<<<<<<< HEAD
    private Date nam_nhap_hoc;
    @Column(name = "TRANGTHAIXOA")
    private boolean trang_thai_xoa;

    public Lop(String maLop, String tenLop, Date nam_nhap_hoc, boolean trang_thai_xoa) {
        this.maLop = maLop;
        this.tenLop = tenLop;
        this.nam_nhap_hoc = nam_nhap_hoc;
        this.trang_thai_xoa = trang_thai_xoa;
=======
    private LocalDate namNhapHoc;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

    public Lop(String maLop, String tenLop, LocalDate namNhapHoc, boolean trangThaiXoa) {
        this.maLop = maLop;
        this.tenLop = tenLop;
        this.namNhapHoc = namNhapHoc;
        this.trangThaiXoa = trangThaiXoa;
>>>>>>> quang
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

<<<<<<< HEAD
    public Date getNamNhapHoc() {
        return (Date) nam_nhap_hoc.clone();
=======
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
>>>>>>> quang
    }

}
