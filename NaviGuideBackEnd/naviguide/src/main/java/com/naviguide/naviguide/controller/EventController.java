package com.naviguide.naviguide.controller;

import com.naviguide.naviguide.model.Events;
import com.naviguide.naviguide.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/event")
public class EventController {
    @Autowired
    private EventService eventService;


    @GetMapping(value = "/getevent/{userName}/{eventStatus}")
    public List<Events> getEvents(@PathVariable("userName") String userName,
                                 @PathVariable("eventStatus") String eventStatus){
        return eventService.getEventByUserNameandEventStatus(userName,eventStatus);
    }

    @GetMapping(value = "/getevent/{userName}/{eventName}/{eventDate}")
    public Events getEvent(@PathVariable("userName") String userName,
                           @PathVariable("eventName") String eventName,
                           @PathVariable("eventDate") String eventDate){
        return eventService.getEventByUserNameandEventNameandEventDate(userName, eventName, eventDate);
    }

    @DeleteMapping("/deleteevent/{userName}/{eventName}/{eventDate}")
    public void deleteEvent(@PathVariable("userName")  String userName, @PathVariable("eventName") String eventName, @PathVariable("eventDate") String eventDate) {
        eventService.deleteEvent(userName, eventName, eventDate);
    }
    @PostMapping(value = "/save")
    private String saveEvent(@RequestBody Events event){
        return eventService.save(event);
    }

    @PutMapping(value ="/updateevent/{userName}/{eventName}/{eventDate}")
    public Events updateEvent(@RequestBody Events event,
                              @PathVariable("userName") String userName,
                              @PathVariable("eventName") String eventName,
                              @PathVariable("eventDate") String eventDate) {
        event.setEventName(eventName);
        event.setUserName(userName);
        event.setEventDate(eventDate);

        eventService.deleteEvent(userName, eventName, eventDate);
        eventService.update(event);
        return event;
    }

}
