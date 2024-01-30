package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.sql.Date;


public class LichThi {
    public LichThi(int stt, String tenMH, Date ngayThi, int lanThi, int soCau, int thoiLuong, boolean trangThai) {
        this.stt = stt;
        this.tenMH = tenMH;
        this.ngayThi = ngayThi;
        this.lanThi = lanThi;
        this.soCau = soCau;
        this.thoiLuong = thoiLuong;
        this.trangThai = trangThai;
    }
    private int stt;
    private String tenMH;
    private Date ngayThi;
    public int getStt() {
        return stt;
    }
    public String getTenMH() {
        return tenMH;
    }
    public Date getNgayThi() {
        return ngayThi;
    }
    public int getLanThi() {
        return lanThi;
    }
    public int getSoCau() {
        return soCau;
    }
    public int getThoiLuong() {
        return thoiLuong;
    }
    public boolean isTrangThai() {
        return trangThai;
    }
    private int lanThi;
    private int soCau;
    private int thoiLuong;
    private boolean trangThai;
}
