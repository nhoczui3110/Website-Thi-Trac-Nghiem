package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.DangKyThi;

@Repository
public interface DangKyThiRepository extends JpaRepository<DangKyThi,Integer>{
    
}
