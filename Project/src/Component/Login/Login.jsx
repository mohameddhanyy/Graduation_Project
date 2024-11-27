// import React, { useContext, useState } from 'react'
// import "./Login.module.css"
// import { useFormik } from 'formik'
// import * as yup from 'yup'
// import axios from 'axios'
// import {Link, useNavigate} from "react-router-dom"
// import { ThreeCircles } from  'react-loader-spinner'
// import { userContext } from '../../Context/UserContext'

// export default function Login(value) {

//   let {setUserToken} = useContext(userContext)
//   let validationSchema = yup.object({
//     email: yup.string().email("E-mail is inValid").required("E-mail is required"),
//     password: yup.string().matches(/[A-Z][a-z0-9]{5,10}/ , "Password is inValid").required("Password is required"),
//   })
//   let [Error,setError] = useState("")
//   let [isLoading,setisLoadind] = useState(false)
//   let navigate = useNavigate();
//   async function submitRegister(value) {
//     setisLoadind(true)
//     let {data} = await axios.post(`https://localhost:7195/api/Account/login` ,value)
//     .catch((err)=>{ 
//       setisLoadind(false)
//       setError(err.response.data.message)
//     })
//     if(data.message === "success" ){
//       setisLoadind(false)
//       localStorage.setItem("userToken" , data.token)
//       setUserToken(data.token)
//         navigate("/")
//     }
//   }

//   let formik= useFormik({
//     initialValues:{
//       email:'',
//       password:'',
//     },validationSchema,
//     onSubmit: submitRegister
//   })

//   return <>
//   <div className='w-75 mx-auto py-5 '>
//     {Error?<div className="alert alert-danger">{Error}</div>:""}
    

//     <div className="border-start border-5 border-success ps-5 mb-5" style={{'max-width': '600px'}}>
//                 <h6 className=" text-uppercase text-main">login</h6>
//                 <h1 className="display-5 text-uppercase mb-0 fw-bold">log in . . .</h1>
//             </div>

//     <form onSubmit={formik.handleSubmit}>

//       <label htmlFor="email" className='mb-2'>Email :</label>
//       <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' className='form-control mb-2' id='email' type="email" />
//       {formik.errors.email && formik.touched.email ? <div className="alert alert-danger mt-2 mb-3 p-2">{formik.errors.email}</div> : null }


//       <label htmlFor="password" className='mb-2'>Password :</label>
//       <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name='password' className='form-control mb-2' id='password' type="password" />
//       {formik.errors.password && formik.touched.password ? <div className="alert alert-danger mt-2 mb-3 p-2">{formik.errors.password}</div> : null }

//       {!isLoading?
//       <div className='d-flex align-items-center mx-2'>
//       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main me-2  '>Login</button>
      
//       <Link className='btn ' to={"/register"}>Register Now</Link>
//       </div>
//       :
//       <button type='button' className='bg-main mt-3 text-white none rounded-3'>
//        <ThreeCircles
//   height="50"
//   width="60"
//   color="white"
//   wrapperStyle={{}}
//   wrapperClass=""
//   visible={true}
//   ariaLabel="three-circles-rotating"
//   outerCircleColor=""
//   innerCircleColor=""
//   middleCircleColor=""
// />
//       </button>
//       }
      
//     </form>


//   </div>
//   </>
// }




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://localhost:7195/api/Account/login', formData);
//       console.log('Response data:', response.data);
//       // Assuming response.data.token is present upon successful login
//       if (response.data.token) {
//         // Redirect to home page
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;









// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('https://localhost:7195/api/Account/login', formData);
//       console.log('Response data:', response.data);
//       // Save token in local storage
//       localStorage.setItem('token', response.data.token);
//       // Navigate to home page
//       navigate('/');
//     } catch (error) {
//       console.error('Error logging in:', error);
//       setError(error.response.data.message);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;






























import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import { userContext } from '../../Context/UserContext';

const api = axios.create({
  baseURL: 'https://localhost:7195/api',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
  },
});

const Login = () => {
  const { setUserToken } = useContext(userContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await api.post('/Account/login', values);
      localStorage.setItem('userToken', response.data.token);
      setUserToken(response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="container py-5">
      <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">Login</h6>
        <h1 className="display-5 text-uppercase mb-0 fw-bold">Log in...</h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && <div className="text-danger">{formik.errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && <div className="text-danger">{formik.errors.password}</div>}
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {!isLoading? (
          <div className="d-flex align-items-center">
            <button type="submit" onClick={scrollToTop} className="btn bg-main me-2">Login</button>
            <Link onClick={scrollToTop} to="/register" className="btn">Register Now</Link>
          </div>
        ) : (
          <button type="button" onClick={scrollToTop} className="bg-main mt-3 text-white none rounded-3">
            <ThreeCircles height="50" width="60" color="white" visible={true} ariaLabel="three-circles-rotating" />
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;