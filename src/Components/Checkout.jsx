import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import "./Checkout.css";

const Checkout = () => {
  const { user, cartItems, updateCart } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (acc, item) => acc + (item.product?.price * item.quantity || 0),
    0
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleRazorpayPayment = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: total })
      });

      const data = await res.json();

     const options = {
  key: "rzp_test_SZ2hDFf0RO3e6M",
  amount: data.amount,
  currency: "INR",
  order_id: data.id,

  name: "Myntra Clone",
  description: "Order Payment",

  prefill: {
    name: formData.fullName,
    email: user?.email || "test@example.com",
    contact: formData.phone
  },

  theme: {
    color: "#ff3f6c"
  },

  handler: async function (response) {
    alert("Payment Successful ");

    const orderRes = await fetch("http://localhost:5000/orders/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        address: formData,
        items: cartItems,
        totalAmount: total,
        paymentMethod: "RAZORPAY",
        paymentId: response.razorpay_payment_id
      })
    });

    if (orderRes.ok) {
      alert("Order placed successfully!");
      updateCart();
      navigate("/bag");
    } else {
      alert("Order saving failed");
    }
  }
};

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (paymentMethod === "COD") {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/orders/placeOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            address: formData,
            paymentMethod
          })
        });

        if (res.ok) {
          alert("Order placed successfully!");
          updateCart();
          navigate("/bag");
        } else {
          const error = await res.json();
          alert(error.message || "Failed to place order");
        }
      } catch (err) {
        console.error(err);
        alert("Network error");
      }
      setLoading(false);
    }

 
    else if (paymentMethod === "UPI") {
      handleRazorpayPayment();
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-left">
        <h2>Delivery Address</h2>
        <form onSubmit={handleOrder}>
          <div className="address-box">
            <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} required />
            <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
            <textarea name="street" placeholder="Street Address" value={formData.street} onChange={handleInputChange} required />
            <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required />
            <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleInputChange} required />
          </div>

          <h2>Payment Method</h2>
          <div className="payment-box">
            <label>
              <input type="radio" value="COD" checked={paymentMethod === "COD"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Cash on Delivery
            </label>

            <label>
              <input type="radio" value="UPI" checked={paymentMethod === "UPI"} onChange={(e) => setPaymentMethod(e.target.value)} />
              Pay Online (Razorpay)
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Placing Order..." : `PLACE ORDER - ₹${total}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;