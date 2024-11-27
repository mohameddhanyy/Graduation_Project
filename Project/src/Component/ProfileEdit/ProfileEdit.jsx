import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

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
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    city: '',
    location: '',
    userImage: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  const [passwordError, setPasswordError] = useState(null);

  

  useEffect(() => {
    api.get('/Account')
      .then(response => {
        setAccountInfo(response.data);
        setUserData(response.data); // Set initial user data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching account details:', error);
        setError('Error fetching account details. Please try again later.');
        setLoading(false);
      });
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);

  // const handleImageChange = (e) => {
  //   const { files } = e.target;
  //   if (files && files[0]) {
  //     convertImageToBase64(files[0]);
  //   }
  // };

  // const convertImageToBase64 = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setAccountInfo((prevFormData) => ({
  //       ...prevFormData,
  //       userImage: reader.result.split(',')[1], // Get base64 string
  //     }));
  //   };
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = accountInfo.id; // Assuming accountInfo has an 'id' field

    try {
      // Update profile
      const editResponse = await api.put(`/Account/edit/${id}`, userData);
      console.log('Account edited successfully:', editResponse.data);
      setAccountInfo(editResponse.data);

      // Reset password if both password fields are filled
      if (passwordData.currentPassword && passwordData.newPassword) {
        const passwordResponse = await api.put(`/Account/reset-password/${id}`, passwordData);
        console.log('Password reset successfully:', passwordResponse.data);
        setPasswordError(null); // Clear any previous errors
      }

      // Redirect to profile page after editing
      window.location.href = "/Profile";
    } catch (error) {
      console.error('Error updating account:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error updating account. Please try again later.');
      } else {
        setError('Error updating account. Please try again later.');
      }

      if (error.response && error.response.status === 400) {
        setPasswordError('Error resetting password. Please check your current password and try again.');
      }
    }
  };

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

      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="userName"
            value={userData.userName}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Username"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            className="form-control"
            placeholder="City"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="location"
            value={userData.location}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Location"
          />
        </div>
        {/* <div className="col-md-12">
          <input
            type="file"
            name="userImage"
            value={userData.userImage.convertImageToBase64}
            onChange={handleImageChange}
            className="form-control"
            placeholder="User Image URL"
          />
        </div> */}
        <div className="col-md-6">
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            className="form-control"
            placeholder="Current Password"
          />
        </div>
        <div className="col-md-6">
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            className="form-control"
            placeholder="New Password"
          />
        </div>
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary text-uppercase py-2 px-4 my-3">Submit</button>
        </div>
        {passwordError && <div className="col-md-12 text-danger text-center">{passwordError}</div>}
      </form>

      <div className="text-center">
        <Link to="/Profile" className="btn btn-secondary">Back to Profile</Link>
      </div>
    </div>
  );
};

export default AccountDetails;
