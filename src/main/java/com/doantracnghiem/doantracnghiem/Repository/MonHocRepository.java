package com.doantracnghiem.doantracnghiem.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.Entity.MonHoc;

@Repository
public interface MonHocRepository extends JpaRepository<MonHoc, String> {
    @Query(value = "select * from monhoc where trangthaixoa=0", nativeQuery = true)
    public List<MonHoc> findAllMonHoc();
}
