import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import './Search.css';

const CATEGORIES = [
  "Men",
  "Women",
  "Kids",
  "Home Living",
  "Beauty",
];

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, updateCart } = useUser();

    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get('q') || '';
    const initialCategory = queryParams.get('category') || '';
    const initialMinPrice = queryParams.get('minPrice') || '';
    const initialMaxPrice = queryParams.get('maxPrice') || '';

    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Sidebar filter states
    const [category, setCategory] = useState(initialCategory);
    const [minPrice, setMinPrice] = useState(initialMinPrice);
    const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch("https://myntraclone-backend-pcv6.onrender.com/products/all");
                if (res.ok) {
                    const data = await res.json();
                    setAllProducts(data || []);
                }
            } catch (err) {
                console.error("Search Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);

    // Client-side filtering
    useEffect(() => {
        let filtered = [...allProducts];

        if (initialQuery) {
            const q = initialQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.name?.toLowerCase().includes(q) || 
                p.description?.toLowerCase().includes(q)
            );
        }

        if (initialCategory) {
            filtered = filtered.filter(p => p.category?.toLowerCase() === initialCategory.toLowerCase());
        }

        if (initialMinPrice) {
            filtered = filtered.filter(p => p.price >= Number(initialMinPrice));
        }

        if (initialMaxPrice) {
            filtered = filtered.filter(p => p.price <= Number(initialMaxPrice));
        }

        setProducts(filtered);
    }, [allProducts, initialQuery, initialCategory, initialMinPrice, initialMaxPrice]);

    const handleApplyFilters = () => {
        const params = new URLSearchParams();
        if (initialQuery) params.append('q', initialQuery);
        if (category) params.append('category', category);
        if (minPrice) params.append('minPrice', minPrice);
        if (maxPrice) params.append('maxPrice', maxPrice);

        navigate(`/search?${params.toString()}`);
    };

    const handleClearFilters = () => {
        setCategory('');
        setMinPrice('');
        setMaxPrice('');
        if (initialQuery) {
            navigate(`/search?q=${initialQuery}`);
        } else {
            navigate(`/search`);
        }
    };

    const handleAddToCart = async (product) => {
        if (!user) {
            alert("Please login first");
            navigate("/login");
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
            console.error(err);
            alert('Network error');
        }
    };

    return (
        <div className="search-page-container">
            <h1 className="search-title">
               {initialQuery ? `Results for "${initialQuery}"` : "All Products"}
               <span className="results-count">({products.length} items found)</span>
            </h1>

            <div className="search-layout">
                <aside className="search-sidebar">
                    <h3>Filters</h3>
                    
                    <div className="filter-group">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">All Categories</option>
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>Price Range (Rs)</label>
                        <div className="price-inputs">
                            <input type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} min="0" />
                            <span> - </span>
                            <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} min="0" />
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button className="btn-apply-filters" onClick={handleApplyFilters}>Apply</button>
                        <button className="btn-clear-filters" onClick={handleClearFilters}>Clear</button>
                    </div>
                </aside>

                <main className="search-results">
                    {loading ? (
                        <div className="loading-spinner">Loading...</div>
                    ) : (
                        <div className="search-product-grid">
                            {products.length === 0 ? (
                                <p className="no-results">No products matched your search. Try different keywords or clearing filters.</p>
                            ) : (
                                products.map(product => (
                                    <Link to={`/product/${product._id}`} key={product._id} className="search-product-card-link">
                                        <div className="search-product-card">
                                            <div className="search-product-image">
                                                {product.image ? (
                                                    <img src={`https://myntraclone-backend-pcv6.onrender.com/uploads/${product.image}`} alt={product.name} />
                                                ) : (
                                                    <div className="no-image">No Image</div>
                                                )}
                                            </div>
                                            <div className="search-product-info">
                                                <h4>{product.name}</h4>
                                                <p className="search-category">{product.category}</p>
                                                <p className="search-price">Rs {product.price}</p>
                                                <button 
                                                    className="btn-add-cart-tiny" 
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddToCart(product);
                                                    }}
                                                >
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
