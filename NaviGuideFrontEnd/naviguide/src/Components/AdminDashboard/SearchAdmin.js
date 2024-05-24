import React from "react";
import "./AdminDashboard.css";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const SearchAdmin=()=>{
    const [searchedAccCatagory, setSearchedAccCatagory] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);
    const [deletePressed,setDeletePressed]=useState(null);
    const [adminPassword,setAdminPassword]=useState('');
    const [adminName,setAdminName]=useState('');
    const [adminTitleSuper,setAdminTitleSuper]=useState('');
    const [adminTitleNormal,setAdminTitleNormal]=useState('');


    const handleSearch = (e) => {
        e.preventDefault();
        switch(searchedAccCatagory) {
            case "Resource":
                fetch("/api/user/searchres")
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
                })
                    .then(data => {
                    setSearchResults(data);
                    setError(null);
               
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data. Please try again.');
                });
              break;
            case "stakeholder":
                fetch("/api/user/searchstake")
                .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
                })
                    .then(data => {
                    setSearchResults(data);
                    setError(null);
               
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data. Please try again.');
                });
             
              break;
            default:
                fetch(`/api/user/getaccbycatagory/${searchedAccCatagory}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return response.json();
                })
                .then(data => {
                    setSearchResults(data);
                    setError(null);
                   
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError('Failed to fetch data. Please try again.');
                });
          }
   
    };
    async function deleteUser(userName, e) {
        e.preventDefault(); 

        if(adminTitleNormal==="normal"){
            try{
                const passwordmatchAdmin = await axios.put(
                    "/api/admin/matchadminpassword",
                    null,
                    {
                      params: {
                        password: adminPassword,
                        adminName: adminName,
                      },
                    }
                );
                if (passwordmatchAdmin.status === 200){
                    try {
                        const responsedelete = await axios.delete(
                          `/api/user/deleteuser/${userName}`
                        );
                        alert("User Account Deleted");
                        setAdminTitleNormal("");

                        window.location.reload();

                      } catch (err) {
                        alert("User Deletion Failed: Network Error");
                        console.error('Failed to delete User: ', err);
                      }
                  }

            } catch (error) {
            setError(error.message);
            alert("Account Deletion unsuccessful");
            console.error('Failed to authenticate super admin: ', error);
            }
        }

        
        if(adminTitleSuper==="super"){
            try{
                const passwordmatchSuperAdmin = await axios.put(
                    "/api/admin/matchsuperadminpassword",
                    null,
                    {
                      params: {
                        password: adminPassword,
                        adminName: adminName,
                      },
                    }
                  );
                  if (passwordmatchSuperAdmin.status === 200 ) {
                    try {
                      const responsedelete = await axios.delete(
                        `/api/user/deleteuser/${userName}`
                      );
                      alert("User Account Deleted");
                      setAdminTitleSuper("");

                      window.location.reload();
                    } catch (err) {
                      alert("User Deletion Failed: Network Error");
                      console.error('Failed to delete User: ', err);
                    }
                  }
            } catch (error) {
            setError(error.message);
            alert("Account Deletion unsuccessful");
            console.error('Failed to authenticate super admin: ', error);
            }
        }
    }


    return(
        <section>
                <div id="searchdiv">
            <div id="searchformdiv">
                <form id="searchform" onSubmit={(e)=>handleSearch(e)}>

                    <select id="searchByCat" value={searchedAccCatagory} onChange={(e) => setSearchedAccCatagory(e.target.value)}>
                        <optgroup label="Search by Account types">
                        <option value={"resourceperson"}>Search Resource Persons</option>
                        <option value={"stakeholder"}>Search Stakeholders</option>
                        </optgroup>
                        <h1></h1>
                        <optgroup label="Search by Resource person categaries">
                        <option value={"Health Awareness"}>Health Awareness</option>
                        <option value={"Environmental Awareness"}>Environmental Awareness</option>
                        <option value={"Social Issues Awareness"}>Social Issues Awareness</option>
                        <option value={"Safety and Security Awareness"}>Safety and Security Awareness</option>
                        <option value={"Educational Awareness"}>Educational Awareness</option>
                        <option value={"Cultural Awareness"}>Cultural Awareness</option>
                        <option value={"Workplace Awareness"}>Workplace Awareness</option>
                        <option value={"Human Rights Awareness"}>Human Rights Awareness</option>
                        <option value={"Technology and Digital Literacy Awareness"}>Technology and Digital Literacy Awareness</option>
                        <option value={"Political and Civic Awareness"}>Political and Civic Awareness</option>
                        </optgroup>
                    </select>
                    <input type="submit" value="Filter Users" />
                </form>
            </div>
            

            <div id="searchResults">
                {error && <p>{error}</p>}
                {searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map(user => (                            
                            <li key={user.userName} className="listsearchadmin">
 
                                <div class="container mt-5 d-flex justify-content-center">
                                <div class="card p-3">
                                    <div class="imageandtxtcontainer">
                                        <div class="image mr-3">
                                        <img src={user.propic} class="rounded ml-5" width="155" />                                    </div>
                                    <div class="innerdetails">
                                       
                                    <h4 class="mb-0 mt-0">{user.firstName} {user.lastName}</h4>
                                    <span>{user.proffesion}</span>
                                    <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                        <div class="d-flex flex-column">
                                            <span class="rating">Rating</span>
                                            <span class="number3">{user.userRating}</span>                                           
                                        </div>                                        
                                    </div>
                                    {deletePressed===user.userName?(
                                        <div>
                                             <h5>Do you want to Delete this User Account ?</h5>
                                             <form onSubmit={(e) => deleteUser(user.userName, e)}>        
                                                <div class="button mt-2 d-flex flex-row align-items-center">
                                                <div className="row" id="newsrow">
                                                    <div className="cardreg">
                                                    <label htmlFor="spassword">Admin Name</label>
                                                    <input
                                                        id="adminName"
                                                        className="inputs"
                                                        type="password"
                                                        name="adminName"
                                                        value={adminName}
                                                        onChange={(e) => setAdminName(e.target.value)}
                                                        required
                                                        />

                                                    </div>
                                                    <div className="cardreg">
                                                    <label htmlFor="spassword">Admin password</label>
                                                    <input
                                                        id="spassword"
                                                        className="inputs"
                                                        type="password"
                                                        name="spassword"
                                                        value={adminPassword}
                                                        onChange={(e) => setAdminPassword(e.target.value)}
                                                        required
                                                        />

                                                    </div>
                                                </div>  
                                                
                                                </div>
                                                <div className="row" id="newsrow">
                                                <div className="cardregtype">
                                                        <input 
                                                            type="radio" 
                                                            id="resource" 
                                                            name="userType"
                                                            value={adminTitleSuper}
                                                            className="chkbox"
                                                            onChange={(e)=> setAdminTitleSuper("super")}  />
                                                            <label htmlFor="resource" >Super Admin</label>
                                                        <input 
                                                            type="radio" 
                                                            id="stake" 
                                                            name="userType"
                                                            value={setAdminTitleNormal}
                                                            className="chkbox"
                                                            onChange={(e)=> setAdminTitleNormal("normal")}
                                                            /><label htmlFor="stake">Admin</label>

                                                </div>       
                                                </div>
                                                    
                                                <div class="button mt-2 d-flex flex-row align-items-center">
                                                    <button className="sidebarbtn" id="editadminbtnno" onClick={()=>setDeletePressed(null)} >No</button>
                                                    <input value="Yes" type="submit" className="sidebarbtn" id="deleteadminbtnyes"/>
                                                </div>
                                            </form>                                         </div>
                                    ):(
                                    <div class="button mt-2 d-flex flex-row align-items-center">
                                        <div id="btnclassuseradmin">
                                        <button class="btn btn-sm btn-outline-primary w-100"> 
                                                        <Link to={`/profile/${user.userName}`} className="viewlink" id="linkprofile">View Profile</Link>
                                                        </button>
                                            <button className="btn btn-sm btn-outline-primary w-100" id="deleteuserbtn"onClick={() => setDeletePressed(user.userName)}> Delete User</button>             
                                        </div>
                                      
                                    </div>
                                    )}
                                    
                                    </div>                                       
                                    </div>                                    
                                </div>
                                </div>
                            
                            
                            </li>
                           
                        ))}
                        
                    </ul>
                ) : (
                    <p></p>
                )}

            </div>

        </div>
        </section>
    );
}

export default SearchAdmin;