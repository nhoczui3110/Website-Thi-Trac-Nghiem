package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;

@Repository
public interface GiangVienRepository extends JpaRepository<GiangVien, String> {
    @Query(value = "EXEC findUserByUsername @username = :username, @type = 'GIANGVIEN'", nativeQuery = true)
    GiangVien findUserByUserName(@Param("username") String username);
}
