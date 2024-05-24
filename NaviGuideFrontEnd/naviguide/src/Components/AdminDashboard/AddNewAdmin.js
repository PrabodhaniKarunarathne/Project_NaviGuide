import axios from "axios";
import React from "react";
import { useState } from "react";
import validator from "validator";


const AddAdmin=()=>{
  const [name,setName]=useState('');
  const [adminName,setAdminName]=useState('');
  const [email,setEmail]=useState('');
  const [repassword, setrepassword]=useState('');
  const [password, setpassword] = useState('');
  const [superAdminPassword,setsuperAdminPassword]=useState('');
  const [superAdminName,setSuperAdminName]=useState('');
  const [errors, setErrors] = useState([]);


  const registerAdminValidation =async(e)=>{
    e.preventDefault();
    setErrors([]);
    const title="normal";
    
    if(!name || !adminName ||!email||!password||!superAdminPassword){
      setErrors(['Please fill in all fields.']);
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

    

    console.log('No error in Empty inputs');
    saveAdmin(e);



  }
   
  async function saveAdmin(e){
    e.preventDefault();
  
    const passwordmatch = await axios.put(
      "/api/admin/matchsuperadminpassword",
      null,
      {
        params: {
          password: superAdminPassword,
          adminName: superAdminName,
        },
      }
    );
    if (passwordmatch.status === 200) {
      try {
        const response = await axios.post(
          "/api/admin/saveadmin",
          {
            adminName: adminName,
            name: name,
            password: password,
            email: email,
            title: "normal",
          },
          {
            headers: {
              "Content-Type": "application/json", // Set content type to JSON
            },
          }
        );
  
        if (response.status === 200) {
          alert("New Admin Registered Successfully");
          setAdminName("");
          setEmail("");
          setpassword("");
          setSuperAdminName("");
          setsuperAdminPassword("");
          setEmail("");
          setrepassword("");
          setName("");
        } else {
          alert("Unexpected response status: " + response.status);
        }
      } catch (err) {
        alert("User Registration Failed: Network Error");
      }
    }
  }
  

    return(
        <section id="addadminsection">
                <div id="AdminRegisterFormDiv">
                    <div id="topic_Reg">
                      <h2>Admin Registration</h2>
                    </div>
                  
                    <form onSubmit={(e)=>registerAdminValidation(e)}>
                   
                      <div id="content" className="adminaddcontent">

                        <div className="row" id="newsrow">

                            <div className="cardreg" id="cardregadmin">
                            <label htmlFor="name">Name</label>

                              <input
                                type="text"
                                className="inputssingleadminadd"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                              />
                            </div> 
                        </div>

                        <div className="row" id="newsrow">
                          <div className="cardreg">
                            <label htmlFor="email">email Address</label>
                                <input
                                  id="email"
                                  className="inputssingleadminadd"
                                  type="email"
                                  name="email"  
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                          </div>
                        
                          
                          </div>
                          <div className="row"id="newsrow">
                              <div className="cardreg">
                                <label htmlFor="userName">Adminname</label>
                                    <input
                                      id="adminName"
                                      className="inputssingleadminadd"
                                      type="text"
                                      name="adminName"  
                                      value={adminName}
                                      onChange={(e) => setAdminName(e.target.value)}
                                      required
                                    />
                            
                              </div>
                          </div>                        
                      <div className="row" id="newsrow">
                            <div className="cardreg">
                              <label htmlFor="password">password</label>
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="inputs"
                                value={password}
                                  onChange={(e) => setpassword(e.target.value)}
                                required
                              />
                            </div>
                            <div className="cardreg">
                              <label htmlFor="repassword">Re-type password</label>
                              <input
                                id="repassword"
                                className="inputs"
                                type="password"
                                name="repassword"
                                required
                                value={repassword}
                                onChange={(e) => setrepassword(e.target.value)}
                              />
                            </div>
                            
                      </div>   
                      <div className="row" id="newsrow">
                            <div className="cardreg">
                              <label htmlFor="spassword">Super Admin's Admin Name</label>
                              <input
                                  id="spassword"
                                  className="inputs"
                                  type="password"
                                  name="spassword"
                                  value={superAdminName}
                                  onChange={(e) => setSuperAdminName(e.target.value)}
                                  required
                                />

                            </div>
                            <div className="cardreg">
                              <label htmlFor="spassword">Super Admin password</label>
                              <input
                                  id="spassword"
                                  className="inputs"
                                  type="password"
                                  name="spassword"
                                  value={superAdminPassword}
                                  onChange={(e) => setsuperAdminPassword(e.target.value)}
                                  required
                                />

                            </div>
                      
                      </div>          
                           
                      <div id="button_Reg">
                                    <div id="buttons">
                                        <input 
                                          type="submit" 
                                          name="btnRegister" 
                                          className="btnRegister" 
                                          value="Register Admin"
                                          
                                          
                                        />
                        </div>
                                    
                      </div>  
                    </div>            
                  </form>
                </div>
        </section>
    );

}
export default AddAdmin;