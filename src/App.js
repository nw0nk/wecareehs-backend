import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Training/Dashboard.js";
import ProtectedRoute from "./pages/Training/ProtectedRoute.js";
import Home from "./pages/Training/Home.js";
import About from "./pages/Training/About.js";
import Contact from "./pages/Training/Contact.js";
import Mission from "./pages/Training/Mission.js";
import Products from "./pages/Training/Products.js";
import Accessories from "./pages/Training/Accessories.js";
import Services from "./pages/Training/Services.js";
import AdminLogin from "./components/AdminLogin.js";
import AdminDashboard from "./components/AdminDashboard.js";
import Environmental from "./pages/Training/General Safety/Environmental.tsx";
import SafetyAwareness from "./pages/Training/General Safety/SafetyAwareness.tsx";
import Behaviour from "./pages/Training/General Safety/Behaviour.tsx";
import SConcepts from "./pages/Training/General Safety/SConcept.tsx";
import PPE from "./pages/Training/General Safety/PPE.tsx";
import LOTO from "./pages/Training/General Safety/LOTO.tsx";
import FirstAid from "./pages/Training/Health Safety/FirstAid.tsx";
import HeatColdStress from "./pages/Training/Health Safety/HeatColdStress.tsx";
import Mental from "./pages/Training/Health Safety/Mental.tsx";
import Crane from "./pages/Training/Warehouse Safety/Crane.tsx";
import Ergonomics from "./pages/Training/Health Safety/Ergonomics.tsx";
import Warehouse from "./pages/Training/Warehouse Safety/Warehouse.tsx";
import MHE from "./pages/Training/Warehouse Safety/MHE.tsx";
import Construction from "./pages/Training/Construction Safety/Construction.tsx";
import WorkingAtHeight from "./pages/Training/Construction Safety/WorkingAtHeight.tsx";
import Electrical from "./pages/Training/Electrical/Electrical.tsx";
import Chemical from "./pages/Training/Chemical Safety/Chemical.tsx";
import Road from "./pages/Training/Road Safety/Road.tsx";
import ISO14001 from "./pages/Training/ISO Training/ISO14001.tsx";
import ISO45001 from "./pages/Training/ISO Training/ISO45001.tsx";
import ISO9001 from "./pages/Training/ISO Training/ISO9001.tsx";
import ISO19011 from "./pages/Training/ISO Training/ISO19011.tsx";
import HIRA from "./pages/Training/ISO Training/HIRA.tsx";
import ISODocumentation from "./pages/Training/ISO Training/ISODocumentation.tsx";
import Emergency from "./pages/Training/Emegency Safety/Emergency.tsx";
import FireSafety from "./pages/Training/Emegency Safety/FireSafety.tsx";
import FeedbackForm from "./pages/FeedbackForm.js";
import LoginPage from "./pages/Training/LoginPage.js";

import CartPage from "./pages/Training/CartPage.js";

import Registration from "./pages/Training/Registration.js";
import CheckoutPage from "./pages/Training/CheckoutPage.js";
import PrivacyPolicy from "./pages/Training/PrivacyPolicy.js";
import TermsOfService from "./pages/Training/TermsOfService.js";
import { CartProvider } from "./pages/Training/CartContext.js";
import { AuthProvider } from "./context/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  // ✅ Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <div className="header-wrapper">
              <Header />
            </div>

            {/* Removed Firebase API Key display */}

            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/products" element={<Products />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/services" element={<Services />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/training/general/environmental" element={<Environmental />} />
                <Route path="/training/general/safety-awareness" element={<SafetyAwareness />} />
                <Route path="/training/general/behaviour" element={<Behaviour />} />
                <Route path="/training/general/sconcepts" element={<SConcepts />} />
                <Route path="/training/general/PPE" element={<PPE />} />
                <Route path="/training/general/LOTO" element={<LOTO />} />
                <Route path="/training/health/firstaid" element={<FirstAid />} />
                <Route path="/training/health/heatcoldstress" element={<HeatColdStress />} />
                <Route path="/training/health/mental" element={<Mental />} />
                <Route path="/training/health/ergonomics" element={<Ergonomics />} />
                <Route path="/training/warehouse" element={<Warehouse />} />
                <Route path="/training/mhe" element={<MHE />} />
                <Route path="/training/constructionsafety" element={<Construction />} />
                <Route path="/training/workingatheight" element={<WorkingAtHeight />} />
                <Route path="/training/electrical" element={<Electrical />} />
                <Route path="/training/chemical" element={<Chemical />} />
                <Route path="/training/road" element={<Road />} />
                <Route path="/training/isotraining/iso14001" element={<ISO14001 />} />
                <Route path="/training/isotraining/iso45001" element={<ISO45001 />} />
                <Route path="/training/isotraining/iso9001" element={<ISO9001 />} />
                <Route path="/training/isotraining/iso19011" element={<ISO19011 />} />
                <Route path="/training/isotraining/hira" element={<HIRA />} />
                <Route path="/training/crane" element={<Crane />} />
                <Route path="/training/isotraining/isodocumentation" element={<ISODocumentation />} />
                <Route path="/training/emergency" element={<Emergency />} />
                <Route path="/training/firesafety" element={<FireSafety />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/admin/login" element={<AdminLogin/>}/>
                <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
                <Route path="/feedback" element={<FeedbackForm />} />
                <Route element={<ProtectedRoute user={user} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                </Route>
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
