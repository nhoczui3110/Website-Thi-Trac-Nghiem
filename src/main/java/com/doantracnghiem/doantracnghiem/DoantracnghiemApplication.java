package com.doantracnghiem.doantracnghiem;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import com.doantracnghiem.doantracnghiem.Service.DangKyService;
import com.doantracnghiem.doantracnghiem.Service.DangNhapService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DoantracnghiemApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(DoantracnghiemApplication.class, args);
		DangNhapService dangNhapService = context.getBean(DangNhapService.class);
		System.out.println("=============================\nSINHVIEN:");
		System.out.println(dangNhapService.checkAccount("quang", "113"));
		System.out.println("=========================");
		// ((ConfigurableApplicationContext) context).close();
	}

}
