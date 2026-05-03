import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Dashboard from "./Dashboard";

function AdminDashboard(){
    const navigate = useNavigate();
    
    const handleLogout=()=>{
        localStorage.removeItem("isAdmin");
        navigate("/admin-login");
    }

    const handleNavigate = (page) => {
        if (page === "Manage Products") navigate("/admin/manage-products");
        if (page === "Manage Orders") navigate("/admin/manage-orders");
        if (page === "Manage Users") navigate("/admin/users");
        if (page === "Add Product") navigate("/admin/products");
    };

    return(
        <div className="admin-dashboard-container">
            <div className="admin-navbar">
                <div className="admin-logo">Myntra</div>
                <div className="admin-nav-links">
                    <span onClick={()=> navigate("/admin/products")}>Add Products</span>
                    <span onClick={()=> navigate("/admin/manage-products")}>Manage Products</span>
                    <span onClick={()=> navigate("/admin/manage-orders")}>Manage Orders</span>
                    <span onClick={()=> navigate("/admin/users")}>Manage Users</span>
                    <span onClick={handleLogout}>Logout</span>
                </div>
            </div>
            <div className="admin-dashboard-content">
                <Dashboard setActivePage={handleNavigate} />
            </div>
        </div>
    );
}

export default AdminDashboard;