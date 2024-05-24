package com.naviguide.naviguide.service;

import com.naviguide.naviguide.model.Reviews;
import com.naviguide.naviguide.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public String save(Reviews review) {
        return reviewRepository.save(review).getReviewId();
    }

    @Override
    public List<Reviews> getReviewByResourceperson(String resourceperson) {
        return reviewRepository.findByResourceperson(resourceperson);
    }
}
