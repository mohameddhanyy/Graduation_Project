import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ShelterDetailComponent = () => {
    const { id } = useParams();
    const [shelter, setShelter] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7195/api/Shelter/${id}`)
            .then(response => {
                setShelter(response.data);
            })
            .catch(error => {
                console.error('Error fetching shelter details:', error);
            });
    }, [id]);
    useEffect(() => window.scrollTo(0, 0), []);

    if (!shelter) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
                <h6 className="text-uppercase text-main"> {shelter.shelterName} Shelter Details</h6>
                <h1 className="display-5 text-uppercase mb-0 fw-bold">{shelter.shelterName} Shelter</h1>
            </div>

            <div className="card shadow">
                <div className="row no-gutters">
                    <div className="col-md-4" style={{ overflow: 'hidden' }}>
                        <img
                            src={shelter.image}
                            className="card-img-top"
                            alt={shelter.shelterName} 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                // clipPath: 'polygon(0 0, 100% 0, 100% 90%, 80% 100%, 60% 90%, 40% 100%, 20% 90%, 0 100%)'
                            }}
                        />
                    </div>

                    <div className="col-md-8">
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item mb-2"><strong>Email :</strong> {shelter.sEmail}</li>
                                <li className="list-group-item mb-2"><strong>Location :</strong> {shelter.sLocation}</li>
                                <li className="list-group-item mb-2"><strong>Manager Phone :</strong> {shelter.managerPhone}</li>
                                <li className="list-group-item mb-2"><strong>Available Places :</strong> {shelter.availablePlaces}</li>
                                <li className="list-group-item mb-2"><strong>Name :</strong> {shelter.shelterName}</li>
                            </ul>
                            <div className="text-center mt-3 mb-2">
                                <Link className="nav-link" to="/Shelter">
                                    <button className="btn btn-primary btn-lg ms-3">View All Shelters</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShelterDetailComponent;
