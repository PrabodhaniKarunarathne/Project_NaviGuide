package com.naviguide.naviguide.repository;

import com.naviguide.naviguide.model.News;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends MongoRepository<News,String> {

    void deleteByNewsTopicAndNewsPublishDate(String newsTopic, String newsPublishDate);

}
