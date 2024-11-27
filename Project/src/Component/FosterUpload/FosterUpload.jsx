import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
baseURL: 'https://localhost:7195/api',
headers: {
Authorization: `Bearer ${localStorage.getItem('userToken')}`,
},
});

const FosterUpload = () => {
const [foster, setFoster] = useState({
fOwnername: '',
fAvailablePlaces: 0,
fPhone: '',
forDay: 0,
forWeek: 0,
forMonth: 0,
fLocation: '',
fDescripation: '',
fosterImageFile: null, // Updated to hold the file object
});

const handleChange = (e) => {
const { name, value, files } = e.target;
if (name === 'fosterImage') {
const file = files[0];
if (file) {
setFoster({ ...foster, fosterImageFile: file });
}
} else {
setFoster({ ...foster, [name]: value });
}
};

const handleSubmit = async (e) => {
e.preventDefault();

const formDataToSend = new FormData();
formDataToSend.append('FOwnername', foster.fOwnername);
formDataToSend.append('FAvailablePlaces', foster.fAvailablePlaces);
formDataToSend.append('FPhone', foster.fPhone);
formDataToSend.append('ForDay', foster.forDay);
formDataToSend.append('ForWeek', foster.forWeek);
formDataToSend.append('ForMonth', foster.forMonth);
formDataToSend.append('FLocation', foster.fLocation);
formDataToSend.append('FDescripation', foster.fDescripation);
if (foster.fosterImageFile) {
formDataToSend.append('Image', foster.fosterImageFile); // Match this name with the backend property
}

try {
const response = await api.post('/Foster', formDataToSend);
Swal.fire({
title: 'Success!',
text: 'Foster information uploaded successfully.',
icon: 'success',
confirmButtonText: 'OK'
});
} catch (error) {
console.error('Error posting foster data:', error);
Swal.fire({
title: 'Error!',
text: 'There was an error uploading foster information.',
icon: 'error',
confirmButtonText: 'OK'
});
}
};

return (
<div className="container mt-5">
    <div className="text-center mb-4">
        <h6 className="text-uppercase text-main">foster</h6>
        <h1 className="h5 text-uppercase fw-bold">foster</h1>
    </div>

    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="fOwnername">Owner Name</label>
            <input type="text" className="form-control" id="fOwnername" name="fOwnername" value={foster.fOwnername}
                onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="fAvailablePlaces">Available Places</label>
            <input type="number" className="form-control" id="fAvailablePlaces" name="fAvailablePlaces"
                value={foster.fAvailablePlaces} onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="fPhone">Phone</label>
            <input type="text" className="form-control" id="fPhone" name="fPhone" value={foster.fPhone}
                onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="forDay">For Day</label>
            <input type="number" className="form-control" id="forDay" name="forDay" value={foster.forDay}
                onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="forWeek">For Week</label>
            <input type="number" className="form-control" id="forWeek" name="forWeek" value={foster.forWeek}
                onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="forMonth">For Month</label>
            <input type="number" className="form-control" id="forMonth" name="forMonth" value={foster.forMonth}
                onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="fLocation">Location</label>
            <input type="text" className="form-control" id="fLocation" name="fLocation" value={foster.fLocation}
                onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="fDescripation">Description</label>
            <textarea className="form-control" id="fDescripation" name="fDescripation" value={foster.fDescripation}
                onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="fosterImage">Upload Image</label>
            <input type="file" className="form-control" id="fosterImage" name="fosterImage" onChange={handleChange}
                required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
    </form>
</div>
);
};

export default FosterUpload;