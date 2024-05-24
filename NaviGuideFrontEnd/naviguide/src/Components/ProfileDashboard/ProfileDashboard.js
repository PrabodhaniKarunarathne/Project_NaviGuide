import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import RateReadOnly from "../RateReadOnly/RateReadOnly";
import "./ProfileDashboard.css";
import MyDetails from "../MyDetails/MyDetails";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import DashboardEventView from "../DashboardEventView/DashboardEventView";
import NavigationBar from "../NavigationBar/NavigationBar";
import Reviews from "../Reviews/Reviews";


const defaultProfilePic = 'https://drive.google.com/file/d/1sYUM56VrjbRmRXMyzSE62Aaz_unXyVhi/view?usp=sharing'; 
const defaultCoverPic = 'https://drive.google.com/file/d/17DNvqLYTaDCpEqikBMZLs_tt95wYrgud/view?usp=sharing'; 

const ProfileDashBoard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState(0); 
  const [userType,setUserType]=useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const responseUser = await axios.get('/api/user/profile');
            setUser(responseUser.data);
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch user data: ', error);
        }
    };
    fetchUserData();
   
  }, []);


  const handleButtonClick = (buttonIndex) => {
     setActiveButton(buttonIndex); 
  };


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    
    <section id="sectiondashboard">
      <div id="navbardiv">
        <NavigationBar/>
      </div>
      <div className="profileViewContainer">
        <div id="pvcover">
          <img id="pvcoverimg" src={user.coverpic} alt="Cover" 
            onError={(e) => {
              e.target.src = defaultCoverPic;
          }}
          />
        </div>
        <div className="pvcontainer">
          <div className="image">
            <img id="pvuserimg" src={user.propic} className="rounded ml-5" width="155" alt="User" 
              onError={(e) => {
                e.target.src = defaultProfilePic;
            }}
            />
            
          </div>
          <div className="pvdetails">
            <div id="pvusername">
              <h1>{user.firstName} {user.lastName}</h1>
            </div>
            <div id="pvposition">
              <h3>{user.proffesion}</h3>
              <div id="aboutmedisplay">
               <p>{user.aboutme}</p>  
               
              </div> 
            </div>

            <div id="pvprofilelinks">
              <Link to={user.facebook} className="fblink">Facebook</Link>
              <Link to={user.linkedin} className="fblink">LinkedIn</Link>
              <Link to={user.youtube} className="fblink">Youtube</Link>
            </div>
          </div>
          <div className="pvrating">
            {user.userType==="resourceperson"?(
                 <div id="pvratecard">
                 <RateReadOnly userRating={user.userRating} />
               </div>
            ):(<div></div>)}            
           
          </div>
        </div>
        <hr/>
      </div>
      <div id="probuttons">
      {user.userType==="resourceperson"?(
        <div id="pvtabbtns">
              
              {['My Details', 'Manage Profile', 'Manage Events','Reviews'].map((buttonText, index) => (
                <button
                  key={index}
                  className={`pdbtn ${activeButton === index ? 'active' : ''}`}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonText}
                </button>
              ))}
          </div>          
      ):(
            <div id="pvtabbtnsstake">
                  
            {['My Details', 'Manage Profile'].map((buttonText, index) => (
              <button
                key={index}
                className={`pdbtn ${activeButton === index ? 'active' : ''}`}
                onClick={() => handleButtonClick(index)}
              >
                {buttonText}
              </button>
            ))}
          </div>
      )}
          
      </div>
      <div id="pvevents">
        <hr />


               

        {activeButton === 0 && (
          <MyDetails user={user} /> 
        )}
        {activeButton === 1 && (
          <UpdateProfile
            user={user}    
          />
        )}
        {activeButton === 2 &&(
          <DashboardEventView
            user={user}
          />
        )}
        {activeButton===3&&(
          <Reviews
            user={user}
          />
        )}
        
      </div>
    </section>
  );
};

export default ProfileDashBoard;
