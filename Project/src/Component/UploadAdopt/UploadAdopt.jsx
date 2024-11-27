import React, { useState } from 'react';
import { Form, Button,Col ,Row,Container, Alert } from 'react-bootstrap';
import axios from 'axios';


const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});

const AnimalUploadForm = () => {
  const [formData, setFormData] = useState({
    AnimalName: '',
    AnimalAge: 0, // Integer
    StatusWithKid: 0, // Integer
    StatusWithAnimal: 0, // Integer
    AnimalLocation: '',
    AnimalMedicalNeed: '', // String
    AnaimalActivityLevel: '', // String
    AnaimalPeeped: false, // Boolean
    AnaimalGender: '', // String
    AnimalIamgeFile:  null,// Base64 String
    AnimalTypeId: 0, // Integer
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success'); // 'success' or 'danger'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange =(e) => {
    const { name, value, files } = e.target;
    if (name === 'AnimalIamge') {
      const file = files[0];
      if (file) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          AnimalIamgeFile: file, // Store the entire file object
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
    formDataToSend.append('AnimalName', formData.AnimalName);
    formDataToSend.append('AnimalAge', formData.AnimalAge);
    formDataToSend.append('StatusWithKid', formData.StatusWithKid);
    formDataToSend.append('StatusWithAnimal', formData.StatusWithAnimal);
    formDataToSend.append('AnimalLocation', formData.AnimalLocation);
    formDataToSend.append('AnimalMedicalNeed', formData.AnimalMedicalNeed);
    formDataToSend.append('AnaimalActivityLevel', formData.AnaimalActivityLevel);
    formDataToSend.append('AnaimalPeeped', formData.AnaimalPeeped);
    formDataToSend.append('AnaimalGender', formData.AnaimalGender);
    formDataToSend.append('AnimalTypeId', formData.AnimalTypeId);
    if (formData.AnimalIamgeFile) {
      formDataToSend.append('AnimalIamge', formData.AnimalIamgeFile); // Append the file object directly
    }

    try {
      const response = await api.post('/Animals', formDataToSend);

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
        setAlertMessage('This animal image already exists in the database.');
      } else {
        setAlertMessage('Error uploading data.');
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };
  const clearForm = () => {
    setFormData({
      AnimalName: '',
      AnimalAge: 0, // Integer
      StatusWithKid: 0, // Integer
      StatusWithAnimal: 0, // Integer
      AnimalLocation: '',
      AnimalMedicalNeed: '', // String
      AnaimalActivityLevel: '', // String
      AnaimalPeeped: false, // Boolean
      AnaimalGender: '', // String
      AnimalIamgeFile:  null,// Base64 String
      AnimalTypeId: 0, // Integer
      });
  };

  
  return (
    <Container className="py-4">
      <div className="text-center mb-4">
        <h6 className="text-uppercase text-main">Adopt Form</h6>
        <h1 className="h5 text-uppercase fw-bold">Adopt Pet Information</h1>
      </div>
      {alertMessage && <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>{alertMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="AnimalName">
              <Form.Label>Animal's Name</Form.Label>
              <Form.Control type="text" name="AnimalName" value={formData.AnimalName} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="AnimalAge">
              <Form.Label>Animal's Age</Form.Label>
              <Form.Control type="number" name="AnimalAge" value={formData.AnimalAge} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="StatusWithKid">
              <Form.Label>Status with Kid</Form.Label>
              <Form.Control
                as="select"
                name="StatusWithKid"
                value={formData.StatusWithKid}
                onChange={handleChange}
              >
                <option value={0}>Select Status</option>
                <option value={1}>Bad</option>
                <option value={2}>Good</option>
                <option value={3}>Excellent</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="StatusWithAnimal">
              <Form.Label>Status with Animal</Form.Label>
              <Form.Control
                as="select"
                name="StatusWithAnimal"
                value={formData.StatusWithAnimal}
                onChange={handleChange}
              >
                <option value={0}>Select Status</option>
                <option value={1}>Bad</option>
                <option value={2}>Good</option>
                <option value={3}>Excellent</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="AnimalLocation">
              <Form.Label>Animal's Location</Form.Label>
              <Form.Control type="text" name="AnimalLocation" value={formData.AnimalLocation} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="AnimalMedicalNeed">
              <Form.Label>Animal's Medical Need</Form.Label>
              <Form.Control
                as="select"
                name="AnimalMedicalNeed"
                value={formData.AnimalMedicalNeed}
                onChange={handleChange}
              >
                <option value="">Select Medical Need</option>
                <option value="Need">Need</option>
                <option value="NotNeed">Not Need</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="AnaimalActivityLevel">
              <Form.Label>Animal's Activity Level</Form.Label>
              <Form.Control
                as="select"
                name="AnaimalActivityLevel"
                value={formData.AnaimalActivityLevel}
                onChange={handleChange}
              >
                <option value="">Select Activity Level</option>
                <option value="Calm">Calm</option>
                <option value="Not Calm">Not Calm</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="AnaimalPeeped">
              <Form.Label>Animal Peeped</Form.Label>
              <Form.Control
                as="select"
                name="AnaimalPeeped"
                value={formData.AnaimalPeeped}
                onChange={handleChange}
              >
                <option value={false}>No</option>
                <option value={true}>Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="AnaimalGender">
              <Form.Label>Animal's Gender</Form.Label>
              <Form.Control
                as="select"
                name="AnaimalGender"
                value={formData.AnaimalGender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="AnimalIamge">
              <Form.Label>Animal's Image</Form.Label>
              <Form.Control type="file" name="AnimalIamge" onChange={handleImageChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="AnimalTypeId">
              <Form.Label>Animal's Type</Form.Label>
              <Form.Control
                as="select"
                name="AnimalTypeId"
                value={formData.AnimalTypeId}
                onChange={handleChange}
              >
                <option value={0}>Select Type</option>
                <option value={4}>Cat</option>
                <option value={5}>Dog</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
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