import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../layout/Api";

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Api.get("/api/user/removeCookie")
        .then((res) => {
          console.log(res.data);
          setUser(null);
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  async function checkAuth() {
    try {
      Api.get("/api/user/checkAuth")
        .then((res) => {
          setUser(res.data.success);
          // console.log(res.data);
        })
        .catch((error) => {
          console.error("Error checking authentication:", error);
        });
    } catch (error) {
      setUser(null);
      console.error("Error checking authentication:", error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar ">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src="\Images\Logo.png" alt="EpicAura" className="logo" />
          <div className="brand-text">
            <span className="brand-title">EpicAura</span>
            <span className="brand-subtitle">Event Management</span>
          </div>
        </NavLink>

        {/* Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/events">
                Events
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/gallery">
                Gallery
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </li>
            {!user ? (
              <>
                <li className="nav-item">
                  <NavLink className="btn book-btn" to="/login">
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="btn book-btn" to="/signup">
                    SignUp
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn book-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
