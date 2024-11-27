import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css';

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7195/api/Course')
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the courses!', error);
            });
    }, []);
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <div className="container my-5">
            <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main"> Training Course
</h6>
        <h1 className="g-small text-uppercase mb-0 fw-bold"> videos to make you learn more about pets  </h1>
      </div>

            <div className="row">
                {courses.map((course, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card">
                            <img src={course.cImages} className="card-img-top" alt={course.cName} />
                            <div className="card-body">
                                <h5 className="card-title">{course.cName}</h5>
                                <p className="card-text">{course.cDescripation}</p>
                                <Link to={`/workshopdetails`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
