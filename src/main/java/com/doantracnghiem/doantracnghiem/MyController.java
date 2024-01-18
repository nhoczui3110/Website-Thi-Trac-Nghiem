package com.doantracnghiem.doantracnghiem;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;

// import ch.qos.logback.core.model.Model;

@Controller
public class MyController {
    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/login")
    public String login() {
        System.out.println("loginn hereeee");
        return "login";
    }

    @PostMapping("/login")
    public String postLogin(@RequestParam(name = "username", defaultValue = "") String username,
            @RequestParam(name = "password", defaultValue = "") String password,
            @RequestParam(name = "remember", defaultValue = "off") String isRemember, Model model) {
        System.out.println(username);
        System.out.println(password);
        System.out.println(isRemember);
        model.addAttribute("result", isRemember);
        return "test";
    }
}
