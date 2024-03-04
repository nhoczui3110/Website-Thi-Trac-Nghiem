package com.doantracnghiem.doantracnghiem.DTO;

// public class ThiInfoDTO {
//     private String masv;
//     private String ho;
//     private String ten;
//     private double diem;

//     public String getMasv() {
//         return masv;
//     }

//     public void setMasv(String masv) {
//         this.masv = masv;
//     }

//     public String getHo() {
//         return ho;
//     }

//     public void setHo(String ho) {
//         this.ho = ho;
//     }

//     public String getTen() {
//         return ten;
//     }

//     public void setTen(String ten) {
//         this.ten = ten;
//     }

//     public double getDiem() {
//         return diem;
//     }

//     public void setDiem(double diem) {
//         this.diem = diem;
//     }

//     public ThiInfoDTO(String masv, String ho, String ten, double diem) {
//         this.masv = masv;
//         this.ho = ho;
//         this.ten = ten;
//         this.diem = diem;
//     }

//     public ThiInfoDTO() {

//     }
// }
public interface ThiInfoDTO {
    String getMasv();

    void setMasv(String masv);

    String getHo();

    void setHo(String ho);

    String getTen();

    void setTen(String ten);

    double getDiem();

    void setDiem(double diem);
}