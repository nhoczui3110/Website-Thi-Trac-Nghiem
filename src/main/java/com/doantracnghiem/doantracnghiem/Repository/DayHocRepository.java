package com.doantracnghiem.doantracnghiem.Repository;

// import org.hibernate.mapping.List;
import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.DayHoc;
import com.doantracnghiem.doantracnghiem.Entity.GiangVien;

@Repository
public interface DayHocRepository extends JpaRepository<DayHoc, Integer> {
    @Query(value = "EXEC findUserByUsername @username = :username, @type = 'GIANGVIEN'", nativeQuery = true)
    GiangVien findUserByUserName(@Param("username") String username);

    @Query(value = "findMonHocByMagv @magv = :magv", nativeQuery = true)
    List<Object[]> findMonHocByMaGv(@Param("magv") String magv);

    @Query(value = "EXEC findIDDHByMaMhAndMaGv @MAMH = :mamh, @MAGV = :magv", nativeQuery = true)
    Integer findIDDHByMaMhAndMaGv(@Param("mamh") String mamh, @Param("magv") String magv);
}
