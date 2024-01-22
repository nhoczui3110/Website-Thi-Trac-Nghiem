package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "LUACHON")
public class LuaChon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDLC")
    private int idlc;
    @Column(name = "NOIDUNG")
    private String noiDung;
    @Column(name = "THUTU")
    private int thuTu;
    @Column(name = "IDCH")
    private int idch;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;
}
