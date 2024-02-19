package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.CauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.DanhSachCauHoiThiDTO;
import com.doantracnghiem.doantracnghiem.Entity.CTBaiThi;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Entity.LuaChon;

@Repository
public class DanhSachCauHoiRepository {
    @Autowired
    private LuaChonRepository luaChonRepository;
    public List<CauHoi> layCauHoiThi(String maMH,int soCau,List<Integer> dap_an){
        List<CauHoi> list = new ArrayList<>();
        Connection c = JDBCUtil.getConnection();
        String spCall = "{call layDanhSachCauHoi(?,?)}";
        try (CallableStatement cs = c.prepareCall(spCall)) {
            cs.setString(1, maMH);
            cs.setInt(2, soCau);
            ResultSet rs = cs.executeQuery();
            // Lấy và hiển thị dữ liệu từ ResultSet
            CauHoi tmp = null;
            int IDCH;
            String hinhThuc;
            String noiDung;
            int iddh;
            int dapandung;
            while (rs.next()) {
                IDCH = rs.getInt("IDCH");
                hinhThuc = rs.getString("HINHTHUC");
                noiDung = rs.getString("NOIDUNG");
                iddh = rs.getInt("IDDH");
                dapandung = rs.getInt("DAPANDUNG");
                dap_an.add(dapandung);
                tmp = new CauHoi(IDCH,hinhThuc,noiDung,0,iddh,false);
                list.add(tmp);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            JDBCUtil.closeConnection(c);
        }
        return list;
    }
    public DanhSachCauHoiThiDTO layCauHoiDaThi(int idThi){
        DanhSachCauHoiThiDTO ds = new DanhSachCauHoiThiDTO();
        // List<CauHoi> list = new ArrayList<>();
        Connection c = JDBCUtil.getConnection();
        String spCall = "{call layCauHoiDaThi(?)}";
        try (CallableStatement cs = c.prepareCall(spCall)) {
            cs.setInt(1, idThi);
            ResultSet rs = cs.executeQuery();
            // Lấy và hiển thị dữ liệu từ ResultSet
            CauHoi tmp = null;
            List<LuaChon> tmp1 = null;
            CTBaiThi tmp2 = null;
            int IDCH;
            String hinhThuc;
            String noiDung;
            int iddh;
            int dapAnDung;
            int dapAnSv;
            int thuTuChon;
            while (rs.next()) {
                IDCH = rs.getInt("IDCH");
                hinhThuc = rs.getString("HINHTHUC");
                noiDung = rs.getString("NOIDUNG");
                iddh = rs.getInt("IDDH");
                dapAnDung = rs.getInt("DAPANDUNG");
                dapAnSv = rs.getInt("DAPANSV");
                thuTuChon = rs.getInt("THUTUCHON");

                tmp = new CauHoi(IDCH,hinhThuc,noiDung,dapAnDung,iddh,false);
                tmp2 = new CTBaiThi(idThi, IDCH, dapAnSv, thuTuChon, false);
                tmp1 = luaChonRepository.findAllByIdch(IDCH);
                tmp1.sort((lc1,lc2)->(lc1.getThuTu() - lc2.getThuTu()));
                ds.addCauHoiThi(new CauHoiThiDTO(tmp, tmp1, tmp2));
            }
            ds.getList().sort((ds1,ds2)->(ds1.getCtBaiThi().getThuTuChon() - ds1.getCtBaiThi().getThuTuChon()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            JDBCUtil.closeConnection(c);
        }
        return ds;
    }
}
