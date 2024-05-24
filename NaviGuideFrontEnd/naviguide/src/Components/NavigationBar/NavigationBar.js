import React, { useEffect, useState } from "react";
import "./NavigationBar.css";
import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserNotification from "../UserNotification/UserNotification";

const NavigationBar = () => {
    const [user, setUser] = useState(null);
    const [eventsResults, setEventsResults]=useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const responseUser = await axios.get('/api/user/profile');
                setUser(responseUser.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch user data: ', error);
            }
        };
        fetchUserData();
        
    }, []);

    


    

    const logoutUser = async () => {
        try {
            await axios.get('/api/user/logout');
            setUser(null);
        } catch (error) {
            console.error('Failed to logout: ', error);
        }

         navigate('/nav');
    };

    const awakeLoginPage = () => {
        navigate('/login');
    }

    const awakeSignUpPage = () => {
        navigate('/register');
    }

  

    return (
        <div className="navBar">
            <div className="div1">
                <ul className="listnav">
                    <li><Link to={"/"} className="link">HOME</Link></li>
                    <li><Link to={"/"} onClick="aboutClick" className="link" >ABOUT</Link></li>
                    <li><Link to={"/"} className="link">NEWS</Link></li>
                    <li><Link to={"/"} className="link">CONTACT</Link></li>
                </ul>
            </div>

            <div className="div2">
                {user ? (
                    <div className="userdatadiv">
                        

                        <Link to={"/dashboard"} id="gotodashboard"><span id="loggeduserspan">{user.userName}</span></Link>
                        <UserNotification user={user} />
                        <button className="logout" onClick={logoutUser}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <button className="login" onClick={awakeLoginPage}>Login</button>
                        <button className="signup" onClick={awakeSignUpPage}>Signup</button>
                    </div>
                )}
            </div>
        </div>
    ); 
}

export default NavigationBar;