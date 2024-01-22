package com.doantracnghiem.doantracnghiem.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

@Repository
public interface ThiRepository extends JpaRepository<LuaChon,Integer>{
    
}
