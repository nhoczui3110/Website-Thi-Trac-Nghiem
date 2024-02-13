package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "THI")
public class Thi {
    @Id
    @Column(name = "IDTHi")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idThi;
    @Column(name = "MASV")
    private String masv;
    @Column(name = "IDDK")
    private int iddk;
    @Column(name = "DATHI")
    private boolean dathi;
    @Column(name = "DIEM")
    private float diem;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;
}
