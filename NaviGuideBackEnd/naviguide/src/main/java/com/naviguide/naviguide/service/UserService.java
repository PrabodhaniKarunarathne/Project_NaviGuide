package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Resources;
import com.naviguide.naviguide.model.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    Resources uploadImageToDrive(java.io.File file);

    String save(Users user);

    Users getUserByUserName(String userName);

    abstract Users getByEmail(String email);

    void update(Users user);

    void deleteUser(String userName);

    List<Users> getByAccCatagory(String accCategory);

    Page<Users> search(String firstName, String lastName, String organizationName, String accCategory, String proffesion, Pageable pageable);

    Iterable<Users> listAll();

    List<Users> getAllUsers();

    List<String> getAllUserEmails();

    Users getUserByEmail(String email);

    List<Users> getAllUsersByOrg(String organizationName);

    void changePassword(String userName, String newPassword);


    List<Users> getAccountsByUserType(String userType);


    String normalsave(Users user);
}
