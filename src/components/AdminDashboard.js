import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SecureStorage from '../utils/secureStorage';
import './AdminDashboard.css';
import { LineChart, DonutChart } from './DashboardCharts';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";
const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

const TABS = { OVERVIEW: 'overview', ORDERS: 'orders', ACTIVITY: 'activity', USERS: 'users', FEEDBACK: 'feedback', SECURITY: 'security', TRIALS: 'trials' };

const AdminDashboard = () => {
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [trialRequests, setTrialRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(TABS.OVERVIEW);
  const navigate = useNavigate();
  const { isAdminAuthenticated, logout } = useContext(AuthContext);

  const [chartData, setChartData] = useState({ growth: [], feedbackType: [] });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      // Double-check: verify role from JWT, not just isAdminAuthenticated state
      const role = SecureStorage.getRole(true);
      if (!isAdminAuthenticated || role !== 'admin') {
        navigate('/admin/login');
        return;
      }

      try {
        const adminToken = SecureStorage.getToken(true);
        if (!adminToken) {
          navigate('/admin/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
          headers: { 'Authorization': `Bearer ${adminToken}` }
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            logout();
            navigate('/admin/login');
            return;
          }
          throw new Error(data.error || 'Failed to load data');
        }

        const users = data.userRegistrations || [];
        const logs = data.securityLogs || [];

        // SAFETY CHECK: ensure no password hashes are displayed
        const safeUsers = users.map(({ password, ...rest }) => rest);

        setUserRegistrations(safeUsers);
        setSecurityLogs(logs);

        // Fetch Feedbacks from Firestore
        let feedsData = [];
        try {
          const feedbackSnapshot = await getDocs(collection(db, "feedbacks"));
          feedsData = feedbackSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          feedsData.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
          setFeedbacks(feedsData);
        } catch (dbErr) {
          console.error("Failed to fetch feedbacks from Firestore:", dbErr);
        }

        // Fetch Orders from Firestore directly (using 'quotes' collection to bypass permission issues)
        try {
          const ordersSnapshot = await getDocs(collection(db, "quotes"));
          const ordersData = ordersSnapshot.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(d => d.orderType === 'purchase' || d.paymentDetails); // Filter only actual purchases
            
          // Sort by creation date descending
          ordersData.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
          setOrders(ordersData);
        } catch (dbErr) {
          console.error("Failed to fetch orders from Firestore:", dbErr);
        }

        // Fetch Trial Requests from backend
        try {
          const trialRes = await fetch(`${API_BASE_URL}/api/trial-request`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
          });
          const trialData = await trialRes.json();
          if (trialData.success) {
            setTrialRequests(trialData.requests || []);
          }
        } catch (dbErr) {
          console.error("Failed to fetch trial requests:", dbErr);
        }

        // Chart processing (Users Growth)
        const groupedUsers = safeUsers.reduce((acc, user) => {
          let dateStr = 'Unknown';
          if (user.createdAt?.seconds) {
            dateStr = new Date(user.createdAt.seconds * 1000).toLocaleDateString();
          } else if (user.registrationDate) {
            dateStr = new Date(user.registrationDate).toLocaleDateString();
          }
          acc[dateStr] = (acc[dateStr] || 0) + 1;
          return acc;
        }, {});

        const growthSeries = Object.keys(groupedUsers).map(key => ({
          label: key, value: groupedUsers[key]
        })).slice(-10);

        const feedbackStats = [
          { label: 'Positive', value: feedsData.filter(f => (f.overall || 5) >= 4).length, color: '#2ecc71' },
          { label: 'Neutral', value: feedsData.filter(f => (f.overall || 5) === 3).length, color: '#f1c40f' },
          { label: 'Negative', value: feedsData.filter(f => (f.overall || 5) < 3).length, color: '#e74c3c' },
        ].filter(d => d.value > 0);

        // Anonymous Traffic Analytics Processing
        const uniqueSessions = {};
        const regionsCount = {};
        let totalGuestHits = 0;
        let totalAuthHits = 0;

        logs.forEach(batch => {
          const sid = batch.sessionId;
          if (!uniqueSessions[sid]) {
             const isGuest = batch.email === 'Unknown';
             uniqueSessions[sid] = {
               date: batch.batchTimestamp ? new Date(batch.batchTimestamp.toMillis()).toLocaleDateString() : new Date().toLocaleDateString(),
               country: batch.geo?.country || 'Unknown',
               isGuest
             };
             if (isGuest) totalGuestHits++;
             else totalAuthHits++;
          }
        });

        const volumeByDate = {};
        Object.values(uniqueSessions).forEach(session => {
          volumeByDate[session.date] = (volumeByDate[session.date] || 0) + 1;
          regionsCount[session.country] = (regionsCount[session.country] || 0) + 1;
        });

        const bandwidthSeries = Object.keys(volumeByDate).map(date => ({
          label: date, value: volumeByDate[date]
        })).slice(-14);

        const PRESET_COLORS = ['#3b82f6', '#e67e22', '#2ecc71', '#9b59b6', '#e74c3c', '#1abc9c', '#f1c40f'];
        const regionSeries = Object.keys(regionsCount)
          .sort((a,b) => regionsCount[b] - regionsCount[a])
          .map((country, idx) => ({
             label: country, 
             value: regionsCount[country],
             color: PRESET_COLORS[idx % PRESET_COLORS.length]
          })).slice(0, 7);

        setChartData({
          growth: growthSeries.length > 0 ? growthSeries : [{ label: 'Start', value: 0 }, { label: 'Now', value: safeUsers.length }],
          feedbackType: feedbackStats.length > 0 ? feedbackStats : [{ label: 'General', value: feedsData.length, color: '#3b82f6' }],
          trafficBandwidth: bandwidthSeries.length > 0 ? bandwidthSeries : [{ label: 'Today', value: 0 }],
          trafficRegion: regionSeries.length > 0 ? regionSeries : [{ label: 'Unknown', value: 1, color: '#3b82f6' }],
          totalUniqueSessions: Object.keys(uniqueSessions).length,
          guestHits: totalGuestHits,
          authHits: totalAuthHits
        });

        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 30000); // Poll every 30s (was 10s — less aggressive)
    return () => clearInterval(intervalId);
  }, [navigate, isAdminAuthenticated, logout]);

  // ── Account unlock handler ──────────────────────────────────────────────────
  const handleUnlockAccount = async (email) => {
    try {
      const adminToken = SecureStorage.getToken(true);
      const res = await fetch(`${API_BASE_URL}/api/admin/unlock/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${adminToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ ${data.message}`);
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert('Could not unlock account. Please try again.');
    }
  };

  const handleVerifyOrder = async (orderId) => {
    if (window.confirm("Mark this order's payment as verified and start processing?")) {
      try {
        await updateDoc(doc(db, "quotes", orderId), { status: 'payment_verified' });
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'payment_verified' } : o));
      } catch (err) {
        alert("Failed to update order: " + err.message);
      }
    }
  };

  const handleTrialRequestStatus = async (requestId, status) => {
    let adminNotes = '';
    if (status === 'rejected') {
      adminNotes = window.prompt('Enter rejection reason (optional):') || '';
    }
    try {
      const adminToken = SecureStorage.getToken(true);
      const res = await fetch(`${API_BASE_URL}/api/trial-request/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, adminNotes })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ Trial request ${status}`);
        setTrialRequests(prev => prev.map(r => r.id === requestId ? { ...r, status, adminNotes } : r));
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch {
      alert('Failed to update trial request');
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Initializing Admin Nexus...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>System Alert</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reconnect</button>
      </div>
    );
  }

  // Group security logs by event type for quick stats
  const failedLogins = securityLogs.filter(l => l.eventType === 'failed_login').length;
  const lockedAccounts = securityLogs.filter(l => l.eventType === 'account_locked').length;

  return (
    <div className="admin-dashboard-container">
      <header className="admin-header">
        <div className="header-title">
          <h1>Admin Nexus</h1>
          <span className="live-indicator">● System Live</span>
        </div>
        <div className="admin-profile">
          <span>Administrator</span>
          <div className="admin-avatar">A</div>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </header>

      {/* ── Tab Navigation ── */}
      <nav className="dashboard-tabs">
        {Object.entries(TABS).map(([key, val]) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === val ? 'active' : ''}`}
            onClick={() => setActiveTab(val)}
          >
            {key === 'OVERVIEW' && '📊 '}
            {key === 'ORDERS' && '📦 '}
            {key === 'ACTIVITY' && '👣 '}
            {key === 'USERS' && '👥 '}
            {key === 'FEEDBACK' && '💬 '}
            {key === 'SECURITY' && '🔒 '}
            {key === 'TRIALS' && '🧪 '}
            {val.charAt(0).toUpperCase() + val.slice(1)}
            {key === 'SECURITY' && failedLogins > 0 && (
              <span className="security-badge-count">{failedLogins}</span>
            )}
          </button>
        ))}
      </nav>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === TABS.OVERVIEW && (
        <>
          <section className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon users">👥</div>
              <div className="kpi-content">
                <h3>Total Users</h3>
                <p className="kpi-value">{userRegistrations.length}</p>
                <span className="kpi-trend positive">Active accounts</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon feedback">💬</div>
              <div className="kpi-content">
                <h3>Total Feedback</h3>
                <p className="kpi-value">{feedbacks.length}</p>
                <span className="kpi-trend neutral">Steady</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon system">🔒</div>
              <div className="kpi-content">
                <h3>Security Events</h3>
                <p className="kpi-value">{failedLogins}</p>
                <span className={`kpi-trend ${failedLogins > 10 ? 'negative' : 'positive'}`}>
                  {lockedAccounts} account{lockedAccounts !== 1 ? 's' : ''} locked
                </span>
              </div>
            </div>
          </section>

          <section className="analytics-grid">
            <div className="analytics-card wide">
              <LineChart title="User Registration Growth" data={chartData.growth} color="#FF6B00" />
            </div>
            <div className="analytics-card">
              <DonutChart title="Feedback Sentiment" data={chartData.feedbackType} />
            </div>
          </section>

          {/* ── PREMIUM TRAFFIC ANALYTICS ── */}
          <div className="section-header" style={{marginTop: '50px', borderBottom: '2px solid rgba(255,255,255,0.05)', paddingBottom: '10px'}}>
            <h2><span style={{color: '#3b82f6'}}>Network</span> Overview</h2>
            <span style={{color: '#aaa', fontSize: '0.9rem'}}>Real-time bandwidth & visitor telemetry</span>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px'}}>
            {/* Total Hits Card */}
            <div style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'}}>
              <div style={{color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px'}}>Total Network Hits</div>
              <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#fff'}}>{chartData.totalUniqueSessions || 0}</div>
              <div style={{color: '#2ecc71', fontSize: '0.8rem', marginTop: '5px'}}>● Active Sessions</div>
            </div>

            {/* Anonymous Hits Card */}
            <div style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'}}>
              <div style={{color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px'}}>Anonymous Hits (No Login)</div>
              <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#e67e22'}}>{chartData.guestHits || 0}</div>
              <div style={{color: '#aaa', fontSize: '0.8rem', marginTop: '5px'}}>Public Traffic</div>
            </div>

            {/* Auth Hits Card */}
            <div style={{background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '25px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'}}>
              <div style={{color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px'}}>Authenticated Hits</div>
              <div style={{fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6'}}>{chartData.authHits || 0}</div>
              <div style={{color: '#aaa', fontSize: '0.8rem', marginTop: '5px'}}>Logged-in Users</div>
            </div>
          </div>

          <section className="analytics-grid" style={{marginBottom: '40px'}}>
            <div className="analytics-card wide" style={{background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)'}}>
              <LineChart title="Bandwidth Usage (Daily Hits)" data={chartData.trafficBandwidth || []} color="#3b82f6" />
            </div>
            <div className="analytics-card" style={{background: '#0f172a', border: '1px solid rgba(255,255,255,0.05)'}}>
              <DonutChart title="Global Routing (Region)" data={chartData.trafficRegion || []} />
            </div>
          </section>
        </>
      )}

      {/* ── ORDERS TAB ── */}
      {activeTab === TABS.ORDERS && (
        <div className="data-tables-grid">
          <section className="data-section" style={{ gridColumn: '1 / -1' }}>
            <div className="section-header">
              <h2>Product Orders</h2>
              <span className="record-count">{orders.length} total</span>
            </div>
            <div className="premium-table-wrapper">
              {orders.length > 0 ? (
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer & Shipping</th>
                      <th>Order Items</th>
                      <th>Payment & Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="mono-font" style={{fontSize: '0.9rem'}}>#{order.id.slice(-6).toUpperCase()}</td>
                        <td>
                          <strong style={{color: '#fff'}}>{order.personalInfo?.fullName || 'N/A'}</strong><br/>
                          <span style={{fontSize: '0.8rem', color: '#aaa'}}>{order.personalInfo?.email}</span><br/>
                          <span style={{fontSize: '0.8rem', color: '#aaa'}}>📞 {order.personalInfo?.phone || order.personalInfo?.phoneNumber || 'N/A'}</span>
                          
                          {/* Shipping Address */}
                          <div style={{fontSize: '0.8rem', color: '#aaa', marginTop: '6px', maxWidth: '220px', whiteSpace: 'normal', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '4px'}}>
                            <strong>Shipping:</strong><br/>
                            {(order.shippingAddress?.address || order.personalInfo?.address) ? (
                              <>
                                📍 {order.shippingAddress?.address || order.personalInfo?.address}, 
                                {order.shippingAddress?.apartment && ` ${order.shippingAddress.apartment},`} 
                                {order.personalInfo?.apartment && ` ${order.personalInfo.apartment},`} <br/>
                                {order.shippingAddress?.city || order.personalInfo?.city}, 
                                {order.shippingAddress?.state || order.personalInfo?.state} - 
                                {order.shippingAddress?.postalCode || order.personalInfo?.postalCode} <br/>
                                {order.shippingAddress?.country || order.personalInfo?.country}
                              </>
                            ) : 'N/A'}
                          </div>

                          {/* Billing Address (if different/provided) */}
                          {order.billingAddress && (
                            <div style={{fontSize: '0.8rem', color: '#aaa', marginTop: '4px', maxWidth: '220px', whiteSpace: 'normal', background: 'rgba(255,107,0,0.05)', padding: '6px', borderRadius: '4px', border: '1px solid rgba(255,107,0,0.1)'}}>
                              <strong>Billing:</strong><br/>
                              📍 {order.billingAddress?.address}, {order.billingAddress?.city}, {order.billingAddress?.state} - {order.billingAddress?.postalCode}
                            </div>
                          )}
                        </td>
                        <td>
                          <div style={{fontSize: '0.85rem', maxWidth: '220px', whiteSpace: 'normal'}}>
                            {order.items?.map((item, idx) => (
                              <div key={idx} style={{marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '4px'}}>
                                <span style={{color: '#fff'}}>{item.quantity}x {item.name}</span><br/>
                                <span style={{color: '#aaa', fontSize: '0.75rem'}}>₹{item.price} each (Total: ₹{item.price * item.quantity})</span>
                              </div>
                            ))}
                            {order.specialInstructions && (
                              <div style={{marginTop: '6px', fontSize: '0.75rem', color: '#f1c40f', fontStyle: 'italic'}}>
                                Note: {order.specialInstructions}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div style={{fontSize: '1.1rem', fontWeight: 'bold', color: '#FF6B00', marginBottom: '8px'}}>
                            ₹{order.paymentDetails?.total || 0}
                          </div>
                          {order.paymentDetails?.method === 'upi' ? (
                            <div>
                              <span className="event-badge event-password_reset_attempt">UPI</span>
                              <div style={{fontSize: '0.8rem', color: '#aaa', marginTop: '4px', maxWidth: '120px', wordBreak: 'break-all'}}>
                                TXN: {order.paymentDetails?.transactionId || 'N/A'}
                              </div>
                            </div>
                          ) : 'Card'}
                        </td>
                        <td>
                          <span className={`event-badge ${order.status === 'pending_verification' ? 'event-account_locked' : 'event-positive'}`}>
                            {order.status === 'pending_verification' ? 'Pending Verification' : order.status}
                          </span>
                        </td>
                        <td>
                          {order.status === 'pending_verification' && (
                            <button
                              className="unlock-btn"
                              onClick={() => handleVerifyOrder(order.id)}
                            >
                              Verify Payment
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="empty-state">No orders found.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── ACTIVITY LOGS TAB ── */}
      {activeTab === TABS.ACTIVITY && (
        <div className="data-tables-grid">
          <section className="data-section" style={{ gridColumn: '1 / -1' }}>
            <div className="section-header">
              <h2>User Activity Logs</h2>
              <span className="record-count">{activityLogs.length} batches</span>
            </div>
            <div className="premium-table-wrapper" style={{background: '#1a1a2e', padding: '20px', borderRadius: '12px'}}>
              {activityLogs.length > 0 ? activityLogs.map(batch => (
                <div key={batch.id} style={{marginBottom: '20px', padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '4px solid #3b82f6'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '10px'}}>
                    <strong style={{color: '#3b82f6', fontSize: '1.1rem'}}>
                      User: {batch.email !== 'Unknown' ? batch.email : 'Guest Visitor'} 
                      <span style={{color: '#666', fontSize: '0.8rem', marginLeft: '10px'}}>(ID: {batch.userId !== 'guest' ? batch.userId : batch.sessionId})</span>
                    </strong>
                    <span style={{color: '#aaa', fontSize: '0.85rem'}}>
                      {batch.batchTimestamp ? new Date(batch.batchTimestamp.toMillis()).toLocaleString() : 'Just now'}
                    </span>
                  </div>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                    {batch.events?.map((ev, i) => (
                      <li key={i} style={{padding: '8px 0', fontSize: '0.9rem', color: '#ccc', display: 'flex', gap: '15px', alignItems: 'center'}}>
                        <span style={{
                          background: ev.type === 'PAGE_VIEW' ? 'rgba(46,204,113,0.1)' : 'rgba(231,76,60,0.1)', 
                          color: ev.type === 'PAGE_VIEW' ? '#2ecc71' : '#e74c3c', 
                          border: `1px solid ${ev.type === 'PAGE_VIEW' ? '#2ecc71' : '#e74c3c'}`,
                          padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', width: '85px', textAlign: 'center'
                        }}>
                          {ev.type}
                        </span>
                        <span style={{color: '#fff'}}>
                          {ev.type === 'PAGE_VIEW' ? (
                            <>Navigated to <span style={{color: '#f1c40f'}}>{ev.path}</span></>
                          ) : (
                            <>Clicked <strong style={{color: '#3498db'}}>{ev.tag}</strong> {ev.label && ev.label !== 'Unknown' ? `"${ev.label}"` : ''} on <span style={{color: '#aaa'}}>{ev.path}</span></>
                          )}
                        </span>
                        <span style={{color: '#555', fontSize: '0.75rem', marginLeft: 'auto'}}>
                          {new Date(ev.timestamp).toLocaleTimeString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )) : (
                <p style={{color: '#aaa'}}>No activity recorded yet. Browse the site to generate logs.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── USERS TAB ── */}
      {activeTab === TABS.USERS && (
        <div className="data-tables-grid">
          <section className="data-section" style={{ gridColumn: '1 / -1' }}>
            <div className="section-header">
              <h2>Registered Users</h2>
              <span className="record-count">{userRegistrations.length} total</span>
            </div>
            <div className="premium-table-wrapper">
              {userRegistrations.length > 0 ? (
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userRegistrations.map(user => (
                      <tr key={user.id}>
                        <td className="mono-font">#{String(user.id).slice(-6)}</td>
                        <td>{user.name || 'N/A'}</td>
                        <td>{user.email || 'N/A'}</td>
                        <td>{user.phone || '—'}</td>
                        <td>{user.company || '—'}</td>
                        <td>
                          {user.createdAt?.seconds
                            ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                            : 'Recent'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="empty-state">No user registrations found.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── FEEDBACK TAB ── */}
      {activeTab === TABS.FEEDBACK && (
        <div className="data-tables-grid">
          <section className="data-section" style={{ gridColumn: '1 / -1' }}>
            <div className="section-header">
              <h2>Latest Feedback</h2>
              <span className="record-count">{feedbacks.length} entries</span>
            </div>
            <div className="feedback-cards-scroller">
              {feedbacks.length > 0 ? feedbacks.map(feedback => (
                <div key={feedback.id} className="feedback-mini-card">
                  <div className="feedback-mini-header">
                    <span className="feedback-user">{feedback.name || 'Anonymous'}</span>
                    <span className="feedback-date">
                      {feedback.createdAt?.seconds
                        ? new Date(feedback.createdAt.seconds * 1000).toLocaleString('en-IN', {
                            day: '2-digit', month: 'short', year: 'numeric',
                            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
                          })
                        : 'Just now'}
                    </span>
                  </div>
                  <p className="feedback-msg">"{feedback.comment || 'No comment'}"</p>
                  <div className={`feedback-rating rating-${feedback.overall || 3}`}>
                    {'★'.repeat(feedback.overall || 0)}
                  </div>
                </div>
              )) : (
                <p className="empty-state">No feedback entries found.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── SECURITY TAB ── */}
      {activeTab === TABS.SECURITY && (
        <div className="data-tables-grid">
          <section className="data-section" style={{ gridColumn: '1 / -1' }}>
            <div className="section-header">
              <h2>🔒 Security Logs</h2>
              <span className="record-count">{securityLogs.length} recent events</span>
            </div>

            {/* Security Summary Cards */}
            <div className="security-summary">
              <div className="sec-stat-card">
                <span className="sec-stat-icon">⚠️</span>
                <div>
                  <p className="sec-stat-value">{failedLogins}</p>
                  <p className="sec-stat-label">Failed Logins</p>
                </div>
              </div>
              <div className="sec-stat-card">
                <span className="sec-stat-icon">🔐</span>
                <div>
                  <p className="sec-stat-value">{lockedAccounts}</p>
                  <p className="sec-stat-label">Accounts Locked</p>
                </div>
              </div>
              <div className="sec-stat-card">
                <span className="sec-stat-icon">🔑</span>
                <div>
                  <p className="sec-stat-value">
                    {securityLogs.filter(l => l.eventType === 'password_reset_attempt').length}
                  </p>
                  <p className="sec-stat-label">Reset Attempts</p>
                </div>
              </div>
            </div>

            <div className="premium-table-wrapper">
              {securityLogs.length > 0 ? (
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Event</th>
                      <th>Email</th>
                      <th>IP Address</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {securityLogs.map(log => (
                      <tr key={log.id} className={log.eventType === 'account_locked' ? 'row-danger' : ''}>
                        <td>
                          <span className={`event-badge event-${log.eventType}`}>
                            {log.eventType === 'failed_login' && '⚠️ Failed Login'}
                            {log.eventType === 'account_locked' && '🔐 Account Locked'}
                            {log.eventType === 'password_reset_attempt' && '🔑 Reset Attempt'}
                            {!['failed_login', 'account_locked', 'password_reset_attempt'].includes(log.eventType) && log.eventType}
                          </span>
                        </td>
                        <td>{log.email || '—'}</td>
                        <td className="mono-font">{log.ip || '—'}</td>
                        <td>
                          {log.timestamp?.seconds
                            ? new Date(log.timestamp.seconds * 1000).toLocaleString()
                            : 'Recent'}
                        </td>
                        <td>
                          {log.eventType === 'account_locked' && (
                            <button
                              className="unlock-btn"
                              onClick={() => handleUnlockAccount(log.email)}
                            >
                              Unlock
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="empty-state">No security events recorded yet. This is a good sign! ✅</p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* ── TRIALS TAB ── */}
      {activeTab === TABS.TRIALS && (
        <div className="data-tables-grid">
          <section className="data-section" style={{ gridColumn: '1 / -1' }}>
            <div className="section-header">
              <h2>Trial Requests</h2>
              <span className="record-count">{trialRequests.length} total</span>
            </div>
            <div className="premium-table-wrapper">
              {trialRequests.length > 0 ? (
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Submitted</th>
                      <th>Source</th>
                      <th>Admin Notes</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialRequests.map(req => (
                      <tr key={req.id}>
                        <td className="mono-font" style={{fontSize: '0.85rem'}}>#{req.id.slice(-8).toUpperCase()}</td>
                        <td>{req.email}</td>
                        <td>{req.phone}</td>
                        <td>
                          <span className={`event-badge ${req.status === 'pending' ? 'event-pending' : req.status === 'approved' ? 'event-positive' : 'event-negative'}`}>
                            {req.status === 'pending' && '⏳ Pending'}
                            {req.status === 'approved' && '✅ Approved'}
                            {req.status === 'rejected' && '❌ Rejected'}
                          </span>
                        </td>
                        <td>{req.createdAt?.seconds ? new Date(req.createdAt.seconds * 1000).toLocaleString() : req.createdAt ? new Date(req.createdAt).toLocaleString() : 'Recent'}</td>
                        <td>{req.source || 'software-page'}</td>
                        <td style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} title={req.adminNotes || ''}>
                          {req.adminNotes || '—'}
                        </td>
                        <td>
                          {req.status === 'pending' && (
                            <div style={{display: 'flex', gap: '8px'}}>
                              <button
                                className="unlock-btn"
                                style={{background: '#2ecc71'}}
                                onClick={() => handleTrialRequestStatus(req.id, 'approved')}
                              >
                                Approve
                              </button>
                              <button
                                className="unlock-btn"
                                style={{background: '#e74c3c'}}
                                onClick={() => handleTrialRequestStatus(req.id, 'rejected')}
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {req.status !== 'pending' && <span style={{color: '#aaa', fontSize: '0.8rem'}}>Processed</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="empty-state">No trial requests found.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
