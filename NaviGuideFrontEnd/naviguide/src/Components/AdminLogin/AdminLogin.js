import React, {useState } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../AdminDashboard/AdminDashboard.css"
import { useAuth } from "../../AuthContext";

const AdminLogin=()=>{
  const {login} =useAuth();
  const navigate=useNavigate();
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginValidation = async (e) => {
    e.preventDefault();
    setError('');



    if (!adminName || !password) {
      setError('Please enter both Admin Name and password.');
      return;
    }

    try{
      const response=await axios.post("/api/admin/login",{
        adminName:adminName,
        password:password
      });

      if(response.data==="Login Successful"){
        const adminData={
          adminName:adminName,
        };
        login(adminData);
        console.log("Login Successfull");
        
        navigate('/admindashboard');

      }else if(response==="Invalid Admin Name or Password"){
        setError('Invalid Admin Name or Password');
      }

    }catch(error){
      console.error('Login Failed',error);
      setError('Invalid Admin Name or Password');
    }

  }
  return(
    <section id="LoginSection">
    <div id="LoginComponent">
      <div id="logimage">
        <div>
          <h3>Hi there, NaviGuide</h3>
          
          <h1> Admin</h1>
        </div>
        
      </div>
      <div id="LoginFormDiv">
        <form onSubmit={(e)=>loginValidation(e)}>
          <div id="formelements">
            <div id="topic_Login">
              <h2>Sign in</h2>
            </div>

            <div id="inputs_Login">
              <div className="input">
                <label htmlFor="adminName">Admin Name</label>
                <input
                  id="email"
                  className="inputs"
                  type="text"
                  name="adminName"
                  placeholder="enter adminName"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  className="inputs"
                  type="password"
                  placeholder="enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> 
            </div>
            <div id="error">
                {error && <p style={{ color: 'red' }}>{error}</p>}

            </div>
            <div id="button_Login">
              <input 
                type="submit" 
                name="btnSign" 
                id="btnSign" 
                value="Sign in"
                className="btn"
              />
            </div>

          </div>

        </form>
    </div>
      

    </div>
    
  </section>

  );

}

export default AdminLogin;
