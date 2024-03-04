package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

import java.sql.Date;

public class InfoDTO {
    private Integer IDTHI;
    private String maMH;
    private Integer lanThi;
    private Integer soCau;
    private Integer thoiLuong;
    public InfoDTO(Integer lanThi, Integer soCau, Integer thoiLuong, String tenMH, Date ngayThi, float diem) {
        this.lanThi = lanThi;
        this.soCau = soCau;
        this.thoiLuong = thoiLuong;
        this.tenMH = tenMH;
        this.ngayThi = ngayThi;
        this.diem = diem;
    }
    private Boolean trangThai;
    public InfoDTO(Integer iDTHI, Integer lanThi, String tenMH, float diem) {
        IDTHI = iDTHI;
        this.lanThi = lanThi;
        this.tenMH = tenMH;
        this.diem = diem;
    }
    private String tenMH;
    private Date ngayThi;
    private float diem;
    public InfoDTO() {
    }
    public Integer getIDTHI() {
        return IDTHI;
    }
    public void setIDTHI(Integer iDTHI) {
        IDTHI = iDTHI;
    }
    public String getMaMH() {
        return maMH;
    }
    public void setMaMH(String maMH) {
        this.maMH = maMH;
    }
    public Integer getLanThi() {
        return lanThi;
    }
    public InfoDTO(Integer IDTHI, String maMH, Integer lanThi, Integer soCau, Integer thoiLuong, Boolean trangThai,
            String tenMH, Date ngayThi) {
        this.IDTHI = IDTHI;
        this.maMH = maMH;
        this.lanThi = lanThi;
        this.soCau = soCau;
        this.thoiLuong = thoiLuong;
        this.trangThai = trangThai;
        this.tenMH = tenMH;
        this.ngayThi = ngayThi;
    }
    public InfoDTO(Integer iDTHI, Integer lanThi, Integer soCau, Integer thoiLuong, String tenMH, Date ngayThi) {
        IDTHI = iDTHI;
        this.lanThi = lanThi;
        this.soCau = soCau;
        this.thoiLuong = thoiLuong;
        this.tenMH = tenMH;
        this.ngayThi = ngayThi;
    }
    public void setLanThi(Integer lanThi) {
        this.lanThi = lanThi;
    }
    public Integer getSoCau() {
        return soCau;
    }
    public void setSoCau(Integer soCau) {
        this.soCau = soCau;
    }
    public Integer getThoiLuong() {
        return thoiLuong;
    }
    public void setThoiLuong(Integer thoiLuong) {
        this.thoiLuong = thoiLuong;
    }
    public Boolean getTrangThai() {
        return trangThai;
    }
    public void setTrangThai(Boolean trangThai) {
        this.trangThai = trangThai;
    }
    public String getTenMH() {
        return tenMH;
    }
    public void setTenMH(String tenMH) {
        this.tenMH = tenMH;
    }
    public Date getNgayThi() {
        return ngayThi;
    }
    public void setNgayThi(Date ngayThi) {
        this.ngayThi = ngayThi;
    }
    public float getDiem() {
        return diem;
    }
    public void setDiem(float diem) {
        this.diem = diem;
    }
    
}
