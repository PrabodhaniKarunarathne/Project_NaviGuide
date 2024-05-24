package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.News;
import com.naviguide.naviguide.repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsServiceImpl implements NewsService {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private NewsRepository newsRepository;


    @Override
    public String save(News news) {
        return newsRepository.save(news).getNewsId();
    }

    @Override
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public void deleteNewsByNewsTopicAndNewsPublishDate(String newsTopic, String newsPublishDate) {
        newsRepository.deleteByNewsTopicAndNewsPublishDate(newsTopic,newsPublishDate);
    }
}
