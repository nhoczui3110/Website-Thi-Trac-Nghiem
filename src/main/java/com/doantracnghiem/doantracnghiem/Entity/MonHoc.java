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
}
