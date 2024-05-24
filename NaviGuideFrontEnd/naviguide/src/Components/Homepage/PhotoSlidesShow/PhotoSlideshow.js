import React, { useState, useEffect } from 'react';
import './PhotoSlideshow.css'; 
import image1 from "../../../Assests/images/image1/lost.jpg";
import image2 from "../../../Assests/images/image1/navi.png";
import image3 from "../../../Assests/images/image1/health.jpeg";
import image4 from "../../../Assests/images/image1/nature.jpg";
import image5 from "../../../Assests/images/image1/safety.jpg";
import image6 from "../../../Assests/images/image1/education.jpg";
import image7 from "../../../Assests/images/image1/social.jpg";
import image8 from "../../../Assests/images/image1/tech.png";
import image9 from "../../../Assests/images/image1/workPlace.jpg";
import image10 from "../../../Assests/images/image1/sucess.jpg";




const PhotoSlideshow = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  
  const slides = [
    {
      src: image1, 
      overlayText: 'can\'t  you find right solution? ',
    },
    {
      src: image2, 
      overlayText: 'we support you ',
    },
    
    {
      src: image3, 
      overlayText: 'Health Awareness ',
    },
    {
      src: image4,
      overlayText: 'Enviromental Awareness ',
    },
    {
      src: image5,
      overlayText: 'Safety & Security Awareness ',
    },
    {
      src: image6,
      overlayText: 'Educational Awareness ',
    },
    {
      src:image7,
      overlayText: 'Social Issues Awareness ',
    },
    {
      src: image8,
      overlayText: ' Technology & Digital Literacy Awareness',
    },
    {
      src: image9,
      overlayText: 'Work Place Awareness ',
    },
    {
      src:image10,
      overlayText: 'Find Sucess!!! ',
    },
  ];

  // Function to change slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="photo-slideshow" >
      {/* Render slideshow container */}
      <div className="slideshow-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`mySlides ${slideIndex === index ? 'show' : 'hide'}`}
          >
            <img className="slide-image" src={slide.src} alt={`Slide ${index + 1}`}  />
            <div className="overlay-text">{slide.overlayText}</div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoSlideshow;
