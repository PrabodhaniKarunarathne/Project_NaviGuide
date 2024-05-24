import React, { useState } from "react";
import "./DashboardEventView.css";
import axios from "axios";
import { useEffect } from "react";
import EventsView from "../EventsView/EventsView";
import ScheduledEvents from "./ScheduledEvents";

const DashboardEventView = ({user}) => {
    const [error, setError] = useState(null);
    const [userName,setUserName]=useState(user.userName);
    const [eventName, setEventName] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventAudiance, setEventAudiance] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [newEvent,setNewEvent]=useState(null);
    const [events,setEvents]=useState(null);
    const [eventStatus,setEventStatus]=useState("");
    const [eventStakeHolder, setEventStakeHolder] = useState(""); 
    const [completeEvent, setCompleteEvent] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [eventImages,setEventImages]=useState([]);
 
    const newEventClicked =()=>{
        setNewEvent(true);
    };

    const handleNewEventClose=()=>{
        setNewEvent(false);
    };

    const deleteevent=()=>{
        alert("Delete pressed");
    };
    //Schedule event
    const EventFormSubmit =async (e) => {
        e.preventDefault();
        setUserName(user.userName);
        try{
            const response = await axios.post("/api/event/save",{
                userName:userName,
                eventName:eventName,
                eventDate:eventDate,
                eventAudiance:eventAudiance,
                eventDescription:eventDescription,
                eventVenue:eventVenue,
                eventStakeHolder: eventStakeHolder,                
                eventStatus:"scheduled"
            });

            if(response.status===200){
                alert("Event Scheduled");
                setEventName("");
                setEventDate(null);
                setEventAudiance("");
                setEventDescription("");
                setEventVenue("");
                setNewEvent(false);
                setEventStatus("");
                setEventStakeHolder(""); 

            }else{
                alert('Unexpected response status :',response.status);

            }
        }catch(err){
            alert("Event Creation Failed : "+err.toString());
          }

        
    };
    //Complete Event Code
    const [completeEventFormData,setCompleteEventFormData]=useState({
        eventName:"",
        eventDescription:"",
        eventDate:"",
        eventAudiance:"",
        eventVenue:"",
        eventImages:[]
    })
    const uploadImage = async (image) => {

        const formData = new FormData();
        formData.append('image', image);
        try {

            const response = await axios.post("api/user/uploadimages", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            const imageUrl = response.data;
            return imageUrl.url;
        } catch (error) {
            alert("Error uploading images");
            console.error("Error uploading image:", error);
            return null;
        }
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setEventImages([...eventImages, ...files]);
    };


    const handleCompleteFormSubmit = async (e) => {
        e.preventDefault();
        const uploadedImageUrls = [];
        for (const image of eventImages) {
            const imageUrl = await uploadImage(image);
            if (imageUrl) {
                uploadedImageUrls.push(imageUrl.toString());
            }
        }        
    
        try {
            const response = await axios.put(
                "/api/news/savenews",
                {
                    eventName: eventName,
                    eventDescription: eventDescription,
                    eventAudiance: eventAudiance,
                    newsImages: uploadedImageUrls 
                }
            );
    
            if (response.status === 200) {
                alert("News published Successfully");
                
                setEventName("");
                setEventDescription("");
                setEventDate("");
                setEventImages([]); 
                setEventAudiance("");
                setEventVenue("");

                window.location.reload();
            } else {
                alert('Unexpected response status :' + response.status);
            }
        } catch (error) {
            alert(`News publish failed due to an error: ${error}`);
            console.error("Error publishing news:", error);
        }        
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
        
    }, [user]);




    const divideEventsByStatus = (events) => {
        const scheduledEvents = events.filter(event => event.eventStatus === 'scheduled');
        const otherEvents = events.filter(event => event.eventStatus !== 'scheduled');
        return { scheduledEvents, otherEvents };
    };

    const { scheduledEvents, otherEvents } = events ? divideEventsByStatus(events) : { scheduledEvents: [], otherEvents: [] };


    const handleDeleteEvent = (eventName) => {
        setEventToDelete(eventName);
    };

    const handleCompleteEvent = (eventName) => {
        setCompleteEvent(eventName);
    };

    const handleEditEvent = (eventName) => {
        setEventToEdit(eventName);
    };

    const handleCancelDelete=()=>{
        setEventToDelete(null);
    }

    const handleCancelEdit = () => {
        setEventToEdit(null);
    };

    const handleCancelComplete = () => {
        setCompleteEvent(null);
    };
    const handleCancelNewEvent = () => {
        setNewEvent(null);
    }; 

    
    return (
        <section id="events">
            <section>
                    <h1 className="pveventstopics">Manage Events</h1>
                    <div id="devbtndiv">
                        <button className="devbtn" onClick={newEventClicked}>Schedule new event</button>
                    </div>
                    {newEvent && (

                            <div id="eventcardnew">
                            <form onSubmit={(e) => EventFormSubmit(e)}>
                            <div id="neweventform">
                                
                                <div id="formdivevent">
                                <div id="content" className="content">
                                            <div className="closebtnevent">
                                                <button className="devbtn" id="closebtnevent" onClick={handleCancelNewEvent}>Close</button>
                                            </div>
                                        <div>
                                        <div className="row">
                                            
                                            <div className="cardreg">
                                                <label htmlFor="eventName">Event Name</label>
                                                <input
                                                    type="text"
                                                    className="inputssingleevd"
                                                    name="eventName"
                                                    id="eventName"
                                                    value={eventName}
                                                    onChange={(e) => setEventName(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventDescription">Event Description</label>
                                                <textarea
                                                    id="eventDescription"
                                                    name="eventDescription"
                                                    className="inputssingleevd"
                                                    value={eventDescription}
                                                    onChange={(e) => setEventDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventDate">Event Date</label>
                                                <input
                                                    id="eventDate"
                                                    className="inputssingleevd"
                                                    type="date"
                                                    name="eventDate"
                                                    value={eventDate}
                                                    onChange={(e) => setEventDate(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventAudiance">Audiance</label>
                                                <input
                                                    id="eventAudiance"
                                                    className="inputssingleevd"
                                                    type="text"
                                                    name="eventAudiance"
                                                    value={eventAudiance}
                                                    onChange={(e) => setEventAudiance(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventStakeholder">Event Stakeholder</label>
                                                <input
                                                    type="text"
                                                    name="eventStakeholder"
                                                    id="eventStakeholder"
                                                    className="inputssingleevd"
                                                    value={eventStakeHolder}
                                                    onChange={(e) => setEventStakeHolder(e.target.value)}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="cardreg">
                                                <label htmlFor="eventVenue">Event Venue</label>
                                                <input
                                                    type="text"
                                                    name="eventVenue"
                                                    id="eventVenue"
                                                    className="inputssingleevd"
                                                    value={eventVenue}
                                                    onChange={(e) => setEventVenue(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                        
                                    
                                    
                                </div>
                                <div id="btnsaveevent">
                                        <button type="submit" className="devbtn" id="sebtn">Schedule Event</button>
                                    </div>
                                
                                
                            </div>
                        
                        </form>
                    </div>
                    )}
            <hr/>

            </section>
            <section>
            <ScheduledEvents user={user}/>
            <hr />

            </section>
            <section>

            <div id="completedEvents">
                <h1 className="pveventstopics">Completed Events</h1>
                <div>
                <EventsView user={user}/> 
                </div>

                
            </div>

            <hr />
        </section>
            
        

        </section>
    );
};

export default DashboardEventView;
