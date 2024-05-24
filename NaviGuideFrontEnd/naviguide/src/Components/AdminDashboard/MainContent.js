import React, { useEffect, useState } from 'react';
import "./AdminDashboard.css";
import "../Search/Search"
import SearchAdmin from './SearchAdmin';
import AddNews from './AddNews';
import NewsView from './NewsView';
import AddAdmin from './AddNewAdmin';
import AdminList from './AdminList';
import axios from 'axios';


const MainContent = ({ content }) => {
  
  const [activeButton,setActiveButton]=useState([0]);
  const [adminCount,setAdminCount]=useState(0);
  const [totalUsersCount,setTotalUsersCount]=useState(0);
  const [totalNewsCount,setTotalNewsCount]=useState(0);
  const [resoursePersonCount,setResoursePersonCount]=useState(0);
  const [stakeHolders,setStakeholderCount]=useState(0);
  const [error,setError] =useState(null);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex); 
  };
  
  useEffect(()=>{
    const fetchAdminCount= async ()=>{
      try{
        const responseAdminCount= await axios.get("/api/admin/countadmins");
        setAdminCount(responseAdminCount.data);
        const responseUserCount = await axios.get("api/user/countusers");
        setTotalUsersCount(responseUserCount.data);
        const responseNewsCount=await axios.get("/api/news/countnews");
        setTotalNewsCount(responseNewsCount.data);

      } catch (error) {
        setError(error.message);
        console.error('Failed to fetch user data: ', error);
    }

    };
    fetchAdminCount();
  },[]);

  const renderContent = () => {
    switch(content) {
      case 'dashboard':
        return (
          <div>
            <div id='maincontent' className='divs'>
              <h1 className='pveventstopics'>Dashboard</h1>
              <hr/>
            </div>
            <div id='homeboxcontainer'>
                <div className='homebox'>
                  <h2 className='pveventstopics' id='cardshead'>Total Users : {totalUsersCount}</h2>
                </div>
                <div className='homebox'>
                  <h2 className='pveventstopics' id='cardshead'>News Online : {totalNewsCount}</h2>
                </div>
                <div className='homebox'>
                  <h2 className='pveventstopics' id='cardshead'>Admins : {adminCount}</h2>
                </div>
            </div>
          </div>
        );
      case 'users':
       
        return (
          
          <div className="adminuserdetail">
            <div id='maincontent' className='divs'>
              <h1 className='pveventstopics'>Users</h1>
              <hr/>
            </div>
            <div id='searchinAdmin'>
                <SearchAdmin/>
            </div>
           
          </div>
        );
      case 'news':
       

        return (
          <div className="adminnews">
            <div id='maincontent' className='divs'>
              <h1 className='pveventstopics'>Manage News</h1>
              <hr/>
              <div id='divnewsbtns'>
                  {['Publish News', 'View News'].map((buttonText, index) => (
                    <button id='newsbtns'
                      key={index}
                      className={`sidebarbtn ${activeButton === index ? 'active' : ''}`}
                      onClick={() => handleButtonClick(index)}
                    >
                    {buttonText}
                    </button>
                ))}
             

              </div>
              
              
              {activeButton === 0 && (
                <AddNews/> 
              )}
              {activeButton === 1 && (
                <NewsView
                    
                />
              )}     
              

            </div>
            
          </div>
        );
      case 'admin':
        return (
          <div className="adminmanagement">
            <div id='maincontent' className='divs'>
              <h1 className='pveventstopics'>Manage Admins</h1>
              <hr/>
              <div id='divnewsbtns'>
                  {['Manage Admins', 'Add Admin'].map((buttonText, index) => (
                    <button id='newsbtns'
                      key={index}
                      className={`sidebarbtn ${activeButton === index ? 'active' : ''}`}
                      onClick={() => handleButtonClick(index)}
                    >
                    {buttonText}
                    </button>
                ))}
             

              </div>
              
              
              {activeButton === 0 && (
                <AdminList/>
              )}
              {activeButton === 1 && (
                <AddAdmin/>
              )}     
              

            </div>
              
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main id="main" className="main">
      {renderContent()}
    </main>
  );
};

export default MainContent;