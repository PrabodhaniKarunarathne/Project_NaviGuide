package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Reviews;

import java.util.List;

public interface ReviewService {
    String save(Reviews review);

    List<Reviews> getReviewByResourceperson(String resourceperson);
}
