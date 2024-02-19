package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.doantracnghiem.doantracnghiem.Entity.SinhVien;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVien, String> {
    @Transactional
    @Modifying
    @Query("update SinhVien s set s.ten = :ten,s.ho= :ho,s.gioiTinh= :gioiTinh,s.diaChi= :diaChi where s.masv = :masv")
    public void updateInfo(@Param(value = "masv") String masv,
            @Param(value = "ten") String ten,
            @Param(value = "ho") String ho,
            @Param(value = "gioiTinh") String gioiTinh,
            @Param(value = "diaChi") String diaChi);
    public SinhVien findSinhVienByMasv(String masv);
}
