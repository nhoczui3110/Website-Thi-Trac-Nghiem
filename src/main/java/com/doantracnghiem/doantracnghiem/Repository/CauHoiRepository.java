package com.doantracnghiem.doantracnghiem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.CauHoi;



@Repository
public interface CauHoiRepository extends JpaRepository<CauHoi,Integer>{   
}
