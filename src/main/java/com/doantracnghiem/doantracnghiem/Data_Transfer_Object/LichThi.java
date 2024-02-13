package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.io.Serializable;
import java.sql.Date;

public class LichThi implements Serializable{
    private int IDTHI;
    private String maMH;
    private Integer lanThi;
    private Integer soCau;
    private Integer thoiLuong;
    private Boolean trangThai;
	private String tenMH;
    private Date ngayThi;
    public LichThi(int IDTHI,String maMh ,String tenMH, Date ngayThi, Integer lanThi, Integer soCau, Integer thoiLuong, Boolean trangThai) {
        this.IDTHI = IDTHI;
        this.maMH = maMh;
        this.tenMH = tenMH;
        this.ngayThi = ngayThi;
        this.lanThi = lanThi;
        this.soCau = soCau;
        this.thoiLuong = thoiLuong;
        this.trangThai = trangThai;
    }
    public int getIDTHI() {
        return IDTHI;
    }
    public void setIDTHI(int iDTHI) {
        IDTHI = iDTHI;
    }
    public String getMaMH() {
        return maMH;
    }
    public void setMaMH(String maMH) {
        this.maMH = maMH;
    }
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
}
