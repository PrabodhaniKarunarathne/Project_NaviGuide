import React, { useState, useEffect, useRef } from "react";
import "./search.css";
import ContactForm from "../ContactForm/ContactFrom";
import { Link } from "react-router-dom";
import axios from "axios";

const Search = () => {
    const [searchedAccCatagory, setSearchedAccCatagory] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loggedUser, setLoggedUser] = useState("");
    const [error, setError] = useState(null);
    const [contactPressed, setContactPressed] = useState("");

    const contactFormRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`/api/user/getaccbycatagory/${searchedAccCatagory}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setSearchResults(data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data. Please try again.');
            });
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
    
    

    return (
        <div id="searchdiv">
            <div id="searchformdiv">
                <form id="searchform" onSubmit={(e) => handleSearch(e)}>
                    <select id="searchByCat" value={searchedAccCatagory} onChange={(e) => setSearchedAccCatagory(e.target.value)}>
                    <option value={"Health Awareness"}>Health Awareness</option>
                         <option value={"Environmental Awareness"}>Environmental Awareness</option>
                         <option value={"Social Issues Awareness"}>Social Issues Awareness</option>
                         <option value={"Safety and Security Awareness"}>Safety and Security Awareness</option>
                         <option value={"Educational Awareness"}>Educational Awareness</option>
                         <option value={"Cultural Awareness"}>Cultural Awareness</option>
                         <option value={"Workplace Awareness"}>Workplace Awareness</option>
                         <option value={"Human Rights Awareness"}>Human Rights Awareness</option>
                         <option value={"Technology and Digital Literacy Awareness"}>Technology and Digital Literacy Awareness</option>
                         <option value={"Political and Civic Awareness"}>Political and Civic Awareness</option>
                    </select>
                    <input type="submit" value="Search by Category" />
                </form>
            </div>

            <div id="searchResults">
                
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map(user => (                            
                            <li key={user.userName}>
                                {contactPressed===user.userName?(
                                            // <div>
                                            //     <ContactForm user={user} loggeduser={loggedUser}/>
                                            // </div>
                                            <div ref={contactFormRef} id="contactFormWrapper">
                                                <ContactForm user={user} loggeduser={loggedUser}/>
                                            </div>
                                        ): user?(
                                            <div>
                                                <div class="container mt-5 d-flex justify-content-center">
                                                <div class="card p-3">
                                                    <div class="imageandtxtcontainer">
                                                        <div class="image mr-3">
                                                        <img src={user.propic} class="rounded ml-5" width="155" id="propicsearch" />
                                                    </div>
                                                    <div class="innerdetails">                                        
                                                    <h4 class="mb-0 mt-0">{user.firstName} {user.lastName}</h4>
                                                    <span>{user.proffesion}</span>
                                                    <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                                    
                                                        <div class="d-flex flex-column">
                                                            <span class="rating">Rating</span>
                                                            <span class="number3">{user.userRating}</span>                                           
                                                        </div>                                        
                                                    </div>
                                                    <div class="button mt-2 d-flex flex-row align-items-center">
                                                        <button class="btn btn-sm btn-outline-primary w-100"> 
                                                        <Link to={`/profile/${user.userName}`} className="viewlink" id="linkprofile">View Profile</Link>
                                                        </button>
                                                        <button class="btn btn-sm btn-primary w-100 ml-2" onClick={(e)=>setContactPressed(user.userName)}>Contact</button>                                        
                                                    </div>
                                                    <div>
                                                        
                                                    </div>
                                                    </div>                                       
                                                    </div>                                    
                                                </div>
                                                </div>
                                            
                                            </div>
                                        ):(
                                            <div id="searchResults">
                                            <p id="paranoresult">No search Results to preview</p>
                                            </div>
                                        )}
                            </li>
                           
                        ))}
                        
                    </ul>
                ) : (
                    <div>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;

