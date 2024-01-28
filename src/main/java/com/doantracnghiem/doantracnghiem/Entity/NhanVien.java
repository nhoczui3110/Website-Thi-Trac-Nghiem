package com.doantracnghiem.doantracnghiem.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "NHANVIENGV")
public class NhanVien {
    @Id
    @Column(name = "MANV")
    private String manv;
    @Column(name = "HO")
    private String ho;
    @Column(name = "TEN")
    private String ten;
    @Column(name = "GIOITINH")
    private boolean gioiTinh;
    @Column(name = "USERNAME")
    private String userName;
    @Column(name = "PASSWORD")
    private String passWord;
    @Column(name = "TRANGTHAIXOA")
    private boolean trangThaiXoa;

}
