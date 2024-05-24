package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Events;

import java.util.List;

public interface EventService {

    String save(Events event);

    void deleteEvent(String userName, String eventName, String eventDate);

    void update(Events event);

    Events getEventByUserNameandEventNameandEventDate(String userName, String eventName, String eventDate);
    List<Events> getEventByUserNameandEventStatus(String userName, String eventStatus);
}
