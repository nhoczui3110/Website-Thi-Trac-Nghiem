package com.doantracnghiem.doantracnghiem.Data_Transfer_Object;

public class Diem {
    private int stt;
    private String tenMH;
    private int lanThi;
    public Diem(int stt, String tenMH, int lanThi, float diem, int idThi) {
        this.stt = stt;
        this.tenMH = tenMH;
        this.lanThi = lanThi;
        this.diem = diem;
        this.idThi = idThi;
    }
    private float diem;
    private int idThi;
    public int getStt() {
        return stt;
    }
    public String getTenMH() {
        return tenMH;
    }
    public int getLanThi() {
        return lanThi;
    }
    public float getDiem() {
        return diem;
    }
    public int getIdThi() {
        return idThi;
    }
}
