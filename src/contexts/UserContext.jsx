import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      if (parsed._id) {
  fetchCart(parsed._id);
}
    }
    setLoading(false);
  }, []);

  const fetchCart = async (userId) => {
    try {
      const res = await fetch(`https://myntraclone-backend-pcv6.onrender.com/cart/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setCartItems(data || []);
      }
    } catch (err) {
      console.error('Fetch cart error:', err);
    }
  };

  const login = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    fetchCart(userData._id);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    setCartItems([]);
  }, []);

const updateCart = useCallback(() => {
  if (user?._id) {
    fetchCart(user._id);
  }
}, [user]);

  const value = {
    user,
    cartItems,
    loading,
    login,
    logout,
    updateCart,
    fetchCart
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

