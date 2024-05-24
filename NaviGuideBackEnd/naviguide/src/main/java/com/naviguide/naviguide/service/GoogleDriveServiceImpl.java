package com.naviguide.naviguide.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.naviguide.naviguide.model.Resources;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
public class GoogleDriveServiceImpl implements GoogleDriveService {
    private Drive drive;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();

    public GoogleDriveServiceImpl() throws IOException, GeneralSecurityException {
        this.drive = createDriveService();
    }

    private Drive createDriveService() throws GeneralSecurityException, IOException {
        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
                .createScoped(Collections.singleton(DriveScopes.DRIVE));

        return new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                credential)
                .setApplicationName("naviguide")
                .build();
    }

    private static String getPathToGoogleCredentials(){
        String currentDirectory = System.getProperty("user.dir");
        Path filePath = Paths.get(currentDirectory, "cred.json");
        return filePath.toString();
    }

    public File createFolder(String folderName, String parentFolderId) throws IOException {
        File folderMetadata = new File();
        folderMetadata.setName(folderName);
        folderMetadata.setMimeType("application/vnd.google-apps.folder");
        if (parentFolderId != null) {
            folderMetadata.setParents(Collections.singletonList(parentFolderId));
        }

        return drive.files().create(folderMetadata).execute();
    }

    @Override
    public Resources uploadImageToDrive(List<java.io.File> files, String parentFolderID) {
        Resources res = new Resources();
        String folderId = parentFolderID;
        List<String> eventImgURLlist = new ArrayList<>();
        FileContent mediaContent = new FileContent("image/jpeg", (java.io.File) files);


        try {
            Drive drive = createDriveService();
            for (java.io.File file : files) {
                com.google.api.services.drive.model.File fileMetaData=new com.google.api.services.drive.model.File();
                fileMetaData.setName(file.getName());
                fileMetaData.setParents(Collections.singletonList(folderId));
                File uploadedFile = drive.files().create(fileMetaData, mediaContent)
                        .setFields("id").execute();

                String imageUrl = "https://drive.google.com/thumbnail?id=" + uploadedFile.getId() + "&sz=w1000";
                System.out.println("Image URL: " + imageUrl);
                eventImgURLlist.add(imageUrl);
            }

            // Clear the files list after uploading images
            files.clear();

            res.setEventImgURLlist(eventImgURLlist);
            res.setStatus(200);
            res.setMessage("Images successfully uploaded to Drive");

        } catch (Exception error) {
            System.out.println(error.getMessage());
            res.setStatus(500);
            res.setMessage(error.getMessage());
        }


        return res;
    }

//    @Override
//    public Resources uploadImageToDrive(List<File> files, String parentFolderID) {
//        Resources res = new Resources();
//        String folderId = parentFolderID;
//        List<String> eventImgURLlist = new ArrayList<>();
//
//        try {
//            Drive drive = createDriveService();
//            for (File file : files) {
//                com.google.api.services.drive.model.File fileMetaData=new com.google.api.services.drive.model.File();
//                fileMetaData.setName(file.getName());
//                fileMetaData.setParents(Collections.singletonList(folderId));
//                FileContent mediaContent = new FileContent("image/jpeg", file);
//                File uploadedFile = drive.files().create(fileMetaData, mediaContent)
//                        .setFields("id").execute();
//
//                String imageUrl = "https://drive.google.com/thumbnail?id=" + uploadedFile.getId() + "&sz=w1000";
//                System.out.println("Image URL: " + imageUrl);
//                eventImgURLlist.add(imageUrl);
//            }
//
//            // Clear the files list after uploading images
//            files.clear();
//
//            res.setEventImgURLlist(eventImgURLlist);
//            res.setStatus(200);
//            res.setMessage("Images successfully uploaded to Drive");
//
//        } catch (Exception error) {
//            System.out.println(error.getMessage());
//            res.setStatus(500);
//            res.setMessage(error.getMessage());
//        }
//
//        return res;
//    }



//    public Resources uploadImageToDrive(java.io.File file,String folderName,)  {
//        Resources res=new Resources();
//        try{
//            String folderId="1zlvocEeJfB9L3xh2wTviMa4IkzBdPOje";
//            Drive drive=createDriveService();
//            com.google.api.services.drive.model.File fileMetaData=new com.google.api.services.drive.model.File();
//            fileMetaData.setName(file.getName());
//            fileMetaData.setParents(Collections.singletonList(folderId));
//            FileContent mediaContent =new FileContent("image/jpeg",file);
//            com.google.api.services.drive.model.File uploadedFile=drive.files().create(fileMetaData,mediaContent)
//                    .setFields("id").execute();
//            String imageUrl="https://drive.google.com/thumbnail?id="+uploadedFile.getId()+"&sz=w1000";
//            System.out.println("Image URL :"+imageUrl);
//            file.delete();
//            res.setStatus(200);
//            res.setMessage("Image successfully Uploaded to Drive");
//            res.setUrl(imageUrl);
//            //res.setImageId();
//
//        }catch (Exception error){
//            System.out.println(error.getMessage());
//            res.setStatus(500);
//            res.setMessage(error.getMessage());
//        }
//
//        return res;


    }

