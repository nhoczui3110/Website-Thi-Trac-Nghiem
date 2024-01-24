package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.DayHoc;
@Repository
public interface DayHocRepository extends JpaRepository<DayHoc, Integer> {
    
}
