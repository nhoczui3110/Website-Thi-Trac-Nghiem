package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import java.util.*;

@Repository
public interface CauHoiRepository extends JpaRepository<CauHoi, Integer> {
    @Query(value = "EXEC findCauHoiByMaGvAndMaMh @magv = :magv, @mamh = :mamh, @pageNumber = :pageNumber, @pageSize = :pageSize", nativeQuery = true)
    List<Object[]> findCauHoiByMaGvAndMaMh(@Param("magv") String magv, @Param("mamh") String mamh,
            @Param("pageNumber") int pageNumber, @Param("pageSize") int pageSize);

    @Query(value = "EXEC countQuestionByMonHocAndLecturer @MaGv = :magv, @mamh = :mamh", nativeQuery = true)
    int countQuestionByMonHocAndLecturer(@Param("magv") String magv, @Param("mamh") String mamh);

    @Query(value = "EXEC findLuaChocByMaCauHoi @maCauHoi = :maCauHoi", nativeQuery = true)
    List<Object[]> findLuaChocByMaCauHoi(@Param("maCauHoi") int maCauHoi);
}
