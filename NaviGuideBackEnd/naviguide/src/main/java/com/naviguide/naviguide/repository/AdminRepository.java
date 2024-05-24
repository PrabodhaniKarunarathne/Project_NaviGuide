package com.naviguide.naviguide.repository;

import com.naviguide.naviguide.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends MongoRepository<Admin, String> {
    void deleteByAdminName(String adminName);

    Admin findByAdminName(String adminName);
}
