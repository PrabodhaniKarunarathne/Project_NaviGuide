import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import "./RateUser.css";
import validator from "validator";
import {FaStar} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

const RateUser = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const totalStars = 5; 

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRating(value > totalStars ? totalStars : value); 
  };

  const handleStarClick = (currentRating) => {
    setRating(currentRating);
  };
  
  return(
    <div id="ratestars">
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input 
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleStarClick(currentRating)}
            />
            <span
              className="stars"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#4e4e4e"
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
          
        );
      })}
     
    </div>
  );
}

export default RateUser;
