// src/components/VideoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const VideoList = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7195/api/Video')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
            });
    }, []);

    const playVideo = (videoUrl) => {
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = videoUrl;
        videoPlayer.play();
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
    
      useEffect(() => window.scrollTo(0, 0), []);


    return (
        <div className="container my-5">
                        <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main"> Training Course
</h6>
        <h1 className="g-small text-uppercase mb-0 fw-bold"> videos to make you learn more about pets  </h1>
      </div>

            <div className="row">
                {videos.map((video, index) => (
                    <div key={index} className="col-md-6 mb-4">
                        <Card style={{ width: '100%', height: '500px' }}>
                            <video id="videoPlayer" controls style={{ width: '100%', height: '100%' }}>
                                <source src={video.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Card.Body>
                                <Card.Title>{video.videoTitle}</Card.Title>
                                <Card.Text>
                                    {video.description}
                                </Card.Text>
                                {/* <button className="btn btn-primary mx-3" onClick={() => playVideo(video.videoUrl)}>Play Video</button> */}
                                <Link onClick={scrollToTop} to={`/workshop`} className="btn btn-primary">Workshop Page   </Link> 
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
