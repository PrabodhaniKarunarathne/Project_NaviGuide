package com.naviguide.naviguide.repository;

import com.naviguide.naviguide.model.Events;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Events,String> {

    void deleteByUserNameAndEventNameAndEventDate(String userName, String eventName, String eventDate);

    Events findByUserNameAndEventNameAndEventDate(String userName, String eventName, String eventDate);

    List<Events> findByUserNameAndEventStatus(String userName, String eventStatus);
}
