package com.naviguide.naviguide.controller;

import com.naviguide.naviguide.model.Reviews;
import com.naviguide.naviguide.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" }, allowedHeaders = "*", allowCredentials = "true")
@RequestMapping("/api/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping(value = "/save")
    private String saveReview(@RequestBody Reviews review){
        return reviewService.save(review);
    }

    @GetMapping (value = "/getreviews/{resourceperson}")
    public List<Reviews> getReviewByResourceperson(@PathVariable ("resourceperson") String resourceperson){
        return reviewService.getReviewByResourceperson(resourceperson);
    }

    @GetMapping(value ="/getreviewcount/{resourceperson}")
    public int reviewcount(@PathVariable ("resourceperson") String resourceperson){
        List<Reviews> listreviews =reviewService.getReviewByResourceperson(resourceperson);
        return  listreviews.size();

    }

    @GetMapping(value ="/amountreview/{resourceperson}")
    public float totalreview(@PathVariable ("resourceperson") String resourceperson){
        List<Reviews> listreviews =reviewService.getReviewByResourceperson(resourceperson);
        float total=0;
        for(Reviews review:listreviews){
            total=total+review.getRate();
        }
        System.out.println(total);
        return total;
    }




}
