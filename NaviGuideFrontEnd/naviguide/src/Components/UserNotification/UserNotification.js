import React, { useEffect, useState } from "react";
import "./UserNotification.css";
import notificationImage from "../../Assests/images/notification.png";
import axios from "axios";
import { Await, Link, useNavigate } from "react-router-dom";


const UserNotification = ({ user }) => {
    const [events,setEvents]=useState(null);
    const [error,setError]=useState(null);
    const [notification,setNotification]=useState(false);  
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const responseEvents = await axios.get(`/api/event/getevents/${user.userName}`);
                setEvents(responseEvents.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch user data: ', error);
            }
        };
        fetchEventData();    
       
    }, []);

    const checkEventDates = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        
        const formattedToday = formatDate(today);
        const formattedTomorrow = formatDate(tomorrow);
        let Icount=0;
        if (events != null ) {
            for (const event of events) {
                const eventDate = formatDate(new Date(event.eventDate));
                if (eventDate === formattedToday || eventDate === formattedTomorrow) {
                    Icount=Icount+1;    
                    return Icount;
                    
                }
            }
          
        }
      return 0;    
    };
    let count=checkEventDates();


    const notificationClicked =()=> {
        alert("Please check Event Management to Check Upcomming events!");
        
      }


    return (
        <div id="notification">
            {count>0 && (
                <div className="Notification">
                    <img src={notificationImage} alt="Notification" id="notify" onClick={notificationClicked}/>


                </div>
            )}
        </div>
    );
};

export default UserNotification;
