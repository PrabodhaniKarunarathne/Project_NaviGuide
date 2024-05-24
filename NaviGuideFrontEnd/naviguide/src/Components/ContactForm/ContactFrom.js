import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = ({ user }) => {
    const [error, setError] = useState([]);
    const [heading, setHeading] = useState("");
    const [email, setEmail] = useState("");
    const [loggedUser, setLoggedUser] = useState("");
    const [message, setMessage] = useState("");

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

    const handleContactFormSubmit = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(heading);
        const body = encodeURIComponent(message);
        const mailtoLink = `mailto:${user.email}?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    };

    return (
        <section>
            <div id="eventcardnew">
                <form onSubmit={(e) => handleContactFormSubmit(e)}>
                    <div id="newcontactform">
                        <h1 className="pveventstopics" id="contactheading">Contact {user.firstName} {user.lastName}</h1>
                        <div id="formdivevent">
                            <div id="content" className="content">
                               
                                <div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventName">Your Email</label>
                                            <input
                                                type="text"
                                                className="inputssingleevd"
                                                name="email"
                                                id="email"
                                                value={loggedUser.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventName">Heading</label>
                                            <input
                                                type="text"
                                                className="inputssingleevd"
                                                name="eventName"
                                                id="eventName"
                                                value={heading}
                                                onChange={(e) => setHeading(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="cardreg">
                                            <label htmlFor="eventDescription">Message</label>
                                            <textarea
                                                id="eventDescription"
                                                name="eventDescription"
                                                className="inputssingleevd"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="btnsaveevent">
                            <button type="submit" className="devbtn" id="sebtn">Send Email</button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ContactForm;
