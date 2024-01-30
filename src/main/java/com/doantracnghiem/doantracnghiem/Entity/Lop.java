package com.doantracnghiem.doantracnghiem.Entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Date;
@Entity
@Table(name = "LOP")
public class Lop implements Serializable {
    @Id
    @Column(name = "MALOP")
    private String ma_lop;
    @Column(name = "TENLOP")
    private String ten_lop;
    @Column(name = "NAMNHAPHOC")
    private Date nam_nhap_hoc;
    @Column(name = "TRANGTHAIXOA")
    private boolean trang_thai_xoa;
    public Lop(String ma_lop,String ten_lop,Date nam_nhap_hoc,boolean trang_thai_xoa){
        this.ma_lop = ma_lop;
        this.ten_lop = ten_lop;
        this.nam_nhap_hoc = nam_nhap_hoc;
        this.trang_thai_xoa = trang_thai_xoa;
    }
    public String getMaLop(){
        return this.ma_lop;
    }
    public String getTenLop(){
        return ten_lop;
    }
    public Date getNamNhapHoc(){
        return (Date) nam_nhap_hoc.clone();
    }
}
