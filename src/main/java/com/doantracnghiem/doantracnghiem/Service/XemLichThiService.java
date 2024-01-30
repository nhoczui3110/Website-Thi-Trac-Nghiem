package com.doantracnghiem.doantracnghiem.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.LichThi;
import com.doantracnghiem.doantracnghiem.Repository.DangKyThiRepository;
import com.doantracnghiem.doantracnghiem.Repository.LichThiRepository;

@Service
public class XemLichThiService {
    @Autowired
    private LichThiRepository lichThiRepository;
    public List<LichThi> xemLichThi(String masv){
        List<LichThi> list = lichThiRepository.layLichThi(masv);
        return list;
    }
}
