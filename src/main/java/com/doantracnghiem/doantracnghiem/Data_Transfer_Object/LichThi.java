package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.io.Serializable;
import java.sql.Date;


public class LichThi implements Serializable{
    public LichThi( String tenMH, Date ngayThi, Integer lanThi, Integer soCau, Integer thoiLuong, Boolean trangThai) {
        this.tenMH = tenMH;
        this.ngayThi = ngayThi;
        this.lanThi = lanThi;
        this.soCau = soCau;
        this.thoiLuong = thoiLuong;
        this.trangThai = trangThai;
    }
    private String tenMH;
    private Date ngayThi;
    public String getTenMH() {
        return tenMH;
    }
    public Date getNgayThi() {
        return ngayThi;
    }
    public Integer getLanThi() {
        return lanThi;
    }
    public Integer getSoCau() {
        return soCau;
    }
    public Integer getThoiLuong() {
        return thoiLuong;
    }
    public Boolean isTrangThai() {
        return trangThai;
    }
    private Integer lanThi;
    private Integer soCau;
    private Integer thoiLuong;
    private Boolean trangThai;
}
