// LostDetails.jsx
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
const LostDetails = () => {
  const [lostAnimal, setLostAnimal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api.get(`https://localhost:7195/api/LostAnimal/${id}`)
      .then(response => {
        setLostAnimal(response.data);
      })
      .catch(error => {
        console.error('Error fetching lost animal details:', error);
      });
  }, [id]);
  useEffect(() => window.scrollTo(0, 0), []);

  if (!lostAnimal) {
    return <div>Loading...</div>;
  }

  return (

    <div className="container mt-5">

<div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main"> {lostAnimal.lostAnimalName} Details
</h6>
        <h1 className="display-5 text-uppercase mb-0 fw-bold">  {lostAnimal.lostAnimalName} 
 . . .</h1>
      </div>

      <div className="card shadow">
  <div className="row no-gutters">
    <div className="col-md-4" style={{ overflow: 'hidden' }}>
    <img
  src={lostAnimal.lostAnimalImage}
  className="card-img-top"
  alt={lostAnimal.lostAnimalName}
  style={{ width: '100%', height: '100%', objectFit: 'cover', clipPath: 'polygon(0 0, 100% 0, 100% 90%, 80% 100%, 60% 90%, 40% 100%, 20% 90%, 0 100%)' }}
  />
    </div>


    <div className="col-md-8">
      <div className="card-body" >
      <ul className="list-group list-group-flush">
  <li className="list-group-item mb-2"><strong>Name :</strong> {lostAnimal.lostAnimalName}</li>
  <li className="list-group-item mb-2"><strong>Location : </strong> {lostAnimal.lostAnimalLocation}</li>
  <li className="list-group-item mb-2"><strong>Phone Number :</strong> {lostAnimal.lostAnimalPhonenum}</li>
  <li className="list-group-item mb-2"><strong>Description :</strong> {lostAnimal.lostAnimalDescription}</li>
  <li className="list-group-item mb-2"><strong>Owner :</strong> {lostAnimal.user}</li>

</ul>
<div className="text-center mt-3 mb-2">
                <Link assName="nav-link" to="/adopt">
                <button className="btn btn-primary btn-lg ms-3">View All Animals</button>

                    </Link>

              </div>        {/* Add more details here as needed */}
      </div>
    </div>




    
  </div>
</div>




    </div>


  );
};

export default LostDetails;





{/* <div className="container mt-5">
<div className="card shadow">
  <img
    src={lostAnimal.lostAnimalImage}
    className="card-img-top"
    alt={lostAnimal.lostAnimalName}
    style={{  }}
  />
  <div className="card-body">
    <h5 className="card-title">{lostAnimal.lostAnimalName}</h5>
    <p className="card-text">Location: {lostAnimal.lostAnimalLocation}</p>
    <p className="card-text">Phone Number: {lostAnimal.lostAnimalPhonenum}</p>
    <p className="card-text">Description: {lostAnimal.lostAnimalDescription}</p>
    <p className="card-text">Owner: {lostAnimal.user}</p>
    {/* Add more details here as needed */}
//   </div>
// </div>
// </div> */}
