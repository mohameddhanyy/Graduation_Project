import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});
const AnimalDetails = () => {
  const [animal, setAnimal] = useState(null);
  const { id } = useParams();
  const token = localStorage.getItem('userToken'); // Retrieve token from local storage

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    api.get(`https://localhost:7195/api/Animals/${id}`)
    .then(response => {
      setAnimal(response.data);
    })
    .catch(error => {
      console.error('Error fetching animal details:', error);
    });
  }, [id, token]);

  if (!animal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">{animal.animalName} Details</h6>
        <h1 className="display-5 text-uppercase mb-0 fw-bold">{animal.animalName}</h1>
      </div>

      <div className="card shadow">
        <div className="row no-gutters">
          <div className="col-md-4" style={{ overflow: 'hidden' }}>
            <img
              src={animal.animalIamge}
              className="card-img-top"
              alt={animal.animalName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 80% 100%, 60% 90%, 40% 100%, 20% 90%, 0 100%)' }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item mb-2"><strong>Name :</strong> {animal.animalName}</li>
                <li className="list-group-item mb-2"><strong>Type :</strong> {animal.type}</li>
                <li className="list-group-item mb-2"><strong>Age :</strong> {animal.animalAge}</li>
                <li className="list-group-item mb-2"><strong>Gender :</strong> {animal.anaimalGender}</li>
                <li className="list-group-item mb-2"><strong>Location : </strong> {animal.animalLocation}</li>
                <li className="list-group-item mb-2"><strong>Activity Level :</strong> {animal.anaimalActivityLevel}</li>
                <li className="list-group-item mb-2"><strong>Peeped :</strong> {animal.animalPeeped ? 'Yes' : 'No'}</li>
                <li className="list-group-item mb-2"><strong>Medical Need :</strong> {animal.animalMedicalNeed}</li>
              </ul>
              <div className="text-center mt-3 mb-2">
                <Link onClick={scrollToTop} className="nav-link" to="/AdoptForm">
                  <button className="btn btn-success btn-lg mr-2">Adopt Now</button>
                </Link>
                <Link className="nav-link" to="/adopt">
                  <button className="btn btn-primary btn-lg my-3 ms-3">View All Animals</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
