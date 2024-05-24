import React, { useState, useEffect, useRef } from "react";
import {useParams } from 'react-router-dom';
import axios from 'axios';
import "./ProfileView.css";
import { Link } from "react-router-dom";
import EventsView from "../EventsView/EventsView";
import RateReadOnly from "../RateReadOnly/RateReadOnly";
import NavigationBar from "../NavigationBar/NavigationBar";
import ContactForm from "../ContactForm/ContactFrom";
import Reviews from "../Reviews/Reviews";
import AddReview from "../Reviews/AddReviews";

const ProfileView = () => {
  const {userName} = useParams();
  const [user, setUser] = useState(null);
  const [events,setEvents]=useState(null);
  const [error, setError] = useState(null);
  const [contactPressed, setContactPressed] = useState("");
  const contactFormRef = useRef(null);
  const [loggedUser, setLoggedUser] = useState("");
  const [activeButton, setActiveButton] = useState(0);
  const [addReviewClicked,setAddReviewClicked]=useState(null); 
  const addReviewFormRef = useRef(null);
  

  

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex); 
 };
 useEffect(() => {
  const handleClickOutside = (event) => {
      if (addReviewFormRef.current && !addReviewFormRef.current.contains(event.target)) {
          if (addReviewClicked && event.target.closest("#addReviewFormWrapper") === null) {
              setAddReviewClicked("");
          }
      }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
      document.removeEventListener("mousedown", handleClickOutside);
  };
}, [addReviewClicked]);

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (contactFormRef.current && !contactFormRef.current.contains(event.target)) {
            if (contactPressed && event.target.closest("#contactFormWrapper") === null) {
                setContactPressed("");
            }
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [contactPressed]);

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



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseuser = await axios.get(`http://localhost:8080/api/user/getuser/${userName}`);
        setUser(responseuser.data);

      } catch (error) {
        setError('An error occurred while fetching user data. Please try again.');
        console.error('Failed to fetch user data: ', error);
      }
    };

    const handleEventSearch=(e)=>{
      e.preventDefault();
      fetch(`http://localhost:8080/api/event/getevents/${userName}`)
          .then(responseevent =>{
            if(responseevent.ok){
              throw new Error('Failed to fetch data');
            }
            return responseevent.json();
          })
          .then(data => {
            setEvents(data);
            setError(null);
          })
          .catch(error =>{
              console.error('Error fetching data:', error);
              setError('Failed to fetch data. Please try again.');
          });
    };
    

    fetchUserData();
  }, [userName]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div id="navbardiv">
        <NavigationBar/>
      </div>
      <div class="profileViewContainer">
        <div id="pvcover">
          <img id="pvcoverimg" src={user.coverpic}/>
        </div>
        <div class="pvcontainer">

          <div class="image">
              <img id="pvuserimg" src={user.propic} class="rounded ml-5" width="155" />
              <div id="pvcontacts">
              <h5>{user.phoneNumber} </h5>
              <h5>{user.email}</h5>
              <button id="pvbtn" onClick={() => setContactPressed(true)}>Contact</button>
              
            </div>
          </div>
          <div className="pvdetails">
            <div id="pvusername">
              <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <div id="pvposistion">
              <h3>{user.proffesion}</h3>
            </div>
            
            <div id="pvprofilelinks">
              <Link to={user.facebook} className="fblink">Facebook</Link>
              <Link to={user.linkedin} className="fblink">LinkedIn</Link>
              <Link to={user.youtube} className="fblink">Youtube</Link>
            </div>
            
            

          </div> 
          <div className="pvrating">
            <div id="pvratecard">
              
              <div>
                <RateReadOnly userRating={user.userRating} />
              </div>
            </div>
          </div>
          
             
        </div>
        
      </div>
      <div id="pveventsprofile">


        
        <div id="pvtabbtnsprofile">
              
              {['Events', 'Reviews'].map((buttonText, index) => (
                <button
                  key={index}
                  className={`pdbtn ${activeButton === index ? 'active' : ''}`}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonText}
                </button>
              ))}
          </div>      

          <div>

          </div>
         
          {contactPressed===true?(
            
            <div ref={addReviewFormRef} id="addReviewFormWrapper">
               <hr/>
            <ContactForm user={user} loggeduser={loggedUser} />
            </div>
        ):(
            <div></div>
        )}
          <hr/>
          {activeButton === 0 && (
            <div>
              <h1 className="pveventstopics">Events hold by {user.firstName}</h1>
                  <EventsView user={user}/>
            </div>
    
          )}
          {activeButton === 1 && (
            <div>
              <button className="pdbtn" id="howfeel">Add How you Feels </button>
                <div ref={contactFormRef} id="contactFormWrapper">
                  <AddReview user={user}/>
                </div>
                <Reviews user={user}/>   
            </div>
                
          )}
          
          
          

          

      </div>
       
    </section>
  );
};

export default ProfileView;

