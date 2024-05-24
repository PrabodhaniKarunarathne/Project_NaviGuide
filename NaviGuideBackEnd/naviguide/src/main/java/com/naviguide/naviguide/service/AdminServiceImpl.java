package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Admin;
import com.naviguide.naviguide.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void deleteAdminByAdminName(String adminName) {
        adminRepository.deleteByAdminName(adminName);

    }

    @Override
    public String saveAdmin(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin).getAdminId();
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public Admin getAdminByAdminName(String adminName) {
        return adminRepository.findByAdminName(adminName);
    }
}
