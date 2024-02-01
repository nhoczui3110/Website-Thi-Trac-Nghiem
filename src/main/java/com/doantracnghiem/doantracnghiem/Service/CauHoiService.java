package com.doantracnghiem.doantracnghiem.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Repository.CauHoiRepository;

@Service
public class CauHoiService {
    @Autowired
    CauHoiRepository cauHoiRepository;

    public String deleteQuestion(int maCauHoi) {
        CauHoi cauHoi = cauHoiRepository.findById(maCauHoi).orElse(null);
        cauHoi.setTrangThaiXoa(true);
        cauHoiRepository.save(cauHoi);
        return "Xóa câu hỏi thành công";
    }
}
