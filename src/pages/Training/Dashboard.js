import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle, FaShoppingCart, FaBell } from "react-icons/fa";
import "./Dashboard.css";

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/dashboard`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  if (loading) return <div className="training-loading">Loading dashboard...</div>;
  if (error) return <div className="training-loading">Error: {error}</div>;

  return (
    <div className="training-dashboard">
      <aside className="training-sidebar">
        <div className="training-sidebar-header">
          <h1 className="training-logo">WeCareEHS</h1>
        </div>
        <nav>
          <ul className="training-nav-list">
            <li className="training-nav-item">
              <a href="/dashboard" className="training-nav-link">
                <FaUserCircle className="training-nav-icon" />
                <span>Dashboard</span>
              </a>
            </li>
            <li className="training-nav-item">
              <a href="/cart" className="training-nav-link">
                <FaShoppingCart className="training-nav-icon" />
                <span>Cart</span>
              </a>
            </li>
            <li className="training-nav-item">
              <a href="/feedback" className="training-nav-link">
                <FaBell className="training-nav-icon" />
                <span>Feedback</span>
              </a>
            </li>
          </ul>
        </nav>
        <button className="training-logout-button" onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}>
          Logout
        </button>
      </aside>

      <main className="training-main">
        <header className="training-header">
          <div className="training-welcome">
            <h2 className="training-welcome-title">Welcome, {user?.email || "User"}</h2>
            <p className="training-welcome-subtitle">Here's your dashboard overview</p>
          </div>
        </header>

        <section className="training-stats-container">
          <div className="training-stat-card">
            <div className="training-stat-icon">
              <FaShoppingCart />
            </div>
            <div className="training-stat-content">
              <h3 className="training-stat-title">Total Orders</h3>
              <p className="training-stat-value">{dashboardData?.stats?.totalOrders || 0}</p>
            </div>
          </div>

          <div className="training-stat-card">
            <div className="training-stat-icon">
              <FaBell />
            </div>
            <div className="training-stat-content">
              <h3 className="training-stat-title">Pending Orders</h3>
              <p className="training-stat-value">{dashboardData?.stats?.pendingOrders || 0}</p>
            </div>
          </div>

          <div className="training-stat-card">
            <div className="training-stat-icon">
              <FaUserCircle />
            </div>
            <div className="training-stat-content">
              <h3 className="training-stat-title">Completed Orders</h3>
              <p className="training-stat-value">{dashboardData?.stats?.completedOrders || 0}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
