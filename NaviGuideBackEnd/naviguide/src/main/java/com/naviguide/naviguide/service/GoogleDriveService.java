package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Resources;

import java.io.File;
import java.util.List;

public interface GoogleDriveService {
    Resources uploadImageToDrive(List<File> file, String parentFolderID);
}

