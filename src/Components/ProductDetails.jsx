import React,{ useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./ProductDetails.css";

function ProductDetails(){
    const { id } = useParams();
    const [ product,setProduct ]=useState(null);
    const { user, updateCart } = useUser();

    useEffect(()=>{
        fetch(`http://localhost:5000/products/${id}`)
        .then((res)=>res.json())
        .then((data)=>setProduct(data))
        .catch((err)=>console.log(err));
    },[id]);
    if(!product){
        return <h2>Loading,,,,,,,</h2>

    }
    return(
        <div className="product-details">
             <div className="details-image">
  <img 
    src={`https://myntraclone-backend-pcv6.onrender.com/uploads/${product.image}`} 
    alt={product.name} 
  />
</div>

            <div className="details-info">
                <h1>{product.name}</h1>
                <h2>₹ {product.price}</h2>
                <p>{product.description}</p>

                <button 
                  className="cart" 
                  onClick={async () => {
                    if (!user) {
                      alert('Please login to add to cart');
                      return;
                    }
                      console.log("USER:", user);
  console.log("USER ID:", user?._id);
  console.log("PRODUCT:", product);
  console.log("PRODUCT ID:", product?._id);
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
                        const errorText = await res.text();
                        alert(`Failed to add to cart: ${res.status} - ${errorText}`);
                      }
                    } catch (err) {
                      console.error('Add to cart error:', err);
                      alert(`Network error adding to cart: ${err.message}`);
                    }
                  }}
                >
                  Add to Cart
                </button>
                <button className="buy">Buy</button>
            </div>
        </div>
    );
}
export default ProductDetails;
