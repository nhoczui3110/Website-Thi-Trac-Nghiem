package com.doantracnghiem.doantracnghiem.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.InfoDTO;
import com.doantracnghiem.doantracnghiem.Repository.LichThiRepository;

@Service
public class XemLichThiService {
    @Autowired
    private LichThiRepository lichThiRepository;
    public List<InfoDTO> xemLichThi(String masv){
        List<InfoDTO> list = lichThiRepository.layLichThi(masv);
        return list;
    }
}
