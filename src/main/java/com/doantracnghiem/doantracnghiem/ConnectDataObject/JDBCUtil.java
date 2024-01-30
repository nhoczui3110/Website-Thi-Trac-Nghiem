package com.doantracnghiem.doantracnghiem.ConnectDataObject;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class JDBCUtil {
    public static Connection getConnection(){
        Connection c = null;
        String strDbUrl = "jdbc:sqlserver://localhost:1433;databaseName=WEBTHITRACNGHIEM;encrypt=true;trustServerCertificate=true";
        String username = "sa";
        String password = "123456789";
        try{
            c = DriverManager.getConnection(strDbUrl, username, password);
        }
        catch(SQLException e){
            e.printStackTrace();
        }
        return c;
    } 
    public static void closeConnection(Connection c){
        try{
            if(c!=null){
                c.close();
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
