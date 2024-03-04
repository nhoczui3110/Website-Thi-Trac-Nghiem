package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.InfoDTO;

@Repository
public class LichThiRepository {
    public List<InfoDTO> layLichThi(String masv) {
        List<InfoDTO> lichthi = new ArrayList<>();
        Connection c = JDBCUtil.getConnection();
        String spCall = "{call xemLichThi(?)}";
        try (CallableStatement cs = c.prepareCall(spCall)) {
            cs.setString(1, masv);
            ResultSet rs = cs.executeQuery();

            // Lấy và hiển thị dữ liệu từ ResultSet
            InfoDTO tmp = null;
            int IDTHI;
            String maMH;
            String tenMonHoc;
            Date ngayThi;
            int lanThi;
            int soCau;
            int thoiLuong;
            boolean trangThai;
            while (rs.next()) {
                IDTHI = rs.getInt("IDTHI");
                maMH = rs.getString("MAMH");
                tenMonHoc = rs.getString("TENMH");
                ngayThi = rs.getDate("NGAYTHI");
                lanThi = rs.getInt("LANTHI");
                soCau = rs.getInt("SOCAU");
                thoiLuong = rs.getInt("THOILUONG");
                trangThai = rs.getBoolean("TRANGTHAI");
                tmp = new InfoDTO(IDTHI, maMH, lanThi, soCau, thoiLuong, trangThai, tenMonHoc, ngayThi);
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
