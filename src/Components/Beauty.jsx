import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./Beauty.css";

function Beauty() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, updateCart } = useUser();
  

  useEffect(() => {
    fetchBeautyProducts();
  }, []);

  const fetchBeautyProducts = async () => {
    try {
      const response = await axios.get("https://myntraclone-backend-pcv6.onrender.com/all");
      const BeautyProducts = response.data.filter(product => product.category === "Beauty");
      setProducts(BeautyProducts);    
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="beauty-loading">
        <p>Loading Beauty products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="beauty-error">
        <p>{error}</p>
        <button onClick={fetchBeautyProducts}>Retry</button>
      </div>
    );
  }

  return (
    <>
      
      <div className="beauty-container">
        <div className="beauty-header">
          <h1>Beauty Collection</h1>
          <p>Discover the latest trends for Beauty </p>
        </div>
        <div className="products-grid">
          {products.length === 0 ? (
            <p className="no-products">No Beauty products available. Add some via Admin - Add Products!</p>
          ) : (
            products.map((product) => (
             <Link to ={`/product/${product._id}`}key={product._id} className="product-link">
                           <div key={product._id} className="product-card">
                             <img 
                               src={`https://myntraclone-backend-pcv6.onrender.com/uploads/${product.image}`}    alt={product.name}    className="product-image" />
                             <div className="product-info">
                               <h3 className="product-name">{product.name}</h3>
                               <p className="product-desc">{product.description}</p>
                               <div className="product-price">{product.price}</div>
                               <button  className="add-cart-btn"   onClick={async (e) => {
                                   e.preventDefault();
                                   e.stopPropagation();
                                   if (!user) {
                                     alert('Please login to add to cart');
                                     return;
                                   }
                                   try {
                        const res = await fetch('https://myntraclone-backend-pcv6.onrender.com/cart/addToCart', {
                          method: 'POST',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify({ userId: user._id, productId: product._id })
                        });
                        if (res.ok) {
                                       updateCart();
                                       alert('Added to cart!');
                                     } else {
                                       alert('Failed to add to cart');
                                     }
                                   } catch (err) {
                                     alert('Error adding to cart');
                                   }
                                 }}
                               >
                                 Add to Cart
                               </button>
                             </div>
                           </div>
                           </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Beauty;
