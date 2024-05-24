import React, { useEffect, useState } from "react";
import { Await, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "./AdminDashboard";

const AdminNavigationBar = () => {
    const [admin, setAdmin] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const responseAdmin = await axios.get('/api/admin/profile');
                setAdmin(responseAdmin.data);
            } catch (error) {
                setError(error.message);
                console.error('Failed to fetch admin data: ', error);
            }
        };
        fetchAdminData();
        
    }, []);
        
  

    const logoutAdmin = async () => {
        try {
            await axios.get('/api/admin/logout');
            setAdmin(null);
        } catch (error) {
            console.error('Failed to logout: ', error);
        }

         navigate('/admin');
    };

    const awakeLoginPage = () => {
        navigate('/admin');
    }


  

    return (
        <div className="navBar">
            
            <div className="div2">
                {admin ? (
                    <div className="userdatadiv">
                        <Link to={"/admindashboard"} id="gotodashboard"><span id="loggeduserspan">{admin.adminName}</span></Link>
                        <button className="logout" onClick={logoutAdmin}>Logout</button>
                    </div>
                ) : (
                    <div>
                        <button className="login" onClick={awakeLoginPage}>Login</button>
                    </div>
                )}
            </div>
        </div>
    ); 
}

export default AdminNavigationBar;