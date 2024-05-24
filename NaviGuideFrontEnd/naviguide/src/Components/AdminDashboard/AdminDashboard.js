import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import "./AdminDashboard.css";
import AdminNavigationBar from './AdminNavBar';
const AdminDashboard = () => {
  const [content, setContent] = useState('dashboard');

  const handleButtonClick = (contentType) => {
    setContent(contentType);
  };

  return (
    <div>
      <AdminNavigationBar/>
      <div id='admindashboard'>
        <Sidebar onButtonClick={handleButtonClick}/>
        <MainContent content={content}/>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
