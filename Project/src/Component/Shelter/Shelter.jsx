import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ShelterListComponent = () => {
    const [shelters, setShelters] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7195/api/Shelter')
            .then(response => {
                setShelters(response.data);
            })
            .catch(error => {
                console.error('Error fetching shelters:', error);
            });
    }, []);
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className="container py-5">
                        <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">ٍShelter</h6>
        <h1 className="g-small text-uppercase mb-0 fw-bold">Find a Shelter</h1>
      </div>

            <div className="row">
                {shelters.map((shelter, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            <Link to={`/shelter/${shelter.id}`}>
                                <img src={shelter.image} className="card-img-top" alt={shelter.shelterName} style={{ objectFit: 'cover', height: '200px' }} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{shelter.shelterName}</h5>
                                <p className="card-text">{shelter.sLocation}</p>
                            </div>
                            <div className="text-center mb-3">
                <Link className="nav-link" to={`/shelter/${shelter.id}`} >
                  <button className="btn btn-success btn-sm">More Details</button>
                </Link>
              </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShelterListComponent;
