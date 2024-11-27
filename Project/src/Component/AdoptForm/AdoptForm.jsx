import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});

const AdoptAnimalForm = () => {
  const { id } = useParams();
  const [animals, setAnimals] = useState([]);
  const [selectedAnimalId, setSelectedAnimalId] = useState(id || '');
  const [formData, setFormData] = useState({
    dateString: '',
    socialMediaUrl: '',
    adoptionReasons: '',
    hadAnimalsBefore: false,
    isWorking: false,
    haveKids: false,
    canTakeResponsibility: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await api.get('/Animals');
        setAnimals(response.data);
      } catch (error) {
        console.error('Error fetching animals:', error);
        setError('Error fetching animals. Please try again later.');
      }
    };

    fetchAnimals();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(formData.dateString)) {
      setError('Invalid date format. Please use YYYY-MM-DD.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post(`/Animals/Adapt/${selectedAnimalId}`, formData);
      console.log('Animal adoption request sent:', response.data);
      setLoading(false);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your adoption request is pending! Wait for admin to check your request.',
      });

      // Optionally, navigate to another page
      // navigate('/Animals');
    } catch (error) {
      console.error('Error adopting animal:', error);
      setError('Error adopting animal. Please try again later.');
      setLoading(false);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again later.',
      });
    }
  };
  useEffect(() => window.scrollTo(0, 0), []);

  if (loading) {
    return (
      <div className="loading-container text-center">
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Adopt an Animal</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <select
            name="selectedAnimalId"
            value={selectedAnimalId}
            onChange={(e) => setSelectedAnimalId(e.target.value)}
            className="form-select"
          >
            <option value="">Select Animal</option>
            {animals.map((animal) => (
              <option key={animal.id} value={animal.id}>
                {animal.animalName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="date"
            name="dateString"
            value={formData.dateString}
            onChange={handleChange}
            className="form-control"
            placeholder="Date"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="socialMediaUrl"
            value={formData.socialMediaUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="Social Media URL"
          />
        </div>
        <div className="col-md-12">
          <textarea
            name="adoptionReasons"
            value={formData.adoptionReasons}
            onChange={handleChange}
            className="form-control"
            placeholder="Adoption Reasons"
          />
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input
              type="checkbox"
              name="hadAnimalsBefore"
              checked={formData.hadAnimalsBefore}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Had Animals Before</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input
              type="checkbox"
              name="isWorking"
              checked={formData.isWorking}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Is Working</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input
              type="checkbox"
              name="haveKids"
              checked={formData.haveKids}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Have Kids</label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-check">
            <input
              type="checkbox"
              name="canTakeResponsibility"
              checked={formData.canTakeResponsibility}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Can Take Responsibility</label>
          </div>
        </div>
        <div className="col-md-12 text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AdoptAnimalForm;
