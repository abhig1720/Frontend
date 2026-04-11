import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Bag.css';

const Bag = () => {
  const { user, cartItems, updateCart } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) updateCart();
  }, [user, updateCart]);

  if (!user) {
    return (
      <div className="bag-empty">
        <h2>Please <Link to="/login">login</Link> to view your bag</h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bag-empty">
        <h2>Your bag is empty</h2>
        <Link to="/home">Shop now</Link>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price * item.quantity || 0), 0);

  const handleUpdateQty = async (productId, newQty) => {
    await fetch(`http://localhost:5000/cart/updateCart/${user._id}/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty })
    });
    updateCart();
  };

  const handleRemove = async (productId) => {
    await fetch(`http://localhost:5000/cart/removeFromCart/${user._id}/${productId}`, { method: 'DELETE' });
    updateCart();
  };

  return (
    <div className="bag-page">
      <div className="bag-header">
        <h1>My Bag ({cartItems.length})</h1>
      </div>
      <div className="bag-content">
        <div className="bag-items">
          {cartItems.map((item) => (
            <div key={item.product._id} className="bag-item">
              <img src={`http://localhost:5000/uploads/${item.product.image}`} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>₹{item.product.price} x {item.quantity}</p>
                <div className="qty-controls">
                  <button onClick={() => handleUpdateQty(item.product._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQty(item.product._id, item.quantity + 1)}>+</button>
                  <button onClick={() => handleRemove(item.product._id)} className="remove">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bag-summary">
          <h3>Total: ₹{total.toLocaleString()}</h3>
          <button onClick={()=>navigate("/checkout")}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Bag;

