import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageUsers.css';



function ManageUsers() {
    const [users,setUsers]=useState([]);
    const [loading,setLoading]=useState(true);
    const [editModal,setEditModal]=useState(false);
    const [selectedUser,setSelectedUser]=useState(null);
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        role:""
    });
    const navigate=useNavigate();


    useEffect(()=>{
        fetchUsers();
    }, []);

    const fetchUsers= async()=>{
        try{
            const response = await axios.get("http://localhost:5000/users/all");
            setUsers(response.data);
        }
        catch(error){
            console.error("Failed to fetch users");
        }
        finally{
            setLoading(false);
        }
    };

    const handleDelete = async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/users/delete/${id}`);
            setUsers(users.filter(user=> user._id!==id));
        }
        catch(error){
            console.error("delete failed",error);
        }
    }
     
        

    const handleChange=(e)=>{
        setFormData({
            ...formData,[e.target.name]:e.target.value
        });
    };

    const handleUpdate = async(e)=>{
        setSelectedUser(user);
        setFormData({
            name:user.name||"",
            phone:user.phone||"",
            email:user.email||"",
            password:"",
            confirmPassword:""
        });
        setEditModal(true);
       
    };



    const handleBack =()=>{
        navigate("/admindashboard");
    };
    if(loading) return <div className="loading......."></div>;

    return(
        <div className ="manage-users-container">
            <div className = "manage-header">
                <h2> Manage Users</h2>
                <button onClick={handleBack} className="back-btn">Back to Dashboard</button>

            </div>
            <div className="users-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th> phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.email}</td>
                                <td> <button onClick={()=> handleEdit(user)} className="edit-btn"> Edit</button>
                                        <button onClick={()=> handleDelete(user._id)} className="delete-btn">Delete</button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editModal &&(
                <div className ="modal-overlay">
                    <div className = "edit-modal">
                        <h3>Edit User</h3>
                        <form onSubmit ={handleUpdate} >
                        <div className ="form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                                </div>
                                <div className = "form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className = "form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className = "form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required />    
                                </div>
                                <div className = "form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                            </div>
                            <div className ="modal-buttons">
                                <button type="submit" className= "submit-button">Update</button>
                                <button onClick={()=> setEditModal(false)} className="cancel-button">Cancel</button>
                            </div>
                                
                                </form>
                    </div>
                    </div>
            )}
        </div>
    );
}

export default ManageUsers;