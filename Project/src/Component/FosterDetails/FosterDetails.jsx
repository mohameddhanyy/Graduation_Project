import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import axios from 'axios';

const FosterDetailComponent = () => {
    const { id } = useParams();
    const [foster, setFoster] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7195/api/Foster/${id}`)
            .then(response => {
                setFoster(response.data);
            })
            .catch(error => {
                console.error('Error fetching foster details:', error);
            });
    }, [id]);
    useEffect(() => window.scrollTo(0, 0), []);

    if (!foster) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
                <h6 className="text-uppercase text-main">{foster.fOwnername} Foster Details</h6>
                <h1 className="display-5 text-uppercase mb-0 fw-bold">{foster.fOwnername} Foster</h1>
            </div>

            <div className="card shadow">
                <div className="row no-gutters">
                    <div className="col-md-4" style={{ overflow: 'hidden' }}>
                        <img
                            src={foster.image}
                            className="card-img-top"
                            alt={foster.fOwnername}
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
                                <li className="list-group-item mb-2"><strong>Owner Name:</strong> {foster.fOwnername}</li>
                                <li className="list-group-item mb-2"><strong>Location:</strong> {foster.fLocation}</li>
                                <li className="list-group-item mb-2"><strong>Phone:</strong> {foster.fPhone}</li>
                                <li className="list-group-item mb-2"><strong>Available Places:</strong> {foster.fAvailablePlaces}</li>
                                <li className="list-group-item mb-2"><strong>For Day:</strong> {foster.forDay} EGP</li>
                                <li className="list-group-item mb-2"><strong>For Week:</strong> {foster.forWeek} EGP</li>
                                <li className="list-group-item mb-2"><strong>For Month:</strong> {foster.forMonth} EGP</li>
                                <li className="list-group-item mb-2"><strong>Description:</strong> {foster.fDescripation}</li>
                            </ul>
                            <div className="text-center mt-3 mb-2">
                                <Link className="nav-link" to="/Foster">
                                    <button className="btn btn-primary btn-lg ms-3">View All Fosters</button>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FosterDetailComponent;
