import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});
const Adopt = () => {
  const [animals, setAnimals] = useState([]);
  const [visibleAnimals, setVisibleAnimals] = useState(6);

  useEffect(() => {
    api.get('https://localhost:7195/api/animals')
      .then(response => {
        setAnimals(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  useEffect(() => window.scrollTo(0, 0), []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleViewMore = () => {
    setVisibleAnimals(prevCount => prevCount + 6);
  };

  return (
    <div className="container mt-5">
      <div className="border-start  border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">Adopt</h6>
        <h1 className="text-uppercase mb-0 fw-bold">adopt innocent pets</h1>
      </div>
      <div className="row">
        {animals.slice(0, visibleAnimals).map(animal => (
          <div className="col-md-4 mb-4" key={animal.id}>
            <div className="card h-100 shadow">
              <Link to={`/animal/${animal.id}`}>
                <img
                  src={animal.animalIamge}
                  className="card-img-top img-fluid"
                  alt={animal.animalName}
                  style={{ height: '200px', width: '100%', objectFit: 'contain' }}
                />
              </Link>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item mb-2"><strong>Name :</strong> {animal.animalName}</li>
                  <li className="list-group-item mb-2"><strong>Age :</strong> {animal.animalAge}</li>
                  <li className="list-group-item mb-2"><strong>Gender :</strong> {animal.anaimalGender}</li>
                </ul>
              </div>
              <div className="text-center mb-3">
                <Link className="nav-link" to={`/animal/${animal.id}`}>
                  <button className="btn btn-success btn-sm">More Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {animals.length > visibleAnimals && (
        <div className="text-center mt-3">
          <button className="btn btn-primary btn-lg" onClick={handleViewMore}>View More</button>
        </div>
      )}
      <Link to="/UploadAdopt" onClick={scrollToTop}>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <button className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Adopt;

