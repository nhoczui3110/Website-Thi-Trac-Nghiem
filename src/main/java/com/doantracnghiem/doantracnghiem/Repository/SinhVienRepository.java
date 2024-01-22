package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.Entity.SinhVien;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVien,String> {
    
}
