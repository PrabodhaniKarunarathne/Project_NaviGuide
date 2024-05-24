import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginPage/LoginPage';
import RegisterForm from './Components/RegisterPage/RegisterPage';
import ProfileDashBoard from './Components/ProfileDashboard/ProfileDashboard';
import { AuthProvider } from './AuthContext';
import Search from './Components/Search/Search';
import ProfileView from './Components/ProfileView/ProfileView';
import RateUser from './Components/RateUser/RateUser';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Reviews from './Components/Reviews/Reviews';
import AddReviews from './Components/Reviews/AddReviews';
import ContactForm from './Components/ContactForm/ContactFrom';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import HomePage from './Components/Homepage/HomePage/HomePage';


const App = () => {
  return (
    <Router>
      {/*Wrapped Routes with authprovider */}
      
        <Routes>
          <Route path='/' element={<HomePage/>}/>

          <Route path="/login" element={<AuthProvider><LoginForm/></AuthProvider>} />
          
          <Route path="/register" element={<RegisterForm />} />
          
          <Route path="/search" element={<Search/>}/>

          <Route path="/dashboard" element={<AuthProvider><ProfileDashBoard/></AuthProvider>}/>

          <Route path="/profile/:userName" element={<AuthProvider><ProfileView/></AuthProvider>}/>

          <Route path="/rate" element={<AuthProvider><RateUser/></AuthProvider>}/>

          <Route path="/nav" element={<NavigationBar/>}/>

          <Route path='/review' element={<Reviews/>}/>

          <Route path='/addreview' element={<AuthProvider><AddReviews/></AuthProvider>}/>

          <Route path='/contact' element={<ContactForm/>}/>

          <Route path='/admin' element={<AuthProvider><AdminLogin/></AuthProvider>}/>

          <Route path='/admindashboard' element={<AuthProvider><AdminDashboard/></AuthProvider>}/>

s
          
         


        
        </Routes>
    </Router>
  );
};

export default App;
