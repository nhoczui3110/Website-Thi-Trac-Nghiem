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
		// DangNhapService dangNhapService = context.getBean(DangNhapService.class);
		// System.out.println("================== ===========\nSINHVIEN:");
		// System.out.println(dangNhapService.checkAccount("quang", "113"));
		// System.out.println("=========================");
	}

}
