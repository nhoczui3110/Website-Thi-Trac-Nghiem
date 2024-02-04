package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.Diem;

@Repository
public class DiemRepository {
    public List<Diem> layDanhSachDiem(String masv){
        List<Diem> diems = new ArrayList<>();
        Connection c = JDBCUtil.getConnection();
        String spCall = "{call xemDiemThi(?)}";
        try (CallableStatement cs = c.prepareCall(spCall)) {
            cs.setString(1, masv);
            ResultSet rs = cs.executeQuery();

            // Lấy và hiển thị dữ liệu từ ResultSet
            Diem tmp = null;
            int stt = 1;
            String tenMH;
            int lanThi;
            float diem;
            int idThi;
            while (rs.next()) {
                tenMH = rs.getString("TENMH");
                lanThi = rs.getInt("LANTHI");
                diem = rs.getFloat("DIEM");
                idThi = rs.getInt("IDTHI");
                tmp = new Diem(stt, tenMH, lanThi, diem, idThi);
                stt++;
                diems.add(tmp);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            JDBCUtil.closeConnection(c);
        }
        return diems;
    }
}
