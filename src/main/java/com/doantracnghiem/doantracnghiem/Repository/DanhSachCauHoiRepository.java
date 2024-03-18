package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.CauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.ResultSetDTO;
import com.doantracnghiem.doantracnghiem.Entity.CTBaiThi;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

@Repository
public class DanhSachCauHoiRepository {
    @Autowired
    private LuaChonRepository luaChonRepository;
    @Autowired 
    private SessionFactory sessionFactory;
    public List<CauHoi> layCauHoiThi(String maMH,int soCau,List<Integer> dap_an){
        List<CauHoi> list =null;
        String spCall = "exec layDanhSachCauHoi '" + maMH + "', "+ soCau ;
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        Query<CauHoi> query = session.createNativeQuery(spCall, CauHoi.class);
        list=query.getResultList();
        session.getTransaction().commit();
        for(CauHoi c:list ){
            dap_an.add(c.getDapAnDung());
            c.setDapAnDung(0);
        }
        session.close();
        return list;
    }
    public DanhSachCauHoiThiDTO layCauHoiDaThi(int idThi){
        DanhSachCauHoiThiDTO ds = new DanhSachCauHoiThiDTO();
        List<ResultSetDTO> rs ;
        CauHoi cauHoi = null;
        CTBaiThi ctBaiThi = null;
        List<LuaChon> luaChons = null;
        String spCall = "exec layCauHoiDaThi " + idThi;
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        Query<ResultSetDTO> query = session.createNativeQuery(spCall, ResultSetDTO.class);
        rs = query.getResultList();
        session.getTransaction().commit();
        for(ResultSetDTO r: rs){
            cauHoi = new CauHoi(r.getIdch(),r.getHinhThuc(),r.getNoiDung(),r.getDapAnDung(),r.getIddh(),false);
            ctBaiThi = new CTBaiThi(idThi,r.getIdch(),r.getDapAnSv(),r.getThuTuChon(),false);
            luaChons = luaChonRepository.findAllByIdch(r.getIdch());
            luaChons.sort((lc1,lc2)->(lc1.getThuTu() - lc2.getThuTu()));
            ds.addCauHoiThi(new CauHoiThiDTO(cauHoi,luaChons,ctBaiThi));
        }
        ds.getList().sort((ds1,ds2)->(ds1.getCtBaiThi().getThuTuChon() - ds2.getCtBaiThi().getThuTuChon()));       
        session.close();
        return ds;
    }
}
