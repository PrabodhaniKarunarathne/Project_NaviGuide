import React, { useState, useEffect } from "react";
import axios from "axios";
import CompletePressed from "./CompletePressed";
import EditPressed from "./EditPressed";

const ScheduledEvents = ({ user }) => {
    const [scheduled, setScheduled] = useState("scheduled");
    const [eventsList, setEventsList] = useState([]);
    const [error, setError] = useState(null);
    const [loggedUser, setUserLogged] = useState("");
    const [completePressed, setCompletePressed] = useState(null);
    const [editPressed, setEditPressed] = useState(null);
    const [deletePressed, setDeletePressed] = useState(null);

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

    useEffect(() => {
        const fetchEventsList = async () => {
            try {
                const responseEvents = await axios.get(`/api/event/getevent/${user.userName}/${scheduled}`);
                setEventsList(responseEvents.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch Events: ', error);
            }
        };
        fetchEventsList();
    }, [user, scheduled]);

    async function deleteEvent(event) {
        try {
            const responseEvents = await axios.delete(`/api/event/deleteevent/${event.userName}/${event.eventName}/${event.eventDate}`);
            if (responseEvents === 200) {
                alert("Event Deletion Succesfull");
            }
        } catch (error) {
            setError(error.message);
            console.error('Failed to fetch Events: ', error);
        }
    }

    function cancelDelete(){
        setDeletePressed(null);

    }
    return (
        <section>
             <div id="scheduledEvents">
                <h1 className="pveventstopics">Scheduled Events</h1>
                {error && <p className="errorinschedule">Error: {error}</p>}
                <ul>
                    {eventsList.map(event => (
                        <li key={event.eventName}>
                            {completePressed === event.eventName ? (
                                <CompletePressed event={event} />
                            ):EditPressed===event.eventName?(
                                <div>
                                    <EditPressed event={event} />
                                </div>
                            ):deletePressed===event.eventName?(
                                <div>
                                    <div>
                                    <div className="eventcard">
                                    <div id="eventNameSchedule">
                                        <div id="namesandbtn">
                                            <h1 className="eventnameheduled">{event.eventName}</h1>
                                            <h5>{event.eventDate}</h5>
                                        </div>
                                        <div id="eventDetails">
                                            
                                        </div>
                                        
                                    </div>
                                    <div id="completeevent">                    
                                            <p>Do you want to delete this Event ?</p>
                                            
                                    </div>
                                    <div className="yesnodiv">
                                            <button className="devbtn" id="yesbtn" onClick={()=>deleteEvent(event)}>Yes</button>
                                            <button className="devbtn" id="nobtn" onClick={()=>cancelDelete}>No</button>
                                    </div>
                                         n
                                    </div>
                                </div>
                                </div>    
                            ):(
                                <div className="eventcard">
                                <div id="eventNameSchedule">
                                    <div id="namesandbtn">
                                        <h1 className="eventnameheduled">{event.eventName}</h1>
                                        <h5>{event.eventDate}</h5>
                                        <button className="editeventbtn"onClick={(e)=>setEditPressed(event.eventName,e)}>Edit Event</button> 
                                    </div>
                                    <div id="completeevent">
                                        <button className="devbtn" id="compbtn" onClick={(e)=>setCompletePressed(event.eventName,e)}>Complete</button> 
                                        <button className="devbtn"id="dlbtn" onClick={(e)=>setDeletePressed(event.eventName,e)}>Delete</button> 
                                    </div>
                                </div>
                                <div id="eventDetails">
                                    <p>{event.eventDescription}</p>
                                </div>
                            </div>
                            )}
                            
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default ScheduledEvents;
