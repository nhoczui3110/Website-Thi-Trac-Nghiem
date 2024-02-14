package com.doantracnghiem.doantracnghiem.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.CauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Entity.CTBaiThi;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;
import com.doantracnghiem.doantracnghiem.Repository.CTBaiThiRepository;
import com.doantracnghiem.doantracnghiem.Repository.DanhSachCauHoiRepository;
import com.doantracnghiem.doantracnghiem.Repository.LuaChonRepository;
import com.doantracnghiem.doantracnghiem.Repository.ThiRepository;

@Service
public class CauHoiThiService {
    @Autowired
    private DanhSachCauHoiRepository danhSachCauHoiRepository;
    @Autowired
    private LuaChonRepository myLuaChonRepository;
    @Autowired
    private CTBaiThiRepository ctBaiThiRepository;
    @Autowired
    private ThiRepository thiRepository;

    public DanhSachCauHoiThiDTO layCauHoiThi(String mamh, int socau, int idthi,List<Integer> dap_an) {
        DanhSachCauHoiThiDTO listCauHoiThi = new DanhSachCauHoiThiDTO();
        List<CauHoi> listCauHoi;
        List<LuaChon> listLuaChon;
        CauHoiThiDTO tmp;
        CTBaiThi tmp1;
        int thuTuChon = 1;
        listCauHoi = danhSachCauHoiRepository.layCauHoiThi(mamh, socau,dap_an);
        for (CauHoi ch : listCauHoi) {
            listLuaChon = myLuaChonRepository.findAllByIdch(ch.getIdch());
            tmp1 = new CTBaiThi(idthi);
            tmp1.setIdch(ch.getIdch());
            tmp1.setThuTuChon(thuTuChon++);
            tmp = new CauHoiThiDTO(ch, listLuaChon, tmp1);
            listCauHoiThi.addCauHoiThi(tmp);
        }
        return listCauHoiThi;
    }
    public void luuCauHoiThi(DanhSachCauHoiThiDTO list, List<Integer> dap_an ){
        float diem = 0;
        System.out.println(dap_an);
        int soCauDung = 0,tongSoCau = 0,index = 0;
        List<CTBaiThi> ctBaiThi = new ArrayList<>();
        for(CauHoiThiDTO ch:list.getList()){
            ctBaiThi.add(ch.getCtBaiThi());
            if(ch.getCtBaiThi().getDapAnSv() == dap_an.get(index++))soCauDung ++;
            System.out.println(ch.getCtBaiThi().getDapAnSv());
            tongSoCau ++;
        }
        System.out.println(soCauDung);
        diem = (float)soCauDung/tongSoCau;
        diem = (float)Math.round(diem*100)/100;
        System.out.println(diem);
        thiRepository.update(ctBaiThi.get(0).getIdThi(),diem);
        ctBaiThiRepository.saveAll(ctBaiThi);
    }
}
