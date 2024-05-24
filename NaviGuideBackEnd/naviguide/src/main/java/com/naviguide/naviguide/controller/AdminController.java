//package com.naviguide.naviguide.controller;
//
//import com.naviguide.naviguide.model.Admin;
//import com.naviguide.naviguide.service.AdminService;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
//@RequestMapping("/api/admin")
//
//public class AdminController {
//    private HttpSession session;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private AdminService adminService;
//
//    @PostMapping(value = "/saveadmin")
//    private String saveAdmin(@RequestBody Admin admin) {
//        return adminService.saveAdmin(admin);
//    }
//
//    @GetMapping(value = "/getalladmins")
//    public List<Admin> getAllAdmins(HttpSession session) {
//        System.out.println("Session is working" + session.getAttribute("admin"));
//        return adminService.getAllAdmins();
//
//    }
//
//    @DeleteMapping(value = "/deleteadmin/{adminName}")
//    public void deleteAdmin(@PathVariable("adminName") String adminName) {
//        adminService.deleteAdminByAdminName(adminName);
//    }
//
//    @PutMapping("/matchsuperadminpassword")
//    public ResponseEntity<String> matchSuperAdminPassword(@RequestParam String password, @RequestParam String adminName) {
//        String title = "super";
//        List<Admin> adminList = adminService.getAllAdmins();
//        boolean passwordmatch=false;
//        for (Admin admin : adminList) {
//            if (admin.getTitle().matches(title) && admin.getAdminName().matches(adminName)&& passwordEncoder.matches(password, admin.getPassword())) {
//                passwordmatch=true;
//            }
//        }
//        if(passwordmatch==true){
//            return ResponseEntity.ok("Password match");
//
//        }else{
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
//
//        }
//
//    }
//    @PutMapping("/matchadminpassword")
//    public ResponseEntity<String> matchAdminPassword(@RequestParam String password,@RequestParam String adminName){
//        System.out.println("Invoked");
//        String title="normal";
//        List<Admin> adminList=adminService.getAllAdmins();
//        boolean passwordmatch=false;
//        for (Admin admin : adminList) {
//            if (admin.getTitle().matches(title) && admin.getAdminName().matches(adminName)&& passwordEncoder.matches(password, admin.getPassword())) {
//                passwordmatch=true;
//            }
//        }
//        if(passwordmatch==true){
//            return ResponseEntity.ok("Password match");
//
//        }else{
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
//
//        }
//
//    }
//
//    @GetMapping("/countadmins")
//    public int countAdmins(){
//        List<Admin> adminList = adminService.getAllAdmins();
//        int adminCount=adminList.size();
//
//        return adminCount;
//    }
//
//    @GetMapping(value = "/getadminbyadminname/{adminName}")
//    public Admin getAdminByAdminName(@PathVariable("adminName") String adminName){
//        return adminService.getAdminByAdminName(adminName);
//    }
//
//    @PostMapping(value = "/login")
//    public ResponseEntity<String> login(@RequestBody Admin loginAdmin, HttpSession session) {
//        String adminName = loginAdmin.getAdminName();
//        String password = loginAdmin.getPassword();
//        Admin admin = adminService.getAdminByAdminName(adminName);
//
//        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
//            session.setAttribute("admin", admin);
//            System.out.println("Session created :"+session.getAttribute("admin"));
//            System.out.println("Session Id :"+session.getId());
//            return ResponseEntity.ok("Login Successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
//        }
//    }
//
//    @GetMapping(value = "/logout")
//    public ResponseEntity<String> logout(HttpSession session){
//        session.invalidate();
//        return ResponseEntity.ok("Logout Successful");
//    }
//
//    @GetMapping("/profile")
//    public Admin profile(HttpSession session) {
//        Admin admin = (Admin) session.getAttribute("admin");
//        System.out.println("Session in profile worked "+session.getAttribute("admin"));
//        if (admin != null) {
//            System.out.println("there is logged admin :"+session.getAttribute("admin"));
//            System.out.println("Session Id :"+session.getId());
//            return admin;
//        } else {
//            System.out.println("Error in keep session and it be null.");
//            return null;
//        }
//    }
//
//
//}

package com.naviguide.naviguide.controller;

import com.naviguide.naviguide.model.Admin;
import com.naviguide.naviguide.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminService adminService;

    @PostMapping(value = "/saveadmin")
    private String saveAdmin(@RequestBody Admin admin) {
        return adminService.saveAdmin(admin);
    }

    @GetMapping(value = "/getalladmins")
    public List<Admin> getAllAdmins(HttpSession session) {
        System.out.println("Session is working" + session.getAttribute("admin"));
        return adminService.getAllAdmins();
    }

    @DeleteMapping(value = "/deleteadmin/{adminName}")
    public void deleteAdmin(@PathVariable("adminName") String adminName) {
        adminService.deleteAdminByAdminName(adminName);
    }

    @PutMapping("/matchsuperadminpassword")
    public ResponseEntity<String> matchSuperAdminPassword(@RequestParam String password, @RequestParam String adminName) {
        String title = "super";
        List<Admin> adminList = adminService.getAllAdmins();
        boolean passwordmatch=false;
        for (Admin admin : adminList) {
            if (admin.getTitle().matches(title) && admin.getAdminName().matches(adminName)&& passwordEncoder.matches(password, admin.getPassword())) {
                passwordmatch=true;
            }
        }
        if(passwordmatch==true){
            return ResponseEntity.ok("Password match");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
        }
    }

    @PutMapping("/matchadminpassword")
    public ResponseEntity<String> matchAdminPassword(@RequestParam String password,@RequestParam String adminName){
        System.out.println("Invoked");
        String title="normal";
        List<Admin> adminList=adminService.getAllAdmins();
        boolean passwordmatch=false;
        for (Admin admin : adminList) {
            if (admin.getTitle().matches(title) && admin.getAdminName().matches(adminName)&& passwordEncoder.matches(password, admin.getPassword())) {
                passwordmatch=true;
            }
        }
        if(passwordmatch==true){
            return ResponseEntity.ok("Password match");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect password");
        }
    }

    @GetMapping("/countadmins")
    public int countAdmins(){
        List<Admin> adminList = adminService.getAllAdmins();
        int adminCount=adminList.size();
        return adminCount;
    }

    @GetMapping(value = "/getadminbyadminname/{adminName}")
    public Admin getAdminByAdminName(@PathVariable("adminName") String adminName){
        return adminService.getAdminByAdminName(adminName);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<String> login(@RequestBody Admin loginAdmin, HttpSession session) {
        String adminName = loginAdmin.getAdminName();
        String password = loginAdmin.getPassword();
        Admin admin = adminService.getAdminByAdminName(adminName);

        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            session.setAttribute("admin" , admin);
            System.out.println("Session created :"+session.getAttribute("admin"));
            System.out.println("Session Id :"+session.getId());
            return ResponseEntity.ok("Login Successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or Password");
        }
    }

    @GetMapping(value = "/logout")
    public ResponseEntity<String> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok("Logout Successful");
    }

    @GetMapping("/profile")
    public Admin profile(HttpSession session) {
        Admin admin = (Admin) session.getAttribute("admin");
        System.out.println("Session in profile worked "+session.getAttribute("admin"));
        if (admin != null) {
            System.out.println("there is logged admin :"+session.getAttribute("admin"));
            System.out.println("Session Id :"+session.getId());
            return admin;
        } else {
            System.out.println("Error in keep session and it be null.");
            return null;
        }
    }
}
