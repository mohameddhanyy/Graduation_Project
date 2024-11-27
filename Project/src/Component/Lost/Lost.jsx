import React, { useEffect, useState } from 'react';
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
const LostAnimalCards = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    api.get('https://localhost:7195/api/LostAnimal')
      .then(response => {
        setAnimals(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="container mt-5">
                 <div className="border-start border-5 border-success ps-5 mb-5" style={{'max-width': '600px'}}>
                <h6 className=" text-uppercase text-main">Lost</h6>
                <h1 className="h-5 text-uppercase mb-0 fw-bold">if you saw these pets </h1> </div>

      <div className="row">
        {animals.map(animal => (
          <div className="col-md-4 mb-4" key={animal.id}>
            <Link to={`/lost/${animal.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card h-100 shadow">
                <img
                  src={animal.lostAnimalImage}
                  className="card-img-top"
                  alt={animal.lostAnimalName}
                  style={{ height: '300px', objectFit: 'fill', width: '100%'}}
                />
                <div className="card-body">
                  <li className="list-group-item mb-2"><strong>Name :</strong> {animal.lostAnimalName}</li>
                  <li className="list-group-item mb-2"><strong>Location :</strong> {animal.lostAnimalLocation}</li>
                </div>
                <div className="text-center mb-3">
<Link assName="nav-link" to={`/lost/${animal.id}`}>

                <button className="btn btn-success btn-sm ">More Details</button>
                </Link>

              </div>        {/* Add more details here as needed */}

              </div>
            </Link>
            
          </div>
          
        ))}
      </div>
      <Link to="/UploadLost" onClick={scrollToTop}>

<div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
  <button className="btn btn-primary btn-lg">
  <FontAwesomeIcon icon={faPlus} />
  </button>
</div>

</Link>

    </div>
    
  );
};

export default LostAnimalCards;
