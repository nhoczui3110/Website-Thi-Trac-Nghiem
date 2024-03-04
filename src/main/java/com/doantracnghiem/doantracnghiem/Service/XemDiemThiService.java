package com.doantracnghiem.doantracnghiem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.InfoDTO;
import com.doantracnghiem.doantracnghiem.Repository.DiemRepository;

@Service
public class XemDiemThiService {
    @Autowired
    private DiemRepository diemRepository;
    public List<InfoDTO>xemDiemThi(String masv){
        List<InfoDTO> list = diemRepository.layDanhSachDiem(masv);
        return list;
    }
}
