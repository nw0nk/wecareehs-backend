import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const API_BASE_URL = process.env.REACT_APP_USE_RENDER === "true" ? RENDER_API_BASE_URL : LOCAL_API_BASE_URL;

const AdminDashboard = () => {
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      if (!isAdminAuthenticated) {
        navigate('/admin/login');
        return;
      }

      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await fetch(`${API_BASE_URL}/api/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load data');
        }

        setUserRegistrations(data.userRegistrations || []);
        setFeedbacks(data.feedbacks || []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll every 10 seconds to simulate real-time updates
    intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [navigate, isAdminAuthenticated]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <h3>Error Loading Data</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <section className="dashboard-user-registrations">
        <h2>User Registrations</h2>
        {userRegistrations.length > 0 ? (
          <table className="registrations-table">
            <thead>
              <tr>
                {Object.keys(userRegistrations[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userRegistrations.map(user => (
                <tr key={user.id}>
                  {Object.keys(user).map(key => (
                    <td key={key}>
                      {user[key] && typeof user[key] === 'object' && user[key].seconds
                        ? new Date(user[key].seconds * 1000).toLocaleString()
                        : String(user[key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No user registrations found.</p>
        )}
      </section>

      <section className="dashboard-feedbacks">
        <h2>Feedbacks</h2>
        {feedbacks.length > 0 ? (
          <table className="feedbacks-table">
            <thead>
              <tr>
                {Object.keys(feedbacks[0]).map(key => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.id}>
                  {Object.keys(feedback).map(key => (
                    <td key={key}>
                      {feedback[key] && typeof feedback[key] === 'object' && feedback[key].seconds
                        ? new Date(feedback[key].seconds * 1000).toLocaleString()
                        : String(feedback[key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No feedbacks found.</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
