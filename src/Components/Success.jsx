import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, total, paymentMethod } = location.state || {};

  return (
    <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#28a745' }}>Payment Successful!</h1>
      <h2>Order #{orderId?.slice(-8) || 'N/A'}</h2>
      <p>Amount: ₹{total?.toLocaleString() || 'N/A'}</p>
      <p>Method: {paymentMethod || 'N/A'}</p>
      <p>Your order is confirmed. Track in Manage Orders or contact support.</p>
      <button onClick={() => navigate('/')} style={{ background: '#ff3f6c', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '5px', cursor: 'pointer' }}>
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;
