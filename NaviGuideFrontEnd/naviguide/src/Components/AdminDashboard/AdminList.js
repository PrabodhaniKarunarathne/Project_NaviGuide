import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminList=()=>{
    const [adminlist,setAdminList] = useState([]);
    const [error,setError] =useState(null);
    const [deletePressed,setDeletePressed]=useState(null);
    const [superAdminPassword,setsuperAdminPassword]=useState('');
  const [superAdminName,setSuperAdminName]=useState('');

    useEffect(() => {
        const fetchAdminList= async () => {
            try{
                const responseadmins = await axios.get("/api/admin/getalladmins");
                setAdminList(responseadmins.data);


            }
            catch (error) {
                setError(error.message);
                console.error('Failed to fetch user data: ', error);
            }
        };
        fetchAdminList();
    },[]
);


async function deleteAdmin(adminName, e) {
    e.preventDefault(); 
  
    try {
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
          const responsedelete = await axios.delete(
            `/api/admin/deleteadmin/${adminName}`
          );
          alert("Admin Account Deleted");
          window.location.reload();
        } catch (err) {
          alert("Admin Deletion Failed: Network Error");
          console.error('Failed to delete Admin: ', err);
        }
      }
    } catch (error) {
      setError(error.message);
      alert("Account Deletion unsuccessful");
      console.error('Failed to authenticate super admin: ', error);
    }
  }
  

    return(
        <section>
            {adminlist.map(admin => (                            
                            <li key={admin.adminName} className="adminlist">
                               <div class="container mt-5 d-flex justify-content-center">
                                    <div class="card p-3">
                                        <div class="innerdetails">   

                                        <h4 class="mb-0 mt-0">{admin.name}</h4>
                                        <span>Account Type :{admin.title}</span>                                     

                                        <h4 class="mb-0 mt-0"></h4>
                                        

                                        
                                        <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats" id="admininfo">
                                            <div class="d-flex flex-column">
                                            <span>Account Email :{admin.email}</span>
                                            </div>                                        
                                        </div>
                                        
                                        {deletePressed ===admin.adminName ?(
                                            <div>
                                                <h5>Do you want to Delete this Admin ?</h5>
                                                <form onSubmit={(e) => deleteAdmin(admin.adminName, e)}>

                                                
                                                <div class="button mt-2 d-flex flex-row align-items-center">
                                                <div className="row" id="newsrow">
                                                    <div className="cardreg">
                                                    <label htmlFor="spassword">Super Admin Admin Name</label>
                                                    <input
                                                        id="spassword"
                                                        className="inputs"
                                                        type="password"
                                                        name="adminName"
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
                                                </div>
                                                      
                                                <div class="button mt-2 d-flex flex-row align-items-center">
                                                    <button className="sidebarbtn" id="editadminbtnno" onClick={()=>setDeletePressed(null)} >No</button>
                                                    <input value="Yes" type="submit" className="sidebarbtn" id="deleteadminbtnyes"/>
                                                </div>
                                                </form> 
                                            </div>
                                       
                                        ):(
                                           <div class="button mt-2 d-flex flex-row align-items-center">
                                           <button className="sidebarbtn" id="deleteadminbtn"onClick={() => setDeletePressed(admin.adminName)}> Delete Admin</button>

                                                                                  
                                        </div>
                                        )}
                                </div>
                                </div>
                                </div>
                            </li>
                           
                        ))}
                           
                     
        </section>
    );

}
export default AdminList;