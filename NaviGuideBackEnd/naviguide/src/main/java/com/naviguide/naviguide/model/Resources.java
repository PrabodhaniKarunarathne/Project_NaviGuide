package com.naviguide.naviguide.model;


import lombok.Data;

import java.util.List;

@Data

public class Resources {
    private int status;
    private String message;
    private String url;

    private List<String> ProImgURLList;
    private String imageId;

    private String folderId;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getProImgURLList() {
        return ProImgURLList;
    }

    public void setProImgURLList(List<String> proImgURLList) {
        ProImgURLList = proImgURLList;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public String getFolderId() {
        return folderId;
    }

    public void setFolderId(String folderId) {
        this.folderId = folderId;
    }

    public List<String> getEventImgURLlist() {
        return eventImgURLlist;
    }

    public void setEventImgURLlist(List<String> eventImgURLlist) {
        this.eventImgURLlist = eventImgURLlist;
    }

    private List<String> eventImgURLlist;




}
