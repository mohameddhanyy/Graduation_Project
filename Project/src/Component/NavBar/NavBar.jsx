import React, { useContext, useState, useEffect } from "react";
import "./NavBar.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});

const AccountDetails = () => {
  const [userImage, setUserImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await api.get('/Account');
        setUserImage(response.data.userImage);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user image:', error);
        setError('PROFILE');
        setLoading(false);
      }
    };

    fetchUserImage();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        {/* Loading indicator */}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userImage) {
    return <div>No user image found.</div>;
  }

  return (
    <img
      src={userImage}
      alt="User"
      className="rounded-circle"
      style={{ width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #000' }}
    />
  );
}

export default function NavBar() {
  let { userToken, setUserToken } = useContext(userContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={scrollToTop}>
            <h1 className="m-0 text-uppercase text-dark fw-bolder h2">
              <i
                className="fa-tents fa-solid fs-1 me-3"
                style={{ color: "#7AB730" }}
              ></i>
              Aleef Shelter
            </h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleDropdown}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${dropdownOpen ? 'show' : ''}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={scrollToTop}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about" onClick={scrollToTop}>About</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/Blog' ? 'active' : ''}`} to="/Blog" onClick={scrollToTop}>Blog</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/Shelter' ? 'active' : ''}`} to="/Shelter" onClick={scrollToTop}>Shelter</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/Foster' ? 'active' : ''}`} to="/Foster" onClick={scrollToTop}>Foster</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/donate' ? 'active' : ''}`} to="/donate" onClick={scrollToTop}>Donate</Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className={`nav-link dropdown-toggle ${location.pathname === '/adopt' || location.pathname === '/lost' || location.pathname === '/workshop' ? 'active' : ''}`}
                      id="servicesDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onClick={toggleDropdown}
                    >
                      Services
                    </Link>
                    <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} aria-labelledby="servicesDropdown">
                      <li>
                        <Link
                          to="/adopt"
                          className={`dropdown-item ${location.pathname === "/adopt" ? "active" : ""}`}
                          onClick={() => {
                            closeDropdown();
                            scrollToTop();
                          }}
                        >
                          Adopt
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/lost"
                          className={`dropdown-item ${location.pathname === "/lost" ? "active" : ""}`}
                          onClick={() => {
                            closeDropdown();
                            scrollToTop();
                          }}
                        >
                          Lost animals
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/workshop"
                          className={`dropdown-item ${location.pathname === "/Workshop" ? "active" : ""}`}
                          onClick={() => {
                            closeDropdown();
                            scrollToTop();
                          }}
                        >
                          Training Course
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : null}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {userToken !== null ? (
                <>
                  {/* Display user image if available */}
                  <li className="nav-item cursor-pointer">
                    <Link
                      className={`nav-link ${location.pathname === '/Profile' ? 'active' : ''}`}
                      onClick={scrollToTop}
                      to="/Profile"
                    >
                      <AccountDetails />
                    </Link>
                  </li>

                  {/* Your existing "LogOut" item */}
                  <li className="nav-item cursor-pointer">
                    <span
                      className={`nav-link cursor-pointer ${location.pathname === '/login' || location.pathname === '/register' ? 'active' : ''}`}
                      onClick={() => logOut()} 
                    >
                      LogOut
                      </span>
                  </li>
                </>
              ) : (
                <>
                  {/* Your existing "LogIn" and "Register" items */}
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} to="/login" onClick={scrollToTop}>
                      LogIn
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} to="/register" onClick={scrollToTop}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <style>
        {`
          .nav-item.active .nav-link,
          .nav-item.active .nav-link:hover {
            border-bottom: 2px solid #7AB730;
          }
        `}
      </style>
    </>
  );
}

