import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPressed = ({ event }) => {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [eventAudiance, setEventAudiance] = useState("");
    const [eventStakeHolder, setEventStakeHolder] = useState("");
    const [eventVenue, setEventVenue] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState({
        eventName: "",
        eventDescription: "",
        eventAudiance: "",
        eventDate: "",
        eventStakeHolder: "",
        eventVenue: "",
      });
      useEffect(() => {
        const fetchEventData = async () => {
          try {
            const response = await axios.get(`/api/event/getevent/${event.userName}/${event.eventName}/${event.eventDate}`);
            setFormData(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        fetchEventData();
      }, [event.userName]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      };  
    
    



    const handleComplete = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `/api/event/updateevent/${formData.userName}/${formData.eventName}/${formData.eventDate}`,
                {
                    eventName: formData.eventName,
                    eventDescription:formData.eventDescription,
                    eventDate: formData.eventDate,
                    eventAudiance: formData.eventAudiance,
                    eventStakeHolder: formData.eventStakeHolder,
                    eventVenue: formData.eventVenue,
                    eventStatus:"scheduled",
                }
            );
    
            if (response.status === 200) {
                alert("News published Successfully");
                setEventName("");
                setEventDescription("");
                setEventDate("");
                setSelectedImages([]); 
                setEventVenue("");
                setEventStakeHolder("");
                setEventAudiance("");
                window.location.reload();
            } else {
                alert('Unexpected response status :' + response.status);
            }
        } catch (error) {
            alert(`News publish failed due to an error: ${error}`);
            console.error("Error publishing news:", error);
        }       
    };

    return (
        <section>
            <div id="eventcardnew">
                <form onSubmit={handleComplete}>
                    <div id="neweventform">
                        <div id="formdivevent">
                            <div id="content" className="content">
                                <div className="closebtnevent">
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
                                                value={formData.eventName}
                                                onChange={handleInputChange}
                                                required
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
                                                value={formData.eventDescription}
                                                onChange={handleInputChange}
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
                                                value={formData.eventDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventAudiance">Audience</label>
                                            <input
                                                id="eventAudiance"
                                                className="inputssingleevd"
                                                type="text"
                                                name="eventAudiance"
                                                value={formData.eventAudiance}
                                                onChange={handleInputChange}
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
                                                value={formData.eventStakeHolder}
                                                onChange={handleInputChange}
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
                                                value={formData.eventVenue}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    
                                                    

                                
                            </div>
                        </div>
                        <div id="btnsaveevent">
                        <input type="submit" className="devbtn" id="publishnewsbtn" value="Complete Event" />
              
                        </div>
                    </div>
                    </div>
                    
                </form>
           </div>
        </section>
    );
};

export default EditPressed;
