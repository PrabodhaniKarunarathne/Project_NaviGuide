import React, {useState } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from 'axios';
import { useAuth } from "../../AuthContext";


const LoginForm = () => {
  const {login} =useAuth();
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginValidation = async (e) => {
    e.preventDefault();
    setError('');



    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try{
      const response=await axios.post("/api/user/login",{
        email:email,
        password:password
      });

      if(response.data==="Login Successful"){
        const userData={
          email:email,
        };
        login(userData);
        console.log("Login Successfull");
        
        navigate('/dashboard');

      }else if(response==="Invalid Email or Password"){
        setError('Invalid Email or Password');
      }

    }catch(error){
      console.error('Login Failed',error);
      setError('Invalid Email or Password');
    }

  }

  return (
    <section id="LoginSection">
      <div id="LoginComponent">
        <div id="logimage">
          <div>
            <h3>Welcome to,</h3>
            <h1>NaviGuide</h1>
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
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    className="inputs"
                    type="email"
                    name="email"
                    placeholder="enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
              <div id="forgotpass_Login">
                  
                  <label id="forgot">Forgot Password ?</label>
                  
                  <a href="/" className="forgotlink">Visit</a>
                  <p> Don't have an account ? <Link to="/register" className="forgotlink" >Sign up</Link></p>

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
                
                <button id="btnGSign" className="btn">Sign in with Google</button>
              </div>

            </div>

          </form>
      </div>
        

      </div>
      
    </section>

  );
}

export default LoginForm;
