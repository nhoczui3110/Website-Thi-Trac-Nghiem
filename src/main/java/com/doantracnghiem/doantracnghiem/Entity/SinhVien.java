package com.doantracnghiem.doantracnghiem.Entity;

import java.time.LocalDate;

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
    @Column(name = "NGAYSINH")
    private LocalDate ngaySinh;
    @Column(name = "USERNAME")
    private String userName;
    @Column(name = "PASSWORD")
    private String passWord;
    @Column(name = "MALOP")
    private String maLop;
}
