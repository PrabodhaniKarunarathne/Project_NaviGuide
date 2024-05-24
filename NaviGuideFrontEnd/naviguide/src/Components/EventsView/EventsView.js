import React, { useEffect, useState } from "react";
import "./EventsView.css";
import axios from "axios";
import ImagePreview from "../AdminDashboard/ImagePreview";
const EventsView = ({ user }) => {
  const [error, setError] = useState(null);
  const [eventsList, setEventsList] = useState(null);
  const [deletePressed, setDeletePressed] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  const [completed, setCompleted] = useState("completed");

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const responseEvents = await axios.get(`/api/event/getevent/${user.userName}/${completed}`);
        setEventsList(responseEvents.data);
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch Events : ', error);
      }
    };
    fetchEventsList();
  }, [user, completed]); 

  async function deleteEvent(eventName, eventDate, userName, e) {
    e.preventDefault();
    try {
      const responsedelete = await axios.delete(`/api/events/deleteevent/${eventName}/${eventDate}/${userName}`);
      alert("Event Deleted Successfully");
      window.location.reload();
    } catch (err) {
      alert("Event Deletion Failed: Network Error");
      console.error('Failed to delete Event: ', err);
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseUser = await axios.get('/api/user/profile');
        setUserLogged(responseUser.data);
      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch user data: ', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <ul>
      {eventsList && eventsList.length > 0 ? (
    eventsList.map(event => (
        <li key={event.eventName} className="adminlist">
            <div id="eventcard">
                <div id="eventName">
                    <h1 className="eventnameheduled">{event.eventName}</h1>
                    <h5>{event.eventDate}</h5>
                </div>
                <div id="eventDetails">
                    <p>{event.eventDescription}</p>
                </div>
                <div>
                <div className="containerimg">
                    <ImagePreview imageList={event.eventImages} />
                </div>
                
                </div>
                
            </div>
        </li>
    ))
) : (
    <div><h2 id="noevents">(No events published)</h2></div>
)}
    </ul>
  );
};

export default EventsView;
