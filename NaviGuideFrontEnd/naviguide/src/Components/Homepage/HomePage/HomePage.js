import React from "react";
import "./HomePage.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import About from "../About/About";
import Title from "../Title/Title";
import PhotoSlideshow from "../PhotoSlidesShow/PhotoSlideshow";
import ContactDetails from "../ContactDetails/ContactDetails";
import News from "../News/News";
import Search from "../../Search/Search";



const HomePage = () => {

    
    return(
        <section className="home-section">

            <section id="home-navBar">
                <NavigationBar />
            </section> 

            <section id="home-title">
                <Title/>
            </section>

            <section id="home-search">
                <Search/>
            </section>

            <section id="home-slide">
                <PhotoSlideshow/>
            </section>

            <section id="home-about">
                <About/>
            </section>

            <section id="home-news">
                <News/>
            </section>

            <section id="home-contact">
                <ContactDetails/>
            </section>


        </section>
            
    );
}


export default HomePage;