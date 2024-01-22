package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;

@Repository
public interface GiangVienRepository extends JpaRepository<GiangVien,String>{
    
}
