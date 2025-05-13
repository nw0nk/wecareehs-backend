import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const LOCAL_API_BASE_URL = "http://localhost:5000";
const RENDER_API_BASE_URL = "https://wecareehs-backend.onrender.com";

const AdminDashboard = () => {
  const [userRegistrationsLocal, setUserRegistrationsLocal] = useState([]);
  const [feedbacksLocal, setFeedbacksLocal] = useState([]);
  const [userRegistrationsRender, setUserRegistrationsRender] = useState([]);
  const [feedbacksRender, setFeedbacksRender] = useState([]);
  const [authLogsRender, setAuthLogsRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLocal, setErrorLocal] = useState('');
  const [errorRender, setErrorRender] = useState('');
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdminAuthenticated } = useContext(AuthContext);

  const feedbackRatingKeys = ['duration', 'content', 'knowledge', 'presentation', 'increase'];

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      if (!isAdminAuthenticated) {
        navigate('/admin/login');
        return;
      }

      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await fetch(`${RENDER_API_BASE_URL}/api/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load data');
        }

        console.log('Fetched user registrations:', data.userRegistrations);
        console.log('Fetched feedbacks:', data.feedbacks);

        setUserRegistrations(data.userRegistrations || []);
        setFeedbacks(data.feedbacks || []);
        setError('');
      } catch (err) {
        console.error('Error fetching data:', err.message);
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

  console.log('Current user registrations state:', userRegistrations);
  console.log('Current feedbacks state:', feedbacks);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  const filterUserKeys = (obj) => Object.keys(obj).filter(key => !['password', 'id', 'role', 'isadmin', 'createdat'].includes(key.toLowerCase()));

  const renderTableData = (data, filterKeys) => {
    if (!data || data.length === 0) {
      return <p className="no-data">No data available.</p>;
    }
  
    return (
      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              {filterKeys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {filterKeys(item).map((key) => (
                  <td key={key}>
                    {item[key] && typeof item[key] === 'object' && item[key].seconds
                      ? new Date(item[key].seconds * 1000).toLocaleString()
                      : String(item[key] ?? '-')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>

      <div className="dashboard-sections">
        <section className="dashboard-user-registrations dashboard-section">
          <h2>User Registrations</h2>
          {renderTableData(userRegistrations, filterUserKeys)}
        </section>

        <section className="dashboard-feedbacks dashboard-section">
          <h2>Feedbacks</h2>
          {renderTableData(feedbacks, (obj) => Object.keys(obj))}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
