import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ProfileModal } from "./ProfileModal";
export const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
   const [showProfile, setShowProfile] = useState(false);
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login")
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/About" ? "active" : ""
                }`}
                to="/About"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("authToken") ? (
            <form className="d-flex" role="search">
              <Link
                className="btn btn-outline-secondary "
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-secondary mx-2"
                to="/signup"
                role="button"
              >
                Signup
              </Link>
            </form>
          ) : (
<div className="d-flex">
                <i className="fa-solid fa-user  mx-2 mt-2" onClick={() => setShowProfile(true)}></i>
                <Link
                  className="btn btn-outline-secondary mx-2"
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
          )}
        </div>
      </div>
    </nav>
     <ProfileModal show={showProfile} handleClose={() => setShowProfile(false)} />
    </>
    
  );
};
