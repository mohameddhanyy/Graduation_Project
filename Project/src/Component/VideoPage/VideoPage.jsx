// src/components/VideoDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const VideoDetails = () => {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        axios.get(`https://localhost:7195/api/Video/${id}`)
            .then(response => {
                setVideo(response.data);
            })
            .catch(error => {
                console.error('Error fetching video details:', error);
            });
    }, [id]);

    if (!video) return <div>Loading...</div>;

    return (
        <div className="container my-5">
            <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
                <h6 className="text-uppercase text-main">{video.videoTitle} Details</h6>
                <h1 className="display-5 text-uppercase mb-0 fw-bold">{video.videoTitle}</h1>
            </div>

            <Card className="shadow">
                <div className="row no-gutters">
                    <div className="col-md-4" style={{ overflow: 'hidden' }}>
                        <video controls className="card-img-top" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                            <source src={video.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item mb-2"><strong>Title :</strong> {video.videoTitle}</li>
                                <li className="list-group-item mb-2"><strong>Description :</strong> {video.description}</li>
                            </ul>
                            <div className="text-center mt-3 mb-2">
                                <Link className="nav-link" to="/">
                                    <button className="btn btn-primary btn-lg ms-3">View All Videos</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default VideoDetails;
