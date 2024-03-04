package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Entity.Lop;

@Repository
@Transactional
public interface LopRepository extends JpaRepository<Lop, String> {
    @Query(value = "SELECT * FROM Lop WHERE trangThaiXoa = 'false'", nativeQuery = true)
    public List<Lop> getAllClass();

    @Query(value = "SELECT * FROM Lop WHERE maLop =:malop and trangThaiXoa = 'false'", nativeQuery = true)
    public Lop getClassById(@Param("malop") String malop);

    @Modifying
    @Query(value = "UPDATE Lop SET tenLop =:tenLop,namNhapHoc=:namNhapHoc WHERE maLop = :maLop", nativeQuery = true)
    public void updateInfo(@Param("maLop") String malop, @Param("tenLop") String tenLop,
            @Param("namNhapHoc") Date namNhapHoc);

    @Modifying
    @Query(value = "UPDATE Lop SET trangThaiXoa = 1 WHERE maLop = :maLop", nativeQuery = true)
    public void deleteClass(@Param("maLop") String malop);
}
