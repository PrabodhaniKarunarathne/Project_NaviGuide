package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Events;
import com.naviguide.naviguide.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private EventRepository eventRepository;
//
//    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
//    private static final String SERVICE_ACCOUNT_KEY_PATH = getPathToGoogleCredentials();
//
//    private static String getPathToGoogleCredentials(){
//        String currentDirectory =System.getProperty("user.dir");
//        Path filePath= Paths.get(currentDirectory,"cred.json");
//        return filePath.toString();
//    }
//
//    private Drive createDriveService() throws GeneralSecurityException, IOException {
//        GoogleCredential credential = GoogleCredential.fromStream(new FileInputStream(SERVICE_ACCOUNT_KEY_PATH))
//                .createScoped(Collections.singleton(DriveScopes.DRIVE));
//        return new Drive.Builder(GoogleNetHttpTransport.newTrustedTransport(), JSON_FACTORY, credential).build();
//    }
//
//    public Resources createFolderInDrive(String folderName, String parentFolderId) {
//        Resources res = new Resources();
//        try {
//            Drive drive = createDriveService();
//
//            // Create a new folder
//            File folderMetadata = new File();
//            folderMetadata.setName(folderName);
//            folderMetadata.setMimeType("application/vnd.google-apps.folder");
//            if (parentFolderId != null && !parentFolderId.isEmpty()) {
//                folderMetadata.setParents(Collections.singletonList(parentFolderId));
//            }
//
//            // Execute the request to create the folder
//            File newFolder = drive.files().create(folderMetadata)
//                    .setFields("id")
//                    .execute();
//
//            String folderId = newFolder.getId();
//            res.setStatus(200);
//            res.setMessage("Folder created successfully");
//            res.setUrl("https://drive.google.com/drive/folders/" + folderId);
//            res.setImageId(folderId); // Store folder ID in imageId field (could be a dedicated field)
//
//        } catch (Exception error) {
//            res.setStatus(500);
//            res.setMessage(error.getMessage());
//        }
//        return res;
//    }
//
//    // Function to upload image to the specified Google Drive folder
//    public Resources uploadImageToFolderInDrive(File file, String folderId) {
//        Resources res = new Resources();
//        try {
//            Drive drive = createDriveService();
//
//            // Set file metadata
//            File fileMetadata = new File();
//            fileMetadata.setName(file.getName());
//            fileMetadata.setParents(Collections.singletonList(folderId));
//
//            // Set file content
//            FileContent mediaContent = new FileContent("image/jpeg", file);
//
//            // Upload the file to the specified folder
//            File uploadedFile = drive.files().create(fileMetadata, mediaContent)
//                    .setFields("id")
//                    .execute();
//
//            String imageUrl = "https://drive.google.com/thumbnail?id=" + uploadedFile.getId() + "&sz=w1000";
//            res.setStatus(200);
//            res.setMessage("Image successfully uploaded to Drive");
//            res.setUrl(imageUrl);
//
//        } catch (Exception error) {
//            res.setStatus(500);
//            res.setMessage(error.getMessage());
//        }
//        return res;
//    }
//}







    @Override
    public String save(Events event) {
        return eventRepository.save(event).getEventName();
    }

    @Override
    public void deleteEvent(String userName, String eventName, String eventDate) {
        eventRepository.deleteByUserNameAndEventNameAndEventDate(userName, eventName, eventDate);
    }

    @Override
    public void update(Events event) {
        eventRepository.save(event);
    }

    @Override
    public Events getEventByUserNameandEventNameandEventDate(String userName, String eventName, String eventDate) {
        return eventRepository.findByUserNameAndEventNameAndEventDate(userName,eventName,eventDate);
    }

    @Override
    public List<Events> getEventByUserNameandEventStatus(String userName, String eventStatus) {
        return eventRepository.findByUserNameAndEventStatus(userName,eventStatus);
    }


}
