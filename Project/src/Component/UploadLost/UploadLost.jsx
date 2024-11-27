import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});

const AnimalUploadForm = () => {
  const [formData, setFormData] = useState({
    lostAnimalName: '',
    lostAnimalDescription: '',
    lostAnimalPhonenum: '',
    lostAnimalLocation: '',
    lostAnimalImageFile: null, // Updated to hold the file object
    lostDate: '', // No initial validation
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); // 'success' or 'danger'

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'lostAnimalImage') {
      const file = files[0];
      if (file) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          lostAnimalImageFile: file, // Store the entire file object
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('lostAnimalName', formData.lostAnimalName);
    formDataToSend.append('lostAnimalDescription', formData.lostAnimalDescription);
    formDataToSend.append('lostAnimalPhonenum', formData.lostAnimalPhonenum);
    formDataToSend.append('lostAnimalLocation', formData.lostAnimalLocation);
    formDataToSend.append('lostDate', formData.lostDate);
    if (formData.lostAnimalImageFile) {
      formDataToSend.append('lostAnimalImage', formData.lostAnimalImageFile); // Append the file object directly
    }

    try {
      const response = await api.post('/LostAnimal', formDataToSend);

      if (response.status === 201) {
        setAlertVariant('success');
        setAlertMessage('Data uploaded successfully');
        clearForm();
      } else {
        setAlertVariant('danger');
        setAlertMessage('An error occurred while submitting the form. Please try again later.');
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    } catch (error) {
      console.error('Error uploading data:', error.message);
      setAlertVariant('danger');

      if (error.response && error.response.status === 400) {
        setAlertMessage('lucky This animal already exists here, please check lost animals or browse list of animals adoption');
      } else {
        setAlertMessage('lucky This animal already exists here, please check lost animals or browse list of animals adoption');
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const clearForm = () => {
    setFormData({
      lostAnimalName: '',
      lostAnimalDescription: '',
      lostAnimalPhonenum: '',
      lostAnimalLocation: '',
      lostAnimalImageFile: null,
      lostDate: '',
    });
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h6 className="text-uppercase text-main">Upload</h6>
        <h1 className="h5 text-uppercase fw-bold">Upload Pet Information</h1>
      </div>
      {alertMessage && <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Pet Information */}
        <h3 className="mb-3 mt-5 text-center">Pet Details</h3>
        <Form.Group controlId="lostAnimalName" className="mb-3">
          <Form.Label>Pet's Name</Form.Label>
          <Form.Control type="text" name="lostAnimalName" value={formData.lostAnimalName} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="lostAnimalDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="lostAnimalDescription" value={formData.lostAnimalDescription} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="lostAnimalPhonenum" className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" name="lostAnimalPhonenum" value={formData.lostAnimalPhonenum} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="lostAnimalLocation" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="lostAnimalLocation" value={formData.lostAnimalLocation} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="lostDate" className="mb-3">
          <Form.Label>Lost Date</Form.Label>
          <Form.Control type="datetime-local" name="lostDate" value={formData.lostDate} onChange={handleChange} />
        </Form.Group>
        <Form.Group controlId="lostAnimalImage" className="mb-3">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" name="lostAnimalImage" onChange={handleChange} />
        </Form.Group>

        {/* Submit Button */}
        <div className="text-center mt-4">
          <Button variant="primary" size="sm" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default AnimalUploadForm;