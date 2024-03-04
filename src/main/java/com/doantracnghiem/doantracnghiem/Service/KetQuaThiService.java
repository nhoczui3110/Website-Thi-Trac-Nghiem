package com.doantracnghiem.doantracnghiem.Service;

import java.sql.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.InfoDTO;
import com.doantracnghiem.doantracnghiem.Repository.CTBaiThiRepository;
import com.doantracnghiem.doantracnghiem.Repository.DanhSachCauHoiRepository;

@Service
public class KetQuaThiService {
    @Autowired
    private DanhSachCauHoiRepository danhSachCauHoiRepository;
    @Autowired
    private CTBaiThiRepository ctBaiThiRepository;
    public DanhSachCauHoiThiDTO layDanhSachCauHoiThi(int idThi){
        return danhSachCauHoiRepository.layCauHoiDaThi(idThi);
    } 
    public InfoDTO layKetQua(int idThi){
        Map<String,Object> info = ctBaiThiRepository.layThongTinKQ(idThi);
        String tenMH = (String)info.get("TENMH");
        Date ngayThi = (Date) info.get("NGAYTHI");
        Integer lanThi = (Integer) info.get("LAN");
        Integer soCau = (Integer) info.get("SOCAU");
        Integer thoiLuong = (Integer) info.get("THOILUONG");
        Float diem = Float.parseFloat(String.valueOf(info.get("DIEM")));
        InfoDTO kq = new InfoDTO(lanThi, soCau, thoiLuong, tenMH, ngayThi, diem);
        return kq;
    }
}
