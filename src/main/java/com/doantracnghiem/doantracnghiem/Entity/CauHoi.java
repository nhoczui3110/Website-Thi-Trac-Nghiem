package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "CAUHOI")
public class CauHoi {
    @Id
    @Column(name = "IDCH")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idch;
    @Column(name = "HINHTHUC")
    private String hinhThuc;
    @Column(name = "NOIDUNG")
    private String noiDung;
    @Column(name = "DAPANDUNG")
    private int dapAnDung;
    @Column(name = "IDDH")
    private int iddh;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

    public void setTrangThaiXoa(boolean trangThaiXoa) {
        this.trangThaiXoa = trangThaiXoa;
    }
}
