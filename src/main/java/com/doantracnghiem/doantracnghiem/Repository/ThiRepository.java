package com.doantracnghiem.doantracnghiem.Repository;

// import org.hibernate.mapping.List;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.DTO.ThiInfoDTO;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

@Repository
public interface ThiRepository extends JpaRepository<LuaChon, Integer> {
    @Query(value = "EXEC findThiFromIddk @iddk = :iddk", nativeQuery = true)
    public List<ThiInfoDTO> findThiInfoFromIddk(@Param("iddk") int iddk);

    @Query(value = "EXEC insertThiByIddk @iddk = :iddk", nativeQuery = true)
    public void insertThiByIddk(@Param("iddk") int iddk);
}
