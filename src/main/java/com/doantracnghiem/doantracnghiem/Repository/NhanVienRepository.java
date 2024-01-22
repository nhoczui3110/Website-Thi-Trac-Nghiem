package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.NhanVien;

@Repository
public interface NhanVienRepository extends JpaRepository<NhanVien,String>{
    
}
