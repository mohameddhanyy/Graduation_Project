import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const FosterListComponent = () => {
    const [fosters, setFosters] = useState([]);
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
      useEffect(() => window.scrollTo(0, 0), []);

    useEffect(() => {
        axios.get('https://localhost:7195/api/Foster')
            .then(response => {
                setFosters(response.data);
            })
            .catch(error => {
                console.error('Error fetching foster data:', error);
            });
    }, []);

    if (fosters.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
                                    <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">Foster</h6>
        <h1 className="g-small text-uppercase mb-0 fw-bold">Find a Foster</h1>
      </div>

            <div className="row">
                {fosters.map(foster => (
                    <div key={foster.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm mb-4">
                            <img
                                src={foster.image}
                                className="card-img-top"
                                alt={foster.fOwnername}
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item mb-2"><strong>Owner Name:</strong> {foster.fOwnername}</li>
                                <li className="list-group-item mb-2"><strong>Location:</strong> {foster.fLocation}</li>
                                <li className="list-group-item mb-2"><strong>For Day:</strong> {foster.forDay} EGP</li>
                            </ul>

                        </div>
                        <div className="text-center mb-3">
                <Link className="nav-link" to={`/foster/${foster.id}`} >
                  <button className="btn btn-success btn-sm">More Details</button>
                </Link>
              </div>

                        </div>
                    </div>
                ))}
            </div>
                  <Link to="/FosterUpload" onClick={scrollToTop}>
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <button className="btn btn-primary btn-lg">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </Link>

        </div>
    );};

export default FosterListComponent;
