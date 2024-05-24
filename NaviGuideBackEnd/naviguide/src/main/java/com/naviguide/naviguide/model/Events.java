package com.naviguide.naviguide.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "events")
public class Events implements Serializable {


    private String userName;
    private String eventName;
    private String eventPostedDate;
    private String eventDescription;
    private String eventDate;
    private String eventAudiance;
    private String eventVenue;
    private List<String> eventImages;

    public String getEventStakeHolder() {
        return eventStakeHolder;
    }

    public void setEventStakeHolder(String eventStakeHolder) {
        this.eventStakeHolder = eventStakeHolder;
    }

    private String eventStakeHolder;

    private String eventStatus;

    public String getEventAudiance() {
        return eventAudiance;
    }

    public void setEventAudiance(String eventAudiance) {
        this.eventAudiance = eventAudiance;
    }

    public String getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(String eventStatus) {
        this.eventStatus = eventStatus;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEventPostedDate() {
        return eventPostedDate;
    }

    public void setEventPostedDate(String eventPostedDate) {
        this.eventPostedDate = eventPostedDate;
    }


    public String getEventVenue() {
        return eventVenue;
    }

    public void setEventVenue(String eventVenue) {
        this.eventVenue = eventVenue;
    }

    public List<String> getEventImageUrls() {
        return eventImages;
    }

    public void setEventImageUrls(List<String> eventImageUrls) {
        this.eventImages = eventImageUrls;
    }

    public Events(String eventName,String eventDescription,String eventVenue,String eventDate,String eventstakeHolder){
        this.eventDate=eventDate;
        this.eventName=eventName;
        this.eventDescription=eventDescription;
        this.eventVenue=eventVenue;
        this.eventAudiance=eventstakeHolder;
    }
    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getStakeHolder() {
        return eventAudiance;
    }

    public void setStakeHolder(String stakeHolder) {
        this.eventAudiance = stakeHolder;
    }

}
