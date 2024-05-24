package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.News;

import java.util.List;

public interface NewsService {
    String save(News news);

    List<News> getAllNews();

    void deleteNewsByNewsTopicAndNewsPublishDate(String newsTopic, String newsPublishDate);
}
