package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Entity.CauHoi;

@Repository
public class DanhSachCauHoiRepository {
    public List<CauHoi> layCauHoiThi(String maMH,int soCau){
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
            while (rs.next()) {
                IDCH = rs.getInt("IDCH");
                hinhThuc = rs.getString("HINHTHUC");
                noiDung = rs.getString("NOIDUNG");
                iddh = rs.getInt("IDDH");
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
}
