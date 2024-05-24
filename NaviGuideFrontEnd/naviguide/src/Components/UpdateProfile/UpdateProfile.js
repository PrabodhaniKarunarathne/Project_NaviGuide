import React, { useState } from "react";
import "./UpdateProfile.css";
import validator from "validator";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const UpdateProfile = ({ user }) => {

  const navigate = useNavigate();
  const [passchangeerror,setPassChangeError]=useState([]);
  const [deleteaccerror,setDeleteAccError]=useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    altPhoneNumber: "",
    organizationName: "",
    email: "",
    proffesion: "",
    address: "",
    userType: "",
    userName: "",
    accCategory: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    aboutme: "",
    propic: "",
    coverpic: "",
  });
  const [changePasswordFormData,setChangePasswordData] = useState({
    oldPassword:"",
    newPassword:"",
    rePassword:"",
  });

  const [deleteAccFormData,setDeleteAccFormData]=useState({
    email:"",  
    userName:"",
    password:"",   
  });
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/getuser/${user.userName}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user.userName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChangePassword = (e) => {
    const { name, value } = e.target;
    setChangePasswordData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleDeleteAccChange=(e)=>{
    const { name, value } = e.target;
    setDeleteAccFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }
  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePic") {
      setProfilePic(files[0]);
    } else if (name === "coverPic") {
      setCoverPic(files[0]);
    }
  };

  const logoutUser = async () => {
    try {
      await axios.get("/api/user/logout");
      navigate("/nav");
    } catch (error) {
      console.error("Failed to logout: ", error);
    }

    
  };



  const changePassword= async(userName, oldPassword, newPassword,e)=> {
    e.preventDefault();
    setPassChangeError([]);

    if (!validator.isStrongPassword(changePasswordFormData.newPassword, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      setPassChangeError(prevErrors => [...prevErrors, 'Your password needs at least 8 characters, lowercase and uppercase characters, numbers, and symbols']);
    }
    
  
    if (!changePasswordFormData.newPassword.match(changePasswordFormData.rePassword)){
      setPassChangeError(prevErrors => [...prevErrors,'password fields does not match']);
    }
    
    try {
        const response = await axios.put(`/api/user/changepassword/${userName}`, null, {
            params: {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        });
        if (response.status === 200) {
            // Password changed successfully
            console.log("Password changed successfully");
            alert("Your password reset succesfully, Use new password for next Login.");

            logoutUser();
            return true;
        } else {
            // Handle other status codes if needed
            console.error("Password change failed with status code: ", response.status);
            return false;
        }
    } catch (error) {
        // Handle error
        console.error("Password change failed with error: ", error.message);
        return false;
    }
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const existingUserName = await axios.get(`/api/user/getuser/${FormData.userName}`);
    if (existingUserName.data) {
      alert('Username is already taken. Please choose a different one.');
      return;
    }

    const existingEmailUser = await axios.get(`api/user/getuserbyemail/${FormData.email}`);
    if (existingEmailUser.data) {
      alert('Email is already registered. Please use a different one.');
      return;
    }

    if (!formData.firstName || 
      !formData.lastName || 
      !formData.phoneNumber || 
      !formData.proffesion || 
      !formData.address || 
      !formData.userType || 
      !formData.userName ||
      !formData.email ||
      !formData.accCategory
     
     ) {
       setErrors(["Please fill in all required fields."]);
       return;
   }



   if (!validator.isEmail(formData.email)) {
       setErrors(["Please enter a valid email address."]);
       return;
   }

   const cleanPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
   const isValidPhoneNumber = validator.isMobilePhone(cleanPhoneNumber, 'any', { strictMode: false });
   if (!isValidPhoneNumber) {
       setErrors(["Please enter a valid phone number."]);
       return;
   }



   const cleanAltPhoneNumber = formData.altPhoneNumber.replace(/\D/g, '');
   const isValidAltPhoneNumber = validator.isMobilePhone(cleanAltPhoneNumber, 'any', { strictMode: false });
   if (!isValidAltPhoneNumber) {
       setErrors(["Please enter a valid alternate phone number."]);
       return;
   }

   if (errors.length > 0) {
       return;
   }



    //Image Upload part
    const profilePicData = new FormData();
    if (profilePic) {
        profilePicData.append("image", profilePic);
    }

    const coverPicData = new FormData();
    if (coverPic) {
        coverPicData.append("image", coverPic);
    }

    try {
        // Upload profile picture
        let profilePicUrl = "";
        if (profilePic) {
            const response = await axios.post(
                `/api/user/uploadimages`,
                profilePicData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            profilePicUrl = response.data.url;
            formData.propic = profilePicUrl;
        }

        // Upload cover picture
        let coverPicUrl = "";
        if (coverPic) {
            const response = await axios.post(
                `/api/user/uploadimages`,
                coverPicData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            coverPicUrl = response.data.url;
            formData.coverpic = coverPicUrl;
        }

        // Update user profile
        const response = await axios.put(
            `http://localhost:8080/api/user/updateuser/${user.userName}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        

        if (response.status === 200) {
            alert("User updated successfully!");
            navigate("/dashboard");
            window.location.reload();

        } else {
            alert(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        alert(`User update failed due to an error: ${error}`);
        console.error("Error updating user data:", error);
    }
  };
  const [passwordmatch,setPassWordMatch]=useState(null);

  const deleteAccount = async (userName, email, password, e) => {
    e.preventDefault();
    setDeleteAccError([]);
    if(userName !== formData.userName) {
      alert("Please enter correct User name.");
      return;
    }
    if(email !== formData.email) {
      alert("Please enter correct Email.");
      return;
    }

    try {
      const checkmatching = await axios.put(`/api/user/matchpassword/${userName}`, null, {
        params: {
          password: password
        }
      });

      if (checkmatching.status !== 200) {
        alert("Incorrect password. Please enter the correct password.");
        return;
      }

      const response = await axios.delete(`/api/user/deleteuser/${userName}`);

      if (response.status === 200) {
        console.log("Account deleted successfully");
        alert("Your Account deleted successfully, You will be redirected to the Home Page.");
        logoutUser(); 
        return true;
      } else {
        console.error("Account deletion failed with status code: ", response.status);
        return false;
      }
    } catch (error) {
      console.error("Account deletion failed with error: ", error.message);
      return false;
    }
}; 

  return (
    <section>
    <section id="Updatesection">
      <h1 className="pveventstopics">Update your Account</h1>
      <form onSubmit={handleSubmit} id="updateprofile">
        <section id="infoContainer">
          <div id="detailscard1">
            <h1 className="pveventstopics">My Information</h1>
            <div className="topics">
              <h2 className="topicitem">Name</h2>
              <h2 className="subtopicitemupdate">First Name:</h2>
              <input
                id="fname"
                className="inputs"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitemupdate">Last Name:</h2>
              <input
                id="lname"
                className="inputs"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="topics">
              <h2 className="topicitem">Profession</h2>
              <input
                id="proffesion"
                className="inputs"
                type="text"
                name="proffesion"
                value={formData.proffesion}
                onChange={handleInputChange}
              />
            </div>
            <div className="topics">
              <h2 className="topicitem">Organization</h2>
              <input
                id="oname"
                className="inputs"
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleInputChange}
              />
            </div>
            <div className="topics">
              <h2 className="topicitem">Contacts</h2>
              <h2 className="subtopicitem">Email:</h2>
              <input
                id="email"
                className="inputs"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitem">Phone Number:</h2>
              <input
                id="phone"
                className="inputs"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitem">Alternate Phone Number:</h2>
              <input
                id="altPhoneNumber"
                className="inputs"
                type="text"
                name="altPhoneNumber"
                value={formData.altPhoneNumber}
                onChange={handleInputChange}
              />
              <h2 className="subtopicitem">Address:</h2>
              <input
                id="address"
                className="inputs"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="topics">
              <h2 className="topicitem">About Me</h2>
              <textarea
                id="aboutme"
                className="inputs"
                name="aboutme"
                maxLength={100}
                value={formData.aboutme}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <h2 className="topicitem">Profile Picture</h2>

            <div className="pics">
                <div className="picdiv">
                < img className="pictures" src={formData.propic} alt="Profile"  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePic"
                  onChange={handleImageChange}
                />
            </div>
            <h2 className="topicitem">Cover Picture</h2>

            <div className="pics">
                <div className="picdiv">
                <img className="pictures" src={formData.coverpic} alt="Cover"  />

                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="coverPic"
                  onChange={handleImageChange}
                />
            </div>
            
          </div>
          

          <div id="detailscard2">
            <div className="detailssubcard">
              <h1 className="pveventstopics">Account Details</h1>
              <div className="topics">
                <h2 className="topicitem">Account Category</h2>
                <select
                  id="accCategory"
                  className="inputs"
                  name="accCategory"
                  value={formData.accCategory}
                  onChange={handleInputChange}
                >
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
                  <option>None</option>
                </select>
              </div>
              <div className="topics">
                <h2 className="topicitem">User Type</h2>
                <select
                  id="userType"
                  className="inputs"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                >
                  <option value="stakeholder">Stakeholder</option>
                  <option value="resourceperson">Resource Person</option>
                
                </select>
              </div>
              <div className="topics">
                <h2 className="topicitem">User Name</h2>
                <input
                  id="userName"
                  className="inputs"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            
            <div className="detailssubcard">
              <h1 className="pveventstopics">Social Media</h1>
              <div className="topics">
                <h2 className="topicitem">Facebook</h2>
                <input
                  id="facebook"
                  className="inputs"
                  type="text"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleInputChange}
                />
              </div>
              <div className="topics">
                <h2 className="topicitem">YouTube</h2>
                <input
                  id="youtube"
                  className="inputs"
                  type="text"
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleInputChange}
                />
              </div>
              <div className="topics">
                <h2 className="topicitem">LinkedIn</h2>
                <input
                  id="linkedin"
                  className="inputs"
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div id="detailssubcard">
            <button type="submit" className="pdbtnupdate">Update</button>
            </div>
          </div>
          {errors.length > 0 && (
            <div className="errors">
              {errors.map((error, index) => (
                <p key={index} className="error">
                  {error}
                </p>
              ))}
            </div>
      )}
         <hr/> 
        </section>
        
      </form>
      </section>
      <section>
      <form onSubmit={(e) => changePassword(formData.userName, changePasswordFormData.oldPassword, changePasswordFormData.newPassword, e)}> 
        <div className="detailssubcarddelete">
        
              <h1 className="pveventstopics">Change Account Credentials</h1>
                
              <div className="topics">
                <h2 className="subtopicitem">User Name</h2>
                <input
                  id="youtube"
                  className="inputs"
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChangePassword}
                  readOnly
                />
              </div>
              <div className="topics">
                <h2 className="subtopicitem">Current password</h2>
                <input
                  id="linkedin"
                  className="inputs"
                  type="password"
                  name="oldPassword"
                  value={changePasswordFormData.oldPassword}
                  onChange={handleInputChangePassword}
                />
              </div>
              <div className="topics">
                <h2 className="subtopicitem">Password</h2>
                <input
                  id="linkedin"
                  className="inputs"
                  type="password"
                  name="newPassword"
                  value={changePasswordFormData.newPassword}
                  onChange={handleInputChangePassword}
                />
              </div>
              <div className="topics">
                <h2 className="subtopicitem">Confirm Password</h2>
                <input
                  id="linkedin"
                  className="inputs"
                  type="password"
                  name="rePassword"
                  value={changePasswordFormData.rePassword}
                  onChange={handleInputChangePassword}
                />
              </div>
              <button type="submit" className="pdbtnupdate" id="changepasseacc">Change Credentials</button>
              <div className="errors">
              {passchangeerror.map((error, index) => (
                <p key={index} className="error">
                  {error}
                </p>
              ))}
            </div>
            </div>  
      </form>
      <form onSubmit={(e) => deleteAccount(deleteAccFormData.userName,deleteAccFormData.email, deleteAccFormData.password, e)}> 
      <div className="detailssubcarddelete">
              <h1 className="pveventstopics">Delete Account</h1>
              <div className="topics">
                <h2 className="topicitem">Account Email</h2>
                <input
                  id="facebook"
                  className="inputs"
                  type="text"
                  name="email"
                  value={deleteAccFormData.email}
                  onChange={handleDeleteAccChange}
                />
              </div>
              <div className="topics">
                <h2 className="topicitem">User Name</h2>
                <input
                  id="youtube"
                  className="inputs"
                  type="text"
                  name="userName"
                  value={deleteAccFormData.userName}
                  onChange={handleDeleteAccChange}
                />
              </div>
              <div className="topics">
                <h2 className="topicitem">Password</h2>
                <input
                  id="linkedin"
                  className="inputs"
                  type="password"
                  name="password"
                  value={deleteAccFormData.password}
                  onChange={handleDeleteAccChange}
                />
              </div>
              <button type="submit" className="pdbtnupdate" id="deleteacc">Delete Account</button>

            </div>
            </form>       
        
     
    </section>
    </section>
  );
};

export default UpdateProfile;
