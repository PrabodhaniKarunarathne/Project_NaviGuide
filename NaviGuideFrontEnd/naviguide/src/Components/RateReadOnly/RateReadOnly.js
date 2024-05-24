import React from "react";
import { FaStar } from 'react-icons/fa';
import "./RateReadOnly.css";

const RateReadOnly = ({ userRating }) => {
    // Ensure that the rating is within the range of 0 to 5
    const rating = Math.max(0, Math.min(5, userRating));

    return (
        <div id="ratestars">
             <h3>Rating : ({userRating}/5)</h3> 
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;

                // Determine the color of the star based on the current rating and userRating
                const color = currentRating <= rating ? "#ffc107" : "#e4e5e9";
                
                return (
                    <span key={index} style={{ color }}>
                        <FaStar />
                    </span>
                );
            })}
              
            
        </div>
    );
};

export default RateReadOnly;
