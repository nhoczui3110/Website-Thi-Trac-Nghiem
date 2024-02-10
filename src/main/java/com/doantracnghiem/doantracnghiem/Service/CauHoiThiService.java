package com.doantracnghiem.doantracnghiem.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.CauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;
import com.doantracnghiem.doantracnghiem.Repository.DanhSachCauHoiRepository;
import com.doantracnghiem.doantracnghiem.Repository.LuaChonRepository;

@Service
public class CauHoiThiService {
    @Autowired
    private DanhSachCauHoiRepository danhSachCauHoiRepository;
    @Autowired
    private LuaChonRepository myLuaChonRepository;
    public List<CauHoiThiDTO> layCauHoiThi(String mamh,int socau){
        List<CauHoiThiDTO> listCauHoiThi = new ArrayList<>();
        List<CauHoi> listCauHoi;
        List<LuaChon> listLuaChon;
        listCauHoi = danhSachCauHoiRepository.layCauHoiThi(mamh, socau);
        CauHoiThiDTO tmp ;
        for(CauHoi ch : listCauHoi){
            listLuaChon = myLuaChonRepository.findAllByIdch(ch.getIdch());
            tmp = new CauHoiThiDTO(ch,listLuaChon);
            listCauHoiThi.add(tmp);
        }
        return listCauHoiThi;
    }
}
