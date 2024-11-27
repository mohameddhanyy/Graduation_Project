import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNamber: '',
    password: '',
    city: '',
    location: '',
    iamge: null // Image file
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, iamge: e.target.files[0] });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('userName', formData.userName);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phoneNamber', formData.phoneNamber);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('iamge', formData.iamge); // Append the image file

    try {
      const response = await axios.post('https://localhost:7195/api/Account/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response data:', response.data);
      if (response.data.token) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      // Improved error handling
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('An error occurred: ' + error.response.statusText);
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      <div className="border-start border-5 border-success ps-5 mb-5 mt-5 pt-3" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">Register</h6>
        <h1 className="display-5 text-uppercase mb-0 fw-bold">Register now . . .</h1>
      </div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">Username</label>
          <input type="text" className="form-control" id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNamber" className="form-label">Phone Number</label>
          <input type="text" className="form-control" id="phoneNamber" name="phoneNamber" value={formData.phoneNamber} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <select className="form-select" id="city" name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            <option value="Cairo">Cairo</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Tanta">Tanta</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="iamge" className="form-label">Image</label>
          <input type="file" className="form-control" id="iamge" name="iamge" onChange={handleFileChange} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button onClick={scrollToTop} type="submit" className="btn btn-primary mt-3">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
