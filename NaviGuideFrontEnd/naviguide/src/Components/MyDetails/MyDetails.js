import React,{useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MyDetails.css";

const MyDetails = ({user}) => {

    return(
        <section>
            <h1 className="pveventstopics">My Details</h1>
            <section id="infoContainer">
            <div id="detailscard1">
                <h1 className="pveventstopics">My Information</h1>
                <div className="topics">
                    <h2 className="topicitem">Name</h2>
                    <h3>{user.firstName} {user.lastName}</h3>
                </div>
                <div className="topics">
                    <h2 className="topicitem">Proffession</h2>
                    <h3>{user.proffesion}</h3>
                </div>
                <div className="topics">
                    <h2 className="topicitem">Organization</h2>
                    <h3>{user.organizationName}</h3>
                </div>
                <div className="topics">
                    <h2 className="topicitem">Contacts</h2>
                    <h2 className="subtopicitem">Email        :</h2> <h3>{user.email}</h3>
                    <h2 className="subtopicitem">Phone Number :</h2><h3>{user.phoneNumber}</h3>
                    <h2 className="subtopicitem">Phone Number (Fixed) :</h2><h3>{user.altPhoneNumber}</h3>
                    <h2 className="subtopicitem">Address</h2>
                    <h3>{user.address}</h3>
                </div>
            </div>
            <div id="detailscard2" >
                <div className="detailssubcard" >
                <h1 className="pveventstopics">Account Details</h1>

                    <div className="topics">
                        <h2 className="topicitem">Account Category</h2>
                        <h3>{user.accCategory}</h3>
                    </div>
                    <div className="topics">
                        <h2 className="topicitem">Account Type</h2>
                        <h3>{user.userType}</h3>
                    </div>
                </div> 
                <div className="detailssubcard">
                <h1 className="pveventstopics">Social Media</h1>

                    <div className="topics">
                        <h2 className="topicitem">Facebook</h2>
                        <h3 className="topicitemsocial">{user.facebook}</h3>
                    </div>
                    <div className="topics">
                        <h2 className="topicitem">Youtube</h2>
                        <h3 className="topicitemsocial">{user.youtube}</h3>
                    </div>
                    <div className="topics">
                        <h2 className="topicitem">LinkedIn</h2>
                        <h3 className="topicitemsocial">{user.linkedin}</h3>
                    </div>
                </div> 
            </div>
              
             

        </section>
        </section>

    );
}
export default MyDetails;