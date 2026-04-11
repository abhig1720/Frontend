import React from "react";
import { UserProvider } from "./contexts/UserContext";
import Bag from "./Components/Bag";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Otp from "./Components/Otp";
import Home from "./Components/Home";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Kids from "./Components/Kids";
import HomeLiving from "./Components/HomeLiving";
import Beauty from "./Components/Beauty";
import Studio from "./Components/Studio";
import Signup from "./Components/Signup";
import Admin from "./Components/Admin";
import Carousel from "./Components/Carousel";
import AdminDashboard from "./Components/AdminDashboard";
import AddProducts from "./Components/AddProducts";
import ManageProducts from "./Components/ManageProducts";
import ManageUsers from "./Components/ManageUsers";
import ManageOrders from "./Components/ManageOrders";
import Success from "./Components/Success";

import ProductDetails from "./Components/ProductDetails";
import Checkout from "./Components/Checkout";



function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/login" element={<><Navbar/><Login /></>} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/men" element={<><Navbar/><Men /></>} />
        <Route path="/women" element={<><Navbar/><Women /></>} />
        <Route path="/kids" element={<><Navbar/><Kids /></>} />
        <Route path="/home-living" element={<><Navbar/><HomeLiving /></>} />
        <Route path="/beauty" element={<><Navbar/><Beauty /></>} />
        <Route path="/studio" element={<><Navbar/><Studio /></>} />
        <Route path="/signup" element={<><Navbar/><Signup /></>} />
        <Route path="/carousel" element={<><Navbar/><Carousel/></>} />
        <Route path="/product/:id" element={<><Navbar/><ProductDetails/></>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AddProducts />} />
        <Route path="/admin/manage-orders" element={<ManageOrders />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/bag" element={<><Navbar/><Bag /></>} />
        <Route path="/checkout" element={<><Navbar/><Checkout/></>}/>
        <Route path="/success" element={<Success />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
