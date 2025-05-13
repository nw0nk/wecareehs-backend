import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "./Navbar.css";
import logoImage from "./wecare.png";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isAuthenticated, isAdminAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
    document.body.classList.toggle("sidebar-open", !isMobileSidebarOpen);
  };

  const handleMobileItemClick = (path) => {
    navigate(path);
    setIsMobileSidebarOpen(false);
    document.body.classList.remove("sidebar-open");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    {
      name: "Audit",
      path: "/audit",
      subItems: [
        { name: "ISO 9001", path: "/audit/ISO9001" },
        { name: "ISO 14001", path: "/audit/ISO14001" },
        { name: "ISO 45001", path: "/audit/ISO45001" },
        { name: "OH&S Audit", path: "/audit/oh&s" },
        { name: "Safety Audit", path: "/audit/safetyaudit" },
        { name: "Safety Assessment", path: "/audit/assessment" },
      ],
    },
    {
      name: "Training",
      path: "/training",
      subItems: [
        {
          name: "General Safety",
          path: "/training/general-safety",
          subItems: [
            { name: "Environmental Safety", path: "/training/general/environmental" },
            { name: "Safety Awareness", path: "/training/general/safety-awareness" },
            { name: "Behaviour Based Safety", path: "/training/general/behaviour" },
            { name: "5S Concepts", path: "/training/general/sconcepts" },
            { name: "Use of PPE", path: "/training/general/PPE" },
            { name: "LOTO (Lock Out Tag Out)", path: "/training/general/LOTO" },
          ],
        },
        {
          name: "Health Safety",
          subItems: [
            { name: "First Aid with Practical", path: "/training/health/firstaid" },
            { name: "Heat and Cold Stress", path: "/training/health/heatcoldstress" },
            { name: "Workplace Ergonomics", path: "/training/health/ergonomics" },
            { name: "Mental Wellbeing", path: "/training/health/mental" },
          ],
        },
        {
          name: "Warehouse Safety",
          subItems: [
            { name: "Warehouse Safety", path: "/training/warehouse" },
            { name: "MHE Driving Safety", path: "/training/MHE" },
            { name: "Crane Safety", path: "/training/crane" },
          ],
        },
        {
          name: "Construction Safety",
          subItems: [
            { name: "Construction Safety", path: "/training/constructionsafety" },
            { name: "Working at Height Safety", path: "/training/workingatheight" },
          ],
        },
        { name: "Electrical Safety", path: "/training/electrical" },
        { name: "Chemical Safety", path: "/training/chemical" },
        { name: "Road Safety", path: "/training/road" },
        {
          name: "ISO Training",
          subItems: [
            { name: "ISO 9001 Auditor", path: "/training/isotraining/ISO9001" },
            { name: "ISO 14001 Auditor", path: "/training/isotraining/ISO14001" },
            { name: "ISO 45001 Auditor", path: "/training/isotraining/ISO45001" },
            { name: "ISO 19001 Standard", path: "/training/isotraining/ISO19001" },
            { name: "ISO Documentation", path: "/training/isotraining/isodocumentation" },
            { name: "HIRA and Control Methods", path: "/training/isotraining/HIRA" },
          ],
        },
        {
          name: "Emergency Preparedness",
          path: "/training/emergencypreparedness",
          subItems: [
            { name: "Fire Safety with Practical", path: "/training/firesafety" },
            { name: "Emergency Preparedness", path: "/training/emergency" },
          ],
        },
      ],
    },
    {
      name: "Compliance",
      path: "/compliance",
      subItems: [
        { name: "Legal Compliance", path: "/compliance/legalcompliance" },
        { name: "ISO 14001", path: "/compliance/ISO14001" },
        { name: "ISO 45001", path: "/compliance/ISO45001" },
      ],
    },
    {
      name: "Consultancy",
      path: "/consultancy",
      subItems: [
        { name: "Safety Legislation", path: "/consultancy/safetylegislation" },
        { name: "ISO 9001", path: "/consultancy/ISO9001" },
        { name: "ISO 14001", path: "/consultancy/ISO14001" },
        { name: "ISO 45001", path: "/consultancy/ISO45001" },
        { name: "Risk Reduction", path: "/consultancy/riskreduction" },
        { name: "Accident Investigation", path: "/consultancy/accidentinvestigation" },
        { name: "Root Cause Analysis", path: "/consultancy/rootcauseanalysis" },
      ],
    },
  ];

  const MobileMenuList = ({ items, level = 0 }) => {
    const submenuPadding = level * 15;
    const [localOpenSubmenus, setLocalOpenSubmenus] = useState({});

    const toggleLocalSubmenu = (index) => {
      setLocalOpenSubmenus((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    };

    return (
      <>
        {items.map((item, index) => (
          <div key={index}>
            <div className="mobile-menu-item" style={{ paddingLeft: `${20 + submenuPadding}px` }}>
              {item.subItems ? (
                <>
                  <div className="menu-title" onClick={() => toggleLocalSubmenu(index)}>
                    {item.name}
                    <span className="submenu-toggle">
                      {localOpenSubmenus[index] ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </div>
                  <div className={`mobile-submenu ${localOpenSubmenus[index] ? "open" : ""}`}>
                    <MobileMenuList items={item.subItems} level={level + 1} />
                  </div>
                </>
              ) : (
                <div className="menu-title" onClick={() => handleMobileItemClick(item.path)}>
                  {item.name}
                </div>
              )}
            </div>
          </div>
        ))}
      </>
    );
  };

  const DesktopMenuList = ({ items, level = 0 }) => {
    return (
      <ul className={`menu-list level-${level} desktop-menu`}>
        {items.map((item, index) => (
          <li key={index} className="menu-item">
            {item.subItems ? (
              <>
                <span className="menu-title">{item.name}</span>
                <div className="submenu-container">
                  <DesktopMenuList items={item.subItems} level={level + 1} />
                </div>
              </>
            ) : (
              <Link to={item.path} className="menu-title">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left-section">
          <h1 className="logo">
            <img src={logoImage} alt="Logo" />
          </h1>
          {isMobile && (
            <div className="mobile-menu-icon" onClick={toggleMobileSidebar}>
              {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="desktop-menu-container">
            <DesktopMenuList items={menuItems} />
          </div>
        )}

        <div className="right-section">
          {isAuthenticated || isAdminAuthenticated ? (
            <>
              <div className="user-profile-container">
                <div className="user-controls">
                  <button className="user-profile-button" aria-label="User profile">
                    {user && user.avatar ? (
                      <img src={user.avatar} className="user-avatar" alt="User avatar" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="user-avatar"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="7" r="5" />
                        <path d="M12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" />
                      </svg>
                    )}
                    <span className="username">{user ? user.username || "" : ""}</span>
                  </button>
                  <button
                    className="logout-button"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </div>
              </div>
              <div className="dashboard-button">
                <Link to="/dashboard" className="dashboard-link" aria-label="Dashboard">
                  Dashboard
                </Link>
              </div>
            </>
          ) : (
            <div className="login-button">
              <Link to="/login" className="login-link" aria-label="Login">
                Login
              </Link>
            </div>
          )}

          <button
            className="cart-button"
            onClick={() => navigate("/cart")}
            aria-label="Cart"
          >
            <FaShoppingCart size={20} color="#ffffff" />
          </button>
        </div>

        {isMobile && (
          <div className={`mobile-sidebar ${isMobileSidebarOpen ? "open" : ""}`}>
            <div className="sidebar-header">
              <h1 className="logo">
                <img src={logoImage} alt="Logo" />
              </h1>
              <button className="sidebar-close-btn" onClick={toggleMobileSidebar} aria-label="Close menu">
                <FaTimes />
              </button>
            </div>
            <div className="mobile-menu-wrapper">
              <div className="mobile-menu-items">
                <MobileMenuList items={menuItems} />
              </div>
              
              {isAuthenticated && (
                <div className="mobile-user-info">
                  {user && user.avatar ? (
                    <img src={user.avatar} className="user-avatar" alt="User avatar" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="user-avatar"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="7" r="5" />
                      <path d="M12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" />
                    </svg>
                  )}
                  <span className="username">{user ? user.username || "" : ""}</span>
                </div>
              )}

              <div className="mobile-menu-footer">
                {isAuthenticated ? (
                  <>
                    <button
                      className="mobile-logout-button"
                      onClick={handleLogout}
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                    <Link to="/dashboard" className="mobile-dashboard-button" aria-label="Dashboard">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <Link to="/login" className="mobile-login-button" aria-label="Login">
                    Login
                  </Link>
                )}
                <button
                  className="mobile-cart-button"
                  onClick={() => navigate("/cart")}
                  aria-label="Cart"
                >
                  <FaShoppingCart size={20} color="#ffffff" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;