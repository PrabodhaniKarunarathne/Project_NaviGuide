package com.naviguide.naviguide.repository;

import com.naviguide.naviguide.model.Reviews;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends MongoRepository<Reviews,String> {

    List<Reviews> findByResourceperson(String resourceperson);
}
