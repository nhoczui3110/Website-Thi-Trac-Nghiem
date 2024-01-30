package com.doantracnghiem.doantracnghiem;

import java.sql.*;

public class test {

    public static Connection sConn = null;

    public static void main(String[] args) {
        // Thông số kết nối
        String strDbUrl = "jdbc:sqlserver://localhost:1433;databaseName=WEBTHITRACNGHIEM;encrypt=true;trustServerCertificate=true";
        String username = "sa";
        String password = "123456789";

        // Lệnh gọi stored procedure với tham số mã sinh viên
        String spCall = "{call xemLichThi(?)}"; // Thay xemLichThi() bằng tên thực sự của stored procedure

        // Thực hiện kết nối và test
        if (sConn == null) {
            try {
                sConn = DriverManager.getConnection(strDbUrl, username, password);
                System.out.println("Kết nối thành công");

                // Hiển thị thông tin SQL khi kết nối thành công
                DatabaseMetaData data = sConn.getMetaData();
                System.out.println("Driver Name: " + data.getDriverName());
                System.out.println("Driver Version: " + data.getDriverVersion());
                System.out.println("Product Name: " + data.getDatabaseProductName());
                System.out.println("Version: " + data.getDatabaseProductVersion());

                // Gọi stored procedure với tham số mã sinh viên
                try (CallableStatement cs = sConn.prepareCall(spCall)) {
                    // Thay thế "SV001" bằng giá trị thực của mã sinh viên
                    cs.setString(1, "N21DCCN067");
                    ResultSet rs = cs.executeQuery();

                    // Lấy và hiển thị dữ liệu từ ResultSet
                    while (rs.next()) {
                        String tenMonHoc = rs.getString("TENMH");
                        Date ngayThi = rs.getDate("NGAYTHI");
                        int lanThi = rs.getInt("LANTHI");
                        int soCau = rs.getInt("SOCAU");
                        int thoiLuong = rs.getInt("THOILUONG");

                        System.out.println("Tên môn học: " + tenMonHoc);
                        System.out.println("Ngày thi: " + ngayThi);
                        System.out.println("Lần thi: " + lanThi);
                        System.out.println("Số câu: " + soCau);
                        System.out.println("Thời lượng: " + thoiLuong);
                    }

                    System.out.println("Stored procedure được gọi và dữ liệu được lấy thành công");
                } catch (SQLException ex) {
                    System.out.println("Không thể gọi stored procedure hoặc lấy dữ liệu\n" + ex);
                }

            } catch (SQLException ex) {
                System.out.println("Không thể kết nối đến CSDL \n" + ex);
            }
        }
    }
}
