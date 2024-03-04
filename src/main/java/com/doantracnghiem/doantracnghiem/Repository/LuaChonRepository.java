package com.doantracnghiem.doantracnghiem.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

@Repository
public interface LuaChonRepository extends JpaRepository<LuaChon,Integer>{
    List<LuaChon> findAllByIdch(int IDCH);
}
