import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import "./RegisterPage.css";
import validator from "validator";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate=useNavigate();
  const [firstName, setfirstName] = useState('');//ok
  const [lastName,setlastName]=useState('');//ok
  const [phoneNumber,setphoneNumber]=useState('');//ok
  const [altPhoneNumber,setaltPhoneNumber]=useState('');//ok
  const [organizationName,setorganizationname]=useState('');//ok
  const [email, setemail] = useState('');//ok
  const [password, setpassword] = useState('');//ok
  const [repassword, setrepassword]=useState('');//ok
  const [proffesion,setproffesion]=useState('');//ok
  const [address,setaddress]=useState('');//ok
  const [userType,setuserType]=useState('');//pk
  const [userName,setuserName]=useState('');//ok
  const [accCategory,setaccCategory]=useState('');//ok
  const [accRating,setaccRating]=useState('');//ok
  const [facebook,setFacebook]=useState('');//ok
  const [linkedin,setLinkedin]=useState('');//ok
  const [youtube,setYoutube]=useState('');//ok
  const [aboutme,setAboutMe]=useState('');//ok
  const [propic,setProfilePicture]=useState('');//ok
  const [coverpic,setCoverPicture]=useState('');//ok
  const [Users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);

  const registerValidation = async (e) => {
    e.preventDefault();
    setErrors([]);
    const propicurl= "https://drive.google.com/file/d/1HOMW1A3dnu7IQkQqCgtgzYGMd3QcTxP-/view?usp=";
    const coverpicurl="https://drive.google.com/file/d/117j3Fc4Owr3L4TIsPmFJssWmnCJkNvHx/view?usp=sharing";
    const notawailable="Not Provided";
    setFacebook(notawailable);
    setYoutube(notawailable);
    setLinkedin(notawailable);
    setAboutMe(notawailable);
    setProfilePicture(propicurl);
    setCoverPicture(coverpicurl);
    

    if (!address || !firstName || !email || !password ||!lastName||!phoneNumber||!repassword||!proffesion ||!lastName || !userName) {
      setErrors(['Please fill in all fields.']);
    }

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
    const cleanPhoneNumberAlt=altPhoneNumber.replace(/\D/g, ''); // Remove non-numeric characters
    const isValidPhoneNumber = validator.isMobilePhone(cleanPhoneNumber, 'any', { strictMode: false });
    const isValidPhoneNumberAlt=validator.isMobilePhone(cleanPhoneNumberAlt, 'any',{strictMode:false});

    if (!isValidPhoneNumber || phoneNumber.length<10) {
      setErrors(prevErrors =>[...prevErrors,'Please enter a valid phone number.']);
    }
   

    if (!isValidPhoneNumberAlt || altPhoneNumber.length<1){
      setErrors(prevErrors => [...prevErrors,'Please enter a valid phone number (Fixed Line)']);
    }

    if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      setErrors(prevErrors => [...prevErrors, 'Your password needs at least 8 characters, lowercase and uppercase characters, numbers, and symbols']);
    }
    

    if (!password.match(repassword)){
      setErrors(prevErrors => [...prevErrors,'password fields does not match']);
    }

    if(errors.length>0){
      return
    }

    if(userType==="stakeholder"){
      setaccRating(null);
    }else{
      setaccRating(0);
    }
    console.log('No error in Empty inputs');
    save(e);
    }

      useEffect(()=>{
       // (async () => await Load())();
      }, []);

    async function Load(){
      const result=await axios.get(
        "/api/user/getallusers");
           setUsers(result.data);
           console.log(result.data);    
    }

    async function save(e)
    { 
      

        e.preventDefault();
        // Check if the username or email already exists
        const existingUser = await axios.get(`api/user/getuser/${userName}`);
        if (existingUser.data) {
          alert('Username is already taken. Please choose a different one.');
          return;
        }

        const existingEmailUser = await axios.get(`api/user/getuserbyemail/${email}`);
        if (existingEmailUser.data) {
          alert('Email is already registered. Please use a different one.');
          return;
        }
        try
            {  
              const response = await axios.post("/api/user/save", {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                altPhoneNumber: altPhoneNumber,
                organizationName: organizationName,
                email: email,
                proffesion: proffesion,
                userName: userName,
                password: password,
                address: address,
                accCategory: accCategory,
                userType: userType,
                accRating: accRating,
                facebook:"Not Provided",
                youtube:"Not Provided",
                linkedin:"Not Provided",
                coverpic:'https://drive.google.com/thumbnail?id=117j3Fc4Owr3L4TIsPmFJssWmnCJkNvHx&sz=w1000',
                propic: 'https://drive.google.com/thumbnail?id=1HOMW1A3dnu7IQkQqCgtgzYGMd3QcTxP-&sz=w1000',
                aboutme:"Not Provided"

                

              });
             
              
            if(response.status===200){
              //Registration is successfull here
              alert("User Registered Successfully");
              setfirstName("");
              setlastName("");
              setphoneNumber("");
              setaltPhoneNumber("");
              setorganizationname("");
              setemail("");
              setaccCategory("");
              setproffesion("");
              setuserName("");
              setpassword("");
              setaddress("");
              setuserType("");
              setaccRating(0);
              setFacebook("");
              setYoutube("");
              setLinkedin("");
              setAboutMe("");
              setProfilePicture("");
              setCoverPicture("");
              
              Load();
              navigate('/login');


            }else{
              alert('Unexpected response status :',response.status);
            }
            }catch(err){
              alert("User Registation Failed : Network Error");
            }
   }  
  
  return (
    <section id="regSection">
        <div id="regdiv">
                  <div id="regimage">
                    <div id="head">
                      <h1>NaviGuide</h1>
                    </div>
                    <h1>Registration Guidelines</h1>
                    
                      <p>Please fill all the fields</p>
                      <p>You are not allowed to use Existing Email or Username</p>
                      <p>Phone number format 0XX XXX XXXX</p>
                      <p>Pasword should contain</p>
                          <li>at least 8 characters</li>
                          <li>at least one uppercase</li>
                          <li>at least one lowercase</li>
                          <li>at least one symbol</li>
                      
                    <div id="errors">
                                    {errors.map((error, index) => (
                                      <p key={index} style={{ color: 'red' }}>{error}</p>
                                    ))}
                    </div>
                  </div>
                  <div id="RegisterFormDiv">
                    <div id="topic_Reg">
                      <h2>Sign Up</h2>
                    </div>
                  
                    <form onSubmit={(e)=>registerValidation(e)}>
                      <div id="content" className="content">

                        <div className="row">
                            <div className="cardreg">
                              <label htmlFor="fname">First Name</label>
                              <input
                                type="text"
                                className="inputs"
                                name="fname"
                                id="fname"
                                value={firstName}
                                onChange={(e) => setfirstName(e.target.value)}
                                required
                              />
                            </div>
                            <div className="cardreg">
                              <label htmlFor="lname">Last Name</label>
                              <input
                                type="text"
                                id="lname"
                                name="lname"
                                className="inputs"
                                value={lastName}
                                onChange={(e) => setlastName(e.target.value)}
                                required
                              />
                            </div>
                            
                        </div>

                        <div className="row">
                          <div className="cardregsingle">
                            <label htmlFor="email">email Address</label>
                                <input
                                  id="email"
                                  className="inputssingle"
                                  type="email"
                                  name="email"  
                                  value={email}
                                  onChange={(e) => setemail(e.target.value)}
                                  required
                                />
                          </div>
                        
                          
                          </div>
                          <div className="row">
                              <div className="cardreg">
                                <label htmlFor="userName">Username</label>
                                    <input
                                      id="userName"
                                      className="inputs"
                                      type="text"
                                      name="userName"  
                                      value={userName}
                                      onChange={(e) => setuserName(e.target.value)}
                                      required
                                    />
                            
                              </div>
                            <div className="cardreg">
                              <label htmlFor="accCategory">Account Category</label>
                                  <select 
                                    id="accCatagory"
                                    className="inputs"  
                                    name="accCatagory"
                                    value={accCategory}
                                    onChange={(e) => setaccCategory(e.target.value)}
                                  >
                                      <option>I am not a Resource person</option>
                                      <option>Health Awareness</option>
                                      <option>Environmental Awareness</option>
                                      <option>Social Issues Awareness</option>
                                      <option>Safety and Security Awareness</option>
                                      <option>Educational Awareness</option>
                                      <option>Cultural Awareness</option>
                                      <option>Workplace Awareness</option>
                                      <option>Human Rights Awareness</option>
                                      <option>Technology and Digital Literacy Awareness</option>
                                      <option>Political and Civic Awareness</option>  
                               
                                  </select>
                                      
                            </div>
                          </div>
                      
                          <div className="row">
                            <div className="cardreg">
                                <label htmlFor="phone">Phone number</label>
                                <input 
                                  type="text"
                                  name="phone"
                                  id="phone"
                                  className="inputs"
                                  placeholder="07XXXXXXXX"
                                  value={phoneNumber}
                                  onChange={(e)=> setphoneNumber(e.target.value)}
                                  required
                                />
                            </div>
                            <div className="cardreg">
                            <label htmlFor="phone-alt">Phone number (Fixed line)</label>
                                <input 
                                  type="text"
                                  name="altPhoneNumber"
                                  id="altPhoneNumber"
                                  className="inputs"
                                  placeholder="0XXXXXXXXX"
                                  value={altPhoneNumber}
                                  onChange={(e)=> setaltPhoneNumber(e.target.value)}
                                />
                            </div>
                          </div>
                          <div className="row">
                            <div className="cardreg">
                              <label htmlFor="oname">Organization Name</label>
                                  <input
                                    type="text"
                                    id="oname"
                                    name="oname"
                                    className="inputs"
                                    value={organizationName}
                                    onChange={(e) => setorganizationname(e.target.value)}
                                  />
                            </div>
                            <div className="cardreg">           
                                  <label htmlFor="proffesion">proffesion</label>
                                  <input
                                    type="text"
                                    id="proffesion"
                                    name="proffesion"
                                    className="inputs"
                                    value={proffesion}
                                    onChange={(e) => setproffesion(e.target.value)}            
                                  />
                            </div>
                        </div>
                        <div className="row">
                            <div className="cardregsingle">
                              <label htmlFor="address">Address</label>
                                    <input 
                                      type="text"
                                      name="address"
                                      id="address"
                                      className="inputssingle"
                                      value={address}
                                      onChange={(e)=> setaddress(e.target.value)}
                                    />
                            </div>                           
                        </div>

                      <div id="pass">
                            <div className="cardreg">
                              <label htmlFor="password">password</label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="inputs"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                              />
                            </div>
                            <div className="cardreg">
                              <label htmlFor="repassword">Re-type password</label>
                              <input
                                id="repassword"
                                className="inputs"
                                type="password"
                                name="repassword"
                                value={repassword}
                                onChange={(e) => setrepassword(e.target.value)}
                              />
                            </div>
                      </div>             
                      <div className="check">   
                      <p>Register as</p>
                            <div className="cardregtype">
                              
                              <input 
                                type="radio" 
                                id="resource" 
                                name="userType"
                                value={userType}
                                className="chkbox"
                                onChange={(e)=> setuserType("resourceperson")}  /><label htmlFor="resource" >Resource Provider</label>
                              <input 
                                type="radio" 
                                id="stake" 
                                name="userType"
                                value={userType}
                                className="chkbox"
                                onChange={(e)=> setuserType("stakeholder")}
                                /><label htmlFor="stake">Stakeholder</label>

                            </div>
                            <div className="cardreg">
                            <p></p>
                            </div>
                      </div>
                      
                          
                      <div id="button_Reg">
                               
                                    <p>Already have an account? <Link to="/login" id="linksign">Sign in</Link></p>
                                    <div id="buttons">
                                        <input 
                                          type="submit" 
                                          name="btnRegister" 
                                          className="btnRegister" 
                                          value="Sign up"
                                          
                                          
                                        />
                                        <button id="GRegister" name="Gregister" className="btnRegister">Sign up with Google</button>
                                    </div>
                                    
                      </div>  
                    </div>            
                  </form>
                </div>

          </div>
            
   
    </section>
   
  );
}

export default RegisterForm;
