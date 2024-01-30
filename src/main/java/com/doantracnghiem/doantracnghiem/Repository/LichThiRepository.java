package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.LichThi;

@Repository
public class LichThiRepository {
    public List<LichThi> layLichThi(String masv) {
        List<LichThi> lichthi = new ArrayList<>();
        Connection c = JDBCUtil.getConnection();
        String spCall = "{call xemLichThi(?)}";
        try (CallableStatement cs = c.prepareCall(spCall)) {
            cs.setString(1, masv);
            ResultSet rs = cs.executeQuery();

            // Lấy và hiển thị dữ liệu từ ResultSet
            LichThi tmp = null;
            int stt = 1;
            while (rs.next()) {
                String tenMonHoc = rs.getString("TENMH");
                Date ngayThi = rs.getDate("NGAYTHI");
                int lanThi = rs.getInt("LANTHI");
                int soCau = rs.getInt("SOCAU");
                int thoiLuong = rs.getInt("THOILUONG");
                boolean trangThai = rs.getBoolean("TRANGTHAI");
                tmp = new LichThi(stt, tenMonHoc, ngayThi, lanThi, soCau, thoiLuong, trangThai);
                stt+=1;
                lichthi.add(tmp);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            JDBCUtil.closeConnection(c);
        }
        return lichthi;
    }

}
