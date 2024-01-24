package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.Lop;

@Repository
public interface LopRepository extends JpaRepository<Lop,String>{
    
}
