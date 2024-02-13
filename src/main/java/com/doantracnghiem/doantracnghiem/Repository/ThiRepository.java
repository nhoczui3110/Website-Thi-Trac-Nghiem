package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.doantracnghiem.doantracnghiem.Entity.Thi;

@Repository
public interface ThiRepository extends JpaRepository<Thi,Integer>{
    @Transactional
    @Modifying
    @Query("update Thi t set t.dathi = true where t.idThi = :idthi")
    public void update(@Param(value = "idthi") int idthi);
}
