
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import "./Navbar.css";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, cartItems, logout } = useUser();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate("/search");
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">MYNTRA</Link>

        <ul className="nav-links">
          <li><Link to="/men">MEN</Link></li>
          <li><Link to="/women">WOMEN</Link></li>
          <li><Link to="/kids">KIDS</Link></li>
          <li><Link to="/home-living">HOME LIVING</Link></li>
          <li><Link to="/studio">BEAUTY</Link></li>
        </ul>
      </div>

      <div className="nav-center">
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          className="search-input"  
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="nav-right">
        
        <div 
          className="user-profile"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <span className="nav-icon"></span>
          <span className="nav-text">Profile</span>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <p className="welcome-text">Welcome</p>
                <p className="dropdown-subtext">To access account & orders</p>
                {user ? (
                  <>
                    <p className="welcome-text">{user.name}</p>
                    <button onClick={logout} className="logout-btn">Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="login-btn">Login / Sign Up</Link>
                )}
              </div>
              <div className="dropdown-links">
                <Link to="/orders">My Orders</Link>
                <Link to="/wishlist">Wishlist</Link>
               
              </div>
            </div>
          )}
        </div>

        <Link to="/wishlist" className="nav-item">
          <span className="nav-icon"></span>
          <span className="nav-text">Wishlist</span>
        </Link>

        <Link to="/bag" className="nav-item">
          <span className="nav-icon"></span>
          <span className="nav-text">Bag {user && `(${cartItems.length})`}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
