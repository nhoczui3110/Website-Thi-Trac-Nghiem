package com.doantracnghiem.doantracnghiem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Entity.GiangVien;
import com.doantracnghiem.doantracnghiem.Entity.NhanVien;
import com.doantracnghiem.doantracnghiem.Repository.GiangVienRepository;
import com.doantracnghiem.doantracnghiem.Repository.NhanVienRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.ParameterMode;
import jakarta.persistence.StoredProcedureQuery;
import jakarta.transaction.Transactional;

@Service
public class DangNhapService {
    @Autowired
    private NhanVienRepository nhanVienRepository;
    @Autowired
    private GiangVienRepository giangVienRepository;
    @Autowired
    private EntityManager entityManager;

    @Transactional
    public int checkAccount(String username, String password) {
        StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("check_account");

        // Đăng ký tham số đầu vào
        storedProcedure.registerStoredProcedureParameter("username", String.class, ParameterMode.IN);
        storedProcedure.registerStoredProcedureParameter("password", String.class, ParameterMode.IN);
        // Đăng ký tham số output kiểu INTEGER
        storedProcedure.registerStoredProcedureParameter("result", Integer.class, ParameterMode.OUT);

        // Đặt giá trị cho các tham số đầu vào
        storedProcedure.setParameter("username", username);
        storedProcedure.setParameter("password", password);

        // Thực thi stored procedure
        storedProcedure.execute();

        // Lấy giá trị trả về
        Integer result = (Integer) storedProcedure.getOutputParameterValue("result");

        // Xử lý kết quả
        if (result != null) {
            return result;
        } else {
            // Xử lý trường hợp giá trị null hoặc không tồn tại
            return -1; // hoặc giá trị mặc định khác
        }
    }

    public NhanVien getUserByUsernameNhanVien(String username) {
        return nhanVienRepository.findUserByUsername(username);
    }

    public GiangVien getUserByUsernameGiangVien(String username) {
        return giangVienRepository.findUserByUserName(username);
    }

}
