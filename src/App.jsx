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
import Dashboard from "./Components/Dashboard";
import MyOrders from "./Components/MyOrders";
import Footer from "./Components/Footer";
import Search from "./Components/Search";

import ProductDetails from "./Components/ProductDetails";
import Checkout from "./Components/Checkout";



function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/men" element={<><Navbar /><Men /><Footer /></>} />
        <Route path="/women" element={<><Navbar /><Women /><Footer /></>} />
        <Route path="/kids" element={<><Navbar /><Kids /><Footer /></>} />
        <Route path="/home-living" element={<><Navbar /><HomeLiving /><Footer /></>} />
        <Route path="/beauty" element={<><Navbar /><Beauty /><Footer /></>} />
        <Route path="/studio" element={<><Navbar /><Studio /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
        <Route path="/carousel" element={<><Navbar /><Carousel /><Footer /></>} />
        <Route path="/product/:id" element={<><Navbar /><ProductDetails /><Footer /></>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AddProducts />} />
        <Route path="/admin/manage-orders" element={<ManageOrders />} />
        <Route path="/admin/manage-products" element={<ManageProducts />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/orders" element={<><Navbar /><MyOrders /><Footer /></>} />
        <Route path="/search" element={<><Navbar /><Search /><Footer /></>} />
        <Route path="/bag" element={<><Navbar /><Bag /><Footer /></>} />
        <Route path="/checkout" element={<><Navbar /><Checkout /><Footer /></>} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
