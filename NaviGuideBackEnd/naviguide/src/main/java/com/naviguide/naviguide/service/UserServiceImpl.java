package com.naviguide.naviguide.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.naviguide.naviguide.model.Resources;
import com.naviguide.naviguide.model.Users;
import com.naviguide.naviguide.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    //Google Drive Upload Variables
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    private static final  String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    //Google Drive Upload code

    private static String getPathToGoogleCredentials(){
        String currentDirectory =System.getProperty("user.dir");
        Path filePath= Paths.get(currentDirectory,"cred.json");
        return filePath.toString();
    }

    @Override
    public Resources uploadImageToDrive(File file)  {
        Resources res=new Resources();
        try{
            String folderId="1zlvocEeJfB9L3xh2wTviMa4IkzBdPOje";
            Drive drive=createDriveService();
            com.google.api.services.drive.model.File fileMetaData=new com.google.api.services.drive.model.File();
            fileMetaData.setName(file.getName());
            fileMetaData.setParents(Collections.singletonList(folderId));
            FileContent mediaContent =new FileContent("image/jpeg",file);
            com.google.api.services.drive.model.File uploadedFile=drive.files().create(fileMetaData,mediaContent)
                    .setFields("id").execute();
            String imageUrl="https://drive.google.com/thumbnail?id="+uploadedFile.getId()+"&sz=w1000";
            System.out.println("Image URL :"+imageUrl);
            file.delete();
            res.setStatus(200);
            res.setMessage("Image successfully Uploaded to Drive");
            res.setUrl(imageUrl);
        }catch (Exception error){
            System.out.println(error.getMessage());
            res.setStatus(500);
            res.setMessage(error.getMessage());
        }

        return res;
    }


    private Drive createDriveService() throws GeneralSecurityException, IOException {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));


        Drive service = new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                credential)
                .setApplicationName("naviguide")
                .build();

        return service;
    }




    @Override
    public String save(Users user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user).getUserid();
    }

    @Override
    public Users getUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    @Override
    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<Users> getAllUsersByOrg(String organizationName) {
        return userRepository.findByorganizationName(organizationName);
    }
    @Override
    public Users getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void update(Users user) {
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String userName) {
        userRepository.deleteByUserName(userName);
    }

    @Override
    public List<Users> getByAccCatagory(String accCategory) {
        return userRepository.findByAccCategory(accCategory);
    }

    @Override
    public List<Users> getAccountsByUserType(String userType) {
        return userRepository.findByUserType(userType);
    }

    @Override
    public String normalsave(Users user) {
        userRepository.save(user);
        return null;
    }

    @Override
    public Iterable<Users> listAll() {
        return this.userRepository.findAll();
    }

    @Override
    public List<Users> getAllUsers() {

        return userRepository.findAll();
    }

    @Override
    public List<String> getAllUserEmails() {
        List<String> userEmails = new ArrayList<>();
        Iterable<Users> allUsers = userRepository.findAll();

        for (Users user : allUsers) {
            userEmails.add(user.getEmail());
        }

        return userEmails;
    }

    @Override
    public Page<Users> search(String firstName, String lastName, String organizationName, String accCategory, String proffesion, Pageable pageable) {
        Query query=new Query().with(pageable);
        List<Criteria> criteria=new ArrayList<>();

        if(firstName!=null && !firstName.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(firstName,"i"));
        }

        if(lastName!=null && !lastName.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(lastName,"i"));
        }

        if(organizationName!=null && !organizationName.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(organizationName,"i"));
        }

        if(accCategory!=null && !accCategory.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(accCategory,"i"));
        }

        if(proffesion!=null && !proffesion.isEmpty()){
            criteria.add(Criteria.where("firstName").regex(proffesion,"i"));
        }

        if(!criteria.isEmpty()){
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));
        }

        Page<Users> users= PageableExecutionUtils.getPage(
                mongoTemplate.find(query,Users.class), pageable, ()->mongoTemplate.count(query.skip(0).limit(0),Users.class));
        return users;
    }



        @Override
        public void changePassword(String userName, String newPassword) {
            Users user = userRepository.findByUserName(userName);
            if (user != null) {
                user.setPassword(passwordEncoder.encode(newPassword));
                userRepository.save(user);
            } else {
                // Handle case when user is not found
                throw new RuntimeException("User not found");
            }
        }





}


