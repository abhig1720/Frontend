import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { useUser } from '../contexts/UserContext';
import './MyOrders.css';

const ORDERS_PER_PAGE = 5;

// ─── Helpers ────────────────────────────────────────────
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

const statusClass = (status) => {
  const map = {
    'pending':            'status-placed',
    'confirmed':        'status-processing',
    'shipped':  'status-out-for-delivery',
    'delivered':         'status-delivered',
    'cancelled':         'status-cancelled',
  };
  return map[status] || 'status-placed';
};

// ─── Skeleton Card ───────────────────────────────────────
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-line" style={{ height: 14, width: '40%' }} />
    <div className="skeleton-line" style={{ height: 10, width: '25%' }} />
    <div style={{ display: 'flex', gap: 12, margin: '14px 0' }}>
      <div className="skeleton-line" style={{ height: 52, width: 52, borderRadius: 8, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skeleton-line" style={{ height: 12, width: '60%' }} />
        <div className="skeleton-line" style={{ height: 10, width: '35%' }} />
      </div>
    </div>
    <div className="skeleton-line" style={{ height: 36, width: '30%', borderRadius: 30, marginLeft: 'auto' }} />
  </div>
);

// ─── Order Card ──────────────────────────────────────────
const OrderCard = ({ order, onReorder }) => {
  const VISIBLE_ITEMS = 3;
  const extraCount = order.items.length - VISIBLE_ITEMS;

  return (
    <div className="order-card">
      {/* Header */}
      <div className="order-card-header">
        <div className="order-meta">
          <span className="order-id">Order #{order._id.toString().slice(-8).toUpperCase()}</span>
          <span className="order-date">{formatDate(order.createdAt)}</span>
        </div>
        <span className={`order-status-badge ${statusClass(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Body — product list */}
      <div className="order-card-body">
        <div className="order-items-list">
          {order.items.slice(0, VISIBLE_ITEMS).map((item, idx) => (
            <div key={idx} className="order-item-row">
              {item.product?.image ? (
                <img
                  src={`https://myntraclone-backend-pcv6.onrender.com/uploads/${item.product.image}`}
                  alt={item.product?.name || "Product"}
                  className="order-item-img"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="order-item-img-placeholder">🛍️</div>
              )}
              <div className="order-item-info">
                <div className="order-item-name">{item.product?.name || "Product Name"}</div>
                <div className="order-item-qty-price">
                  {item.quantity} × Rs {item.product?.price || 0}
                </div>
              </div>
              <div className="order-item-subtotal">
                Rs {((item.product?.price || 0) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        {extraCount > 0 && (
          <span className="more-items-pill">+{extraCount} more item{extraCount > 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Footer */}
      <div className="order-card-footer">
        <div className="order-total">
          Total: <span>Rs {order.totalAmount?.toLocaleString()}</span>
        </div>
        <div className="order-actions">
          <button
            className="btn-reorder"
            onClick={() => onReorder(order.items)}
            title="Add all items from this order to your cart"
          >
            🔄 Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────
const MyOrders = () => {
  const { user, updateCart } = useUser();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);

  // ── Toast helper
  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // ── Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("https://myntraclone-backend-pcv6.onrender.com/orders");
        if (res.ok) {
          const data = await res.json();
          // Filter to only show the current logged-in user's orders
          const userOrders = data.filter(order => order.userId && order.userId._id === user._id);
          setOrders(userOrders);
        } else {
          setError('Failed to load orders.');
        }
      } catch (err) {
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  // ── Client-side search
  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      o._id.toLowerCase().includes(q) ||
      o.items.some((i) => i.product?.name?.toLowerCase().includes(q))
    );
  });

  // Reset page on search
  useEffect(() => setPage(1), [search]);

  const totalPages = Math.ceil(filtered.length / ORDERS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ORDERS_PER_PAGE, page * ORDERS_PER_PAGE);

  // ── Reorder handler
  const handleReorder = async (items) => {
    if (!user) return;
    try {
      for (const item of items) {
        await fetch('https://myntraclone-backend-pcv6.onrender.com/cart/addToCart', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userId: user._id, productId: item.product._id })
        });
      }
      updateCart();
      showToast(`${items.length} item${items.length > 1 ? 's' : ''} added to cart!`);
      setTimeout(() => navigate('/bag'), 800);
    } catch (error) {
      showToast('Failed to add items to cart.', 'error');
    }
  };

  if (!user) {
    return (
      <div className="my-orders-page">
         <div className="my-orders-empty">
            <h2>Please login to view your orders</h2>
            <button onClick={() => navigate("/login")} className="btn-reorder" style={{padding: '10px 20px', marginTop: '20px'}}>Login</button>
         </div>
      </div>
    );
  }

  // ── Render
  return (
    <div className="my-orders-page">
      {/* Toast notification */}
      {toast && (
        <div
          style={{
            position: 'fixed', top: 80, right: 24, zIndex: 9999,
            padding: '12px 22px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem',
            background: toast.type === 'error' ? '#fee2e2' : '#dcfce7',
            color: toast.type === 'error' ? '#b91c1c' : '#15803d',
            boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
            animation: 'slideIn 0.25s ease',
          }}
        >
          {toast.msg}
        </div>
      )}

      <div className="my-orders-container">
        {/* Header */}
        <div className="my-orders-header">
          <h1>My <span>Orders</span></h1>
          {!loading && orders.length > 0 && (
            <div className="my-orders-search-wrap">
              <FiSearch />
              <input
                className="my-orders-search"
                type="text"
                placeholder="Search by order ID or product…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {/* Error */}
        {!loading && error && (
          <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '16px 20px', borderRadius: 10 }}>
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="my-orders-empty">
            <span className="empty-icon">
              <FiShoppingBag size={56} color="#ff3f6c" />
            </span>
            <h2>{search ? 'No matching orders found.' : "You haven't placed any orders yet."}</h2>
            <p>{search ? 'Try a different search term.' : 'Your purchase history will appear here once you place an order.'}</p>
            {!search && <Link to="/" style={{color: '#ff3f6c', textDecoration: 'none', fontWeight: 'bold', marginTop: '10px', display: 'inline-block'}}>Start Shopping</Link>}
          </div>
        )}

        {/* Order Cards */}
        {!loading && !error && paginated.length > 0 && (
          <>
            {paginated.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onReorder={handleReorder}
              />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>
                  ← Prev
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
