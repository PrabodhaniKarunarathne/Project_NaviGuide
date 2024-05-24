import React from "react";
import "./Reviews.css";
import ReviewReadOnly from "../RateReadOnly/ReviewReadOnly";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const Reviews=({user})=>{
    const [error, setError] = useState(null);
    const [reviewsList, setReviewsList] = useState(null);

    useEffect(() => {
        const fetchReviewList = async () => {
          try {
            const responseReviews = await axios.get(`/api/review/getreviews/${user.userName}`);
            setReviewsList(responseReviews.data);
          } catch (error) {
            setError(error.message);
            console.error('Failed to fetch Reviews : ', error);
          }
        };
        fetchReviewList();
      }, [user]); 

    return(
        <section id="reviewSection">
            <h1 className="pveventstopics">Reviews</h1>
            <ul>
                {reviewsList && reviewsList.length>0?(reviewsList.map(review=>(
                    <li key={review.reviewId} className="adminlist">
                            <div className="ReviewDiv">
                        <div className="eventcard">
                            <div id="eventNameSchedule">
                                <div id="namesandbtnreview">
                                    <h1 className="eventnameheduled">{review.stakeholder}</h1>
                                    <h5>{review.date}</h5>
                                    <ReviewReadOnly userRating={review.rate} />  
                                </div>
                                
                            </div>
                            <div id="eventDetails">
                                <p>{review.comment}</p>
                            </div>
                                                
                            </div>
                    
                        </div>
                    </li>
                ))

                ):(
                    <div>

                    </div>
                )}
            </ul>
            
            
           
        </section>
    );
}

export default Reviews;