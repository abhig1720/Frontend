import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

import "./Home.css";

function Home() {

  const [allProducts ,setAllProducts]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    fetch(`https://myntraclone-backend-pcv6.onrender.com/products/all`)
    .then(res=>res.json())
    .then(data=>{
      setAllProducts(data);
      setLoading(false);
    })
    .catch(err=>{
      console.error('fetch error',err);
      setLoading(false);
    });
  },[]);

  
  const categories = [
    { id: 1, name: "Men", link: "/men", color: "#1E3A5F" },
    { id: 2, name: "Women", link: "/women", color: "#FF4785" },
    { id: 3, name: "Kids", link: "/kids", color: "#7C3AED" },
    { id: 4, name: "Home & Living", link: "/home-living", color: "#F59E0B" },
    { id: 5, name: "Beauty", link: "/beauty", color: "#EC4899" },
    { id: 6, name: "Studio", link: "/studio", color: "#06B6D4" },
  ];

  

  const brands = [
    "Nike", "Adidas", "Puma", "Levi's", "Raymond", "Peter England",
    
  ];

  const deals = [
    { id: 1, title: "Min 50% Off", subtitle: "Clearance Sale", color: "#FF3F6C" },
    { id: 2, title: "Buy 2 Get 1 Free", subtitle: "T-Shirts", color: "#14B8A6" },
   
  ];

  return (
    <div className="home-page">
      <Carousel/>
    
      <div className="festival-banner">
        <h1>BIG FASHION FESTIVAL</h1>
        <p>Extra 20% Off on Rs.2499 | Extra 30% Off on Rs.3999</p>
      </div>

      <section className="categories-section">
        <h2>SHOP BY CATEGORY</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link to={cat.link} key={cat.id} className="category-card" style={{ backgroundColor: cat.color }}>
              <span className="category-name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="products-section">
    <h2>All Products</h2>
    {loading?(
      <p>loading PRoducts...</p>
    ):allProducts.length===0?(
      <p>No Products available</p>
    ):(
      <div className="products-grid">
        {allProducts.map((product)=>(
          <Link to={`/product/${product._id}`} key={product._id} className="product-link">
            <div  className="product-card">
              <img src={`https://myntraclone-backend-pcv6.onrender.com/uploads/${product.image}`} alt={product.name} className="product-image"/>
              <h3>{product.name}</h3>
              <p className="product-price">₹{product.price}</p>
              <p className="product-category">{product.category}</p>
              <p className="product-desc">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </section>

      <section className="deals-section">
        <h2>DEALS OF THE DAY</h2>
        <div className="deals-grid">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-card" style={{ backgroundColor: deal.color }}>
              <h3>{deal.title}</h3>
              <p>{deal.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="brands-section">
        <h2>TOP BRANDS</h2>
        <div className="brands-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-card">
              <span className="brand-name">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
      
        <div className="feature">
          <h3>Easy Returns</h3>
          <p>30 day return policy</p>
        </div>
        
        <div className="feature">
          <h3>24/7 Support</h3>
          <p>Round the clock assistance</p>
        </div>
      </section>

    </div>
  );
}

export default Home;

