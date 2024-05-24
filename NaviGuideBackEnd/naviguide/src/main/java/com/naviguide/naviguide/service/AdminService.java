package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Admin;

import java.util.List;

public interface AdminService {



    void deleteAdminByAdminName(String adminName);


    String saveAdmin(Admin admin);

    List<Admin> getAllAdmins();

    Admin getAdminByAdminName(String adminName);
}
