package com.naviguide.naviguide.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "news")
public class News implements Serializable {
    private String newsId;
    private String newsTopic;
    private String newsDescription;
    private String newsPublishDate;
    private List<String> newsImages;

    public String getNewsId() {
        return newsId;
    }

    public void setNewsId(String newsId) {
        this.newsId = newsId;
    }

    public String getNewsTopic() {
        return newsTopic;
    }

    public void setNewsTopic(String newsTopic) {
        this.newsTopic = newsTopic;
    }

    public String getNewsDescription() {
        return newsDescription;
    }

    public void setNewsDescription(String newsDescription) {
        this.newsDescription = newsDescription;
    }

    public String getNewsPublishDate() {
        return newsPublishDate;
    }

    public void setNewsPublishDate(String newsPublishDate) {
        this.newsPublishDate = newsPublishDate;
    }

    public List<String> getNewsImages() {
        return newsImages;
    }

    public void setNewsImages(List<String> newsImages) {
        this.newsImages = newsImages;
    }


}
