package com.doantracnghiem.doantracnghiem;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import com.doantracnghiem.doantracnghiem.Repository.LichThiRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DoantracnghiemApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(DoantracnghiemApplication.class, args);
		// LichThiRepository lichThi = context.getBean(LichThiRepository.class);
		// lichThi.layLichThi("N21DCCN067");
		// ((ConfigurableApplicationContext) context).close();
	}

}
