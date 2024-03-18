package com.doantracnghiem.doantracnghiem.Repository;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.doantracnghiem.doantracnghiem.ConnectDataObject.JDBCUtil;
import com.doantracnghiem.doantracnghiem.Data_Transfer_Object.InfoDTO;

@Repository
public class LichThiRepository {

    @Autowired
    private SessionFactory sessionFactory;
    public List<InfoDTO> layLichThi(String masv) {
        List<InfoDTO> lichthi = null ;
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        String hql = "exec xemLichThi "+masv;
        Query<InfoDTO> query = session.createNativeQuery(hql,InfoDTO.class);
        session.getTransaction().commit();
        lichthi = query.getResultList();
        session.close();
        return lichthi;
    }
}
