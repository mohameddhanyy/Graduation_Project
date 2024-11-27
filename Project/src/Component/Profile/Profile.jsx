import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { FaUser, FaEnvelope, FaCity, FaMapMarkerAlt } from 'react-icons/fa'; // Importing icons from react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser, faEnvelope, faCity, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom"

// Import Font Awesome for icons

const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});

const AccountDetails = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch account details from the API
    api.get('/Account')
      .then(response => {
        setAccountInfo(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
        setError('Error fetching account details. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!accountInfo) {
    return <div>No account details found.</div>;
  }

  return (
    
    <div className="container mt-5">
    <div className="border-start border-5 border-success ps-4 mb-5" style={{ maxWidth: '600px' }}>
      <h6 className="text-uppercase text-secondary">Account Page</h6>
      <h1 className="h3 text-uppercase mb-0 fw-bold ">Hello, {accountInfo.userName}!</h1>
    </div>

    <div className="text-center mb-4">
      <img
        src={accountInfo.userImage}
        className="rounded-circle img-fluid"
        alt="User"
        style={{ width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #28a745' }}
      />
    </div>
    <ul className="list-group list-group-flush" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <li className="list-group-item d-flex align-items-center">
        <FontAwesomeIcon icon={faUser} className="me-3 text-success" />
        <div>
          <strong>Username:</strong>
          <span className="ms-2">{accountInfo.userName}</span>
        </div>
      </li>
      <li className="list-group-item d-flex align-items-center">
        <FontAwesomeIcon icon={faEnvelope} className="me-3 text-success" />
        <div>
          <strong>Email:</strong>
          <span className="ms-2">{accountInfo.email}</span>
        </div>
      </li>
      <li className="list-group-item d-flex align-items-center">
        <FontAwesomeIcon icon={faCity} className="me-3 text-success" />
        <div>
          <strong>City:</strong>
          <span className="ms-2">{accountInfo.city}</span>
        </div>
      </li>
      <li className="list-group-item d-flex align-items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 text-success" />
        <div>
          <strong>Location:</strong>
          <span className="ms-2">{accountInfo.location}</span>
        </div>
      </li>
      {/* <li className="list-group-item d-flex align-items-center">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-3 text-success" />
        <div>
          <strong>userimage:</strong>
          <span className="ms-2">{accountInfo.userImage}</span>
        </div>
      </li> */}
    </ul>
    <div className="text-center p-4">
                            <Link to="/ProfileEdit" className="btn btn-primary text-uppercase py-2 px-4 my-3">Edit Profile</Link>
                        </div>

  </div>  

)};

export default AccountDetails;
