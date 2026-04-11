import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./ManageOrders.css";


function ManageOrders()
{
  const navigate = useNavigate();
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [editingOrder,setEditingOrder] = useState(null);
  const [status,setStatus] = useState("");


  const statusOptions = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  useEffect(() =>{
    fetchOrders();
  }, []);

  const fetchOrders = async () =>{
    try{
      const res = await fetch("https://myntraclone-backend-pcv6.onrender.com/orders");
      const data = await res.json();
      setOrders(data);

    }
    catch(err){
      console.error('Fetch orders errors:',err);
    }
    finally{
      setLoading(false);
    }
  };


  const handleStatusUpdate = async(orderId) =>{
    try{
      const res = await fetch(`https://myntraclone-backend-pcv6.onrender.com/orders/${orderId}/status`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'

        },
        body:JSON.stringify({status})
      });
      if(res.ok){
        alert('Status updates successfully');
        setEditingOrder(null);
        fetchOrders();
      }
    }
    catch(err){
      console.error('Update status error:',err);
    }
  };

  const handleBack =()=>{
    navigate("/admindashboard");
  };

if(loading)
  return <div className = "loading">LOading Orders</div>

return(
  <div className = "manage-orders-container">
    <div className = "manage-header">
      <h1>Manage Orders</h1>
      <button onClick ={handleBack} className="back-button"> Back to Dashboard</button>
    </div>

    <div className ="orders-table">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {orders.map((order)=>(
            <tr key={order._id}>
              <td>#{order._id.slice(-8)}</td>
              <td>{order.userId.name} <br/> {order.userId.phone}</td>
              <td> Rs{order.totalAmount?.toLocaleString()}</td>
              <td> <span className={`status-badge status-${order.status}`}>{order.status}</span></td>
              <td>{order.items.map(item=>(<div key={item.product._id}>{item.product.name}*{item.quantity}</div>))}</td>
              <td><select value ={editingOrder === order._id? status:order.status} onChange ={(e) =>{
                setEditingOrder(order._id);
                setStatus(e.target.value);
              }}> {statusOptions.map(s=>(<option key={s} value ={s}>{s}</option>))}</select>
              {editingOrder === order._id && (<button onClick={() => handleStatusUpdate(order._id)}className = "update-btn">Update</button>)}
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {orders.length === 0 && (<div>No orders found.</div>)}
  </div>
  
);


}
export default ManageOrders;
