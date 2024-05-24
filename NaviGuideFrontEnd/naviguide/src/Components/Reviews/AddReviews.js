import React, { useState } from "react";
import "./Reviews.css";
import axios from "axios";
import "../RateUser/RateUser";
import { useEffect } from "react";
import RateUserComponent from "../RateUser/RateUser";

const AddReview = ({ user }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [loggedUser,setLoggedUser]=useState(null);
  const [error,setError]=useState(null);
  const [ratingcount,setRatingcount]=useState(0);
  
  const totalStars = 5;
 

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRating(value > totalStars ? totalStars : value);
    alert(rating);
  };

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const responseUser = await axios.get('/api/user/profile');
            setLoggedUser(responseUser.data);
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch user data: ', error);
        }
    };

  
    fetchUserData();
  }, []);

  const handleStarClick = (currentRating) => {
    setRating(currentRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = {
        resourceperson: user.userName,
        stakeholder: loggedUser.userName,
        rate: rating,
        comment: message,
        date: new Date().toISOString().split("T")[0],
      };

      const response = await axios.post(
        "http://localhost:8080/api/review/save",
        reviewData
      );

      const ratingCountResponse = await axios.get(`/api/review/getreviewcount/${user.userName}`);
        const count=ratingCountResponse.data;
        alert(count);

        const ratingtotal = await axios.get(`/api/review/amountreview/${user.userName}`);
        const totalRating = ratingtotal.data;

        const ratetosave1 = totalRating + rating;
        let ratetosave=ratetosave1/count;
        alert(ratetosave1);
        alert(ratetosave);
        if (count !== 0) {
            ratetosave = ratetosave1 / count;
        } else {
            ratetosave = 0; 
        }

        alert(ratetosave);


      const responseUser = await axios.post(
        `/api/user/setrate/${ratetosave}/${user.userName}`
      );

      console.log("Review saved successfully:", response.data);
      alert("Your Review Submitted!")
      setMessage("");
      setHover(null);
      setRating(null);
      setRatingcount(0);
      
    } catch (error) {
      console.error("Error saving review:", error);
      alert("Error occurred");
    }
  };

  return (
    <section id="reviewSection">
      <form id="ReviewSubmit" onSubmit={handleSubmit}>
        <div className="detailssubcarddelete" id="detailssubcardreview">
          <h1 className="pveventstopics">Add review</h1>
          <div className="topics">
            <div id="topicandclose">
              <button className="devbtn" id="closebtnreview">
                Close
              </button>
              <h2 className="subtopicitem">My Review</h2>
            </div>
            <textarea
              id="aboutme"
              className="inputs"
              name="aboutme"
              maxLength={200}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <h2 className="subtopicitem">How you feel</h2>
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
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#4e4e4e",
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
          </div>
          <input type="submit" className="devbtn" id="addeacc" value="Add review"/>
       
     
        </div>
      </form>
    </section>
  );
};

export default AddReview;
