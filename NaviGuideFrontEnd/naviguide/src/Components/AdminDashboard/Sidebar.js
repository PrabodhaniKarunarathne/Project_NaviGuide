import React from 'react';
import "./AdminDashboard.css";

const Sidebar = ({ onButtonClick }) => {

  

  return (
    <aside id="sidebar" className="sidebar">
      <h1 className='pveventstopics' id='topicadmin'>Welcome, Admin!</h1>
      <button className='sidebarbtn' onClick={() => onButtonClick('dashboard')}>
        Dashboard           
      </button>
      <button className='sidebarbtn' onClick={() => onButtonClick('users')}>
        Users           
      </button>
      <button className='sidebarbtn' onClick={() => onButtonClick('news')}>
        News           
      </button>
      <button className='sidebarbtn' onClick={() => onButtonClick('admin')}>
        Admin
      </button>
    </aside>
  );
};

export default Sidebar;