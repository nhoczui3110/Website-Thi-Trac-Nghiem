package com.doantracnghiem.doantracnghiem.Entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DANGKYTHI")
public class DangKyThi {
    @Id
    @Column(name = "IDDk")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int iddk;
    @Column(name = "MAMH")
    private String mamh;
    @Column(name = "MALOP")
    private String maLop;
    @Column(name = "LAN")
    private int lan;
    @Column(name = "SOCAU")
    private int soCau;
    @Column(name = "NGAYTHI")
    private Date ngayThi;
    @Column(name = "THOILUONG")
    private int thoiLuong;
    @Column(name = "MANV")
    private String manv;
    @Column(name = "MAGV")
    private String magv;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;
}