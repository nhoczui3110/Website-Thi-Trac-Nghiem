package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.KetQuaThiDTO;
import com.doantracnghiem.doantracnghiem.Entity.CTBaiThi;
import com.doantracnghiem.doantracnghiem.Entity.IDCTBaiThi;

@Repository
public interface CTBaiThiRepository extends JpaRepository<CTBaiThi,IDCTBaiThi>{
    @Query(value =  "Exec layThongTinKQ @idThi= :idThi",nativeQuery = true)
    public KetQuaThiDTO layThongTinKQ(@Param("idThi") int idThi);
}
