package com.doantracnghiem.doantracnghiem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Repository.DanhSachCauHoiRepository;

@Service
public class KetQuaThiService {
    @Autowired
    private DanhSachCauHoiRepository danhSachCauHoiRepository;
    public DanhSachCauHoiThiDTO layDanhSachCauHoiThi(int idThi){
        return danhSachCauHoiRepository.layCauHoiDaThi(idThi);
    } 
}
