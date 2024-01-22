package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.CTBaiThi;
import com.doantracnghiem.doantracnghiem.Entity.IDCTBaiThi;

@Repository
public interface CTBaiThiRepository extends JpaRepository<CTBaiThi,IDCTBaiThi>{
    
}
