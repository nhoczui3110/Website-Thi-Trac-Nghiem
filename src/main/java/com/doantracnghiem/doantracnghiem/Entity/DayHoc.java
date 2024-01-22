package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DAYHOC")
public class DayHoc {
    @Id
    @Column(name = "IDDH")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int iddh;
    @Column(name = "MAGV")
    private String magv;
    @Column(name = "MAMH")
    private String mamh;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;
}
