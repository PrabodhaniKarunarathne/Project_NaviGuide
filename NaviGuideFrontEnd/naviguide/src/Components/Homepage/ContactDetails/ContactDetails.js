import React from "react";
import "./ContactDetails.css";

const ContactDetails = () => {
  return (
   
    <footer className="contact-details">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p><strong>Address:</strong> 123 NaviGuide Street, Suite 100, City, State, Zip</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Email:</strong> contact@naviguide.com</p>
      </div>
      <div className="social-media">
        <h2>Follow Us</h2>
        {/* Add links to your social media profiles here */}
        <a href="https://www.facebook.com/naviguide" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://www.twitter.com/naviguide" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://www.instagram.com/naviguide" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </footer>
 
  );
};

export default ContactDetails;
