package com.naviguide.naviguide.controller;

import com.naviguide.naviguide.model.News;
import com.naviguide.naviguide.service.NewsService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/news")
public class NewsController {
    @Autowired
    private NewsService newsService;

    @PostMapping(value="/savenews")
    private String saveNews(@RequestBody News news){
        return newsService.save(news);
    }

    @GetMapping(value="/getallnews")
    public List<News> getAllNews(HttpSession session){
        return newsService.getAllNews() ;
    }

    @DeleteMapping(value = "/deletenews/{newsTopic}/{newsPublishDate}")
    public void deleteNews(@PathVariable("newsTopic") String newsTopic,@PathVariable("newsPublishDate") String newsPublishDate){
        newsService.deleteNewsByNewsTopicAndNewsPublishDate(newsTopic,newsPublishDate);
    }

    @GetMapping(value = "/countnews")
    public int countNews(){
        List<News> newsCount=newsService.getAllNews();
        int count=newsCount.size();
        return count;
    }




}
