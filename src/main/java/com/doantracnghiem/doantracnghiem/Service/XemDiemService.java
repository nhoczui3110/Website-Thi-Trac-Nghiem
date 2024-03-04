package com.doantracnghiem.doantracnghiem.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doantracnghiem.doantracnghiem.DTO.ThiInfoDTO;
import com.doantracnghiem.doantracnghiem.Entity.DangKyThi;
import com.doantracnghiem.doantracnghiem.Repository.DangKyThiRepository;
import com.doantracnghiem.doantracnghiem.Repository.ThiRepository;

@Service
public class XemDiemService {
    @Autowired
    DangKyThiRepository dangKyThiRepository;
    @Autowired
    ThiRepository thiRepository;

    public List<DangKyThi> getListDangKyThi(String maGv, String malop) {
        System.out.println(maGv);
        return dangKyThiRepository.findByMagvAndMaLop(maGv, malop);
    }

    public List<String> getMaLop(String maGv) {
        return dangKyThiRepository.findMaLopByMaGv(maGv);
    }

    public List<ThiInfoDTO> getThiInfoFromIddk(int iddk) {
        return thiRepository.findThiInfoFromIddk(iddk);
    }
}
