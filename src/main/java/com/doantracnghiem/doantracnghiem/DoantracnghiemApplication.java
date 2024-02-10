package com.doantracnghiem.doantracnghiem;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.transaction.annotation.Transactional;

import com.doantracnghiem.doantracnghiem.Entity.CauHoi;
import com.doantracnghiem.doantracnghiem.Repository.CauHoiRepository;
// import com.doantracnghiem.doantracnghiem.Repository.LichThiRepository;
import com.doantracnghiem.doantracnghiem.Repository.DanhSachCauHoiRepository;
import com.doantracnghiem.doantracnghiem.Repository.LuaChonRepository;
import com.doantracnghiem.doantracnghiem.Service.CauHoiThiService;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpSession;


import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Transactional(readOnly = true)
public class DoantracnghiemApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(DoantracnghiemApplication.class, args);

		DanhSachCauHoiRepository tmp = context.getBean(DanhSachCauHoiRepository.class);
		for (CauHoi a : tmp.layCauHoiThi("mh1", 1)){
			System.out.println(a);
		}
		LuaChonRepository b = context.getBean(LuaChonRepository.class);
		System.out.println(b.findAllByIdch(1));
		CauHoiThiService c = context.getBean(CauHoiThiService.class);
		System.out.println(c.layCauHoiThi("mh1", 1));
		((ConfigurableApplicationContext) context).close();
	}

}
