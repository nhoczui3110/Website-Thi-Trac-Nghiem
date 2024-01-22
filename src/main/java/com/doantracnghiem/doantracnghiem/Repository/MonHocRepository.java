package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.MonHoc;

@Repository
public interface MonHocRepository extends JpaRepository<MonHoc,String> {
    
}
