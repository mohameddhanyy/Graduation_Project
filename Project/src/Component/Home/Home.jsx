import React, {  useEffect, useState } from 'react'
import "./Home.module.css"
import Pic from "../../Assets/images/about.jpg"
import {Link} from "react-router-dom"

import axios, { AxiosResponse } from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

export default function Home() {


    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };

      const [animals, setAnimals] = useState([]);

      useEffect(() => {
        axios.get('https://localhost:7195/api/Animals')
          .then(response => {
            setAnimals(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);
    

    // useEffect(()=> {

    //     axios.get('https://localhost:7017/api/Animal')
    //     .then((response: AxiosResponse<any>) => {
        
    //       console.log(response.data);
    //     })
        
    //     }, []
        
        
    //     )
        






  return <>
  {/* <Helmet>
                
                
            </Helmet> */}
            <div className="container-fluid bg-primary py-5 mb-5 hero-header ">
        <div className="container py-5">
            <div className="row justify-content-start">
                <div className="col-lg-8 text-center text-lg-start">
                    <h1 className="display-1 text-uppercase text-dark mb-lg-4 fw-bold">aleef shelter</h1>
                    <h1 class="text-uppercase text-white mb-lg-4">Make Your Pets Happy</h1>
                    <span className="fs-4 text-white mb-lg-4">At Aleef Shelter, we're passionate about connecting animals with loving homes.Our mission is to make adoption process as seamless as possible.</span>
                    <div className="d-flex align-items-center justify-content-center justify-content-lg-start pt-5">
                        <Link to="/blog" className="btn btn-outline-light border-2 py-md-3 px-md-5 me-5">Read More</Link>

                        <Link to='https://www.youtube.com/watch?v=mNaeIjsQ2QE&pp=ygUMYW5pbWFscmlnaHRz'><button type="button" className="btn-play"
                         data-bs-toggle="#"data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                            <span></span>
                        </button></Link>
                        <h5 className="font-weight-normal text-white m-0 ms-4 d-none d-sm-block">Play Video</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>












    <div class="container-fluid py-5">
    <div class="container">
        <div class="row gx-5">
            <div class="col-lg-5 mb-5 mb-lg-0" >
                <div class="position-relative h-100">
                         <img class="position-absolute w-100 h-100 rounded"   src={Pic} style={{'object-fit': 'cover'}} alt="photoAbout"  />

                    {/* <img class="position-absolute w-100 h-100 rounded" src="img/about.jpg" style="object-fit: cover;"> */}
                </div>
            </div>

{/* about */}

        <>    
            <div className="container-fluid grey-background py-5">
                <div className="container">
                  
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src={Pic} style={{ objectFit: 'cover' }} alt="photoAbout" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="border-start border-5 border-success ps-5 mb-5">
                                <h6 className="text-uppercase" style={{ color: "#7AB730" }}>About Us</h6>
                                <h1 className="h-5 text-uppercase mb-0 fw-bolder">We Keep Pets Happy All Time</h1>
                            </div>
                            <h4 className="fw-bold mb-4" style={{ color: "#959595" }}>At Aleef Shelter, we're passionate about connecting animals with loving homes. Our mission is to make the adoption process as seamless as possible, ensuring that every animal finds its perfect match and every family finds its newest member.</h4>
                            <div className="bg-grey p-4">
                                <ul className="nav nav-pills justify-content-between mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item w-50" role="presentation">
                                        <button className="nav-link text-uppercase w-100 active" id="pills-1-tab" data-bs-toggle="pill" data-bs-target="#pills-1" type="button" role="tab" aria-controls="pills-1" aria-selected="true">Our Mission</button>
                                    </li>
                                    <li className="nav-item w-50" role="presentation">
                                        <button className="nav-link text-uppercase w-100" id="pills-2-tab" data-bs-toggle="pill" data-bs-target="#pills-2" type="button" role="tab" aria-controls="pills-2" aria-selected="false">Our Vision</button>
                                    </li>
                                </ul>

                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-1" role="tabpanel" aria-labelledby="pills-1-tab">
                                        <p className="mb-0 fs-8 " style={{ color: "#6c757d" }}>We are dedicated to rescuing animals in need and providing them with the care and attention they deserve. Through our platform, we strive to create a community where pet adoption is accessible and encouraged, making it easier than ever for individuals to find their furry companions.</p>
                                    </div>
                                    <div className="tab-pane fade" id="pills-2" role="tabpanel" aria-labelledby="pills-2-tab">
                                        <p className="mb-0 fs-8 " style={{ color: "#6c757d" }}>We envision a world where every animal has a loving home and every pet owner has the resources and support they need to provide the best possible care for their furry friends. By promoting adoption and responsible pet ownership, we aim to reduce the number of animals in shelters and create happier, healthier lives for pets and their human companions.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

{/* about */}













            <div>


    </div>





        </div>
    </div>
</div>




{/* adopt */}

<div className="container-fluid  pt-3 pb-5">

<div className="container mt-5  ">
<div className="border-start border-5 border-success ps-5  margin text-center mx-auto" style={{'maxWidth': '600px'}}>
    <h6 className="text-uppercase text-main">Adopt</h6>
    <h1 className="h-5 text-uppercase fw-bold">adopt innocent pets</h1>
</div>

<div className="row justify-content-center g-4">
  {animals.slice(0, 5).map(animal => (
    <div className="col-md-4 mb-4" key={animal.id}>
      <div className="card h-100 shadow">
        <Link to={`/animal/${animal.id}`}>
          <img
            src={animal.animalIamge}
            className="card-img-top img-fluid"
            alt={animal.animalName}
            style={{ height: '150px', objectFit: 'cover' }}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{animal.animalName}</h5>
        </div>
      </div>
    </div>
  ))}
 <div className="col-md-4 mb-4">
      <div
        className="card h-100 shadow"
        style={{ backgroundColor: '#7ab730' }}
      >
        <div className="card-body d-flex justify-content-center align-items-center">
          <Link to="/adopt" onClick={scrollToTop} className="text-decoration-none text-white">
            <span className="card-title">More Animals</span>
            <span><FontAwesomeIcon icon={faPaw} className="ms-2" /></span>
          </Link>
        </div>
      </div>
    </div></div>
    </div>

</div>

{/* adopt */}



{/* adopt */}

<div className="container-fluid grey-background pt-3 pb-5">

<div className="container mt-5  ">
<div className="border-start border-5 border-success ps-5  margin text-center mx-auto" style={{'maxWidth': '600px'}}>
    <h6 className="text-uppercase text-main">Lost</h6>
    <h1 className="h-5 text-uppercase fw-bold">if you saw these pets</h1>
</div>

<Link to="/lost" >
<div className="row justify-content-center g-4">
  <div className="col-md-4 mb-4">
    <div
      className="card h-100 shadow"
      style={{ backgroundColor: '#7ab730' }}
    >

      <div className="card-body d-flex justify-content-center align-items-center">
      <Link to="/lost"  className="text-decoration-none text-white">
          <span className="card-title ">TAKE A LOOK</span>   <span><i className="fas fa-paw ms-2"></i> {/* Add an icon */}
</span>     

        </Link>


        
      </div>
    </div>
  </div>
</div>

</Link>
    </div>

</div>

{/* Donate */}

<div className="">
    <div className="container   mt-5  py-5">
        <div className="container-fluid">
        <div className="border-start border-5 border-success ps-5  margin text-center mx-auto" style={{'maxWidth': '600px'}}>
    <h6 className="text-uppercase text-main">donate</h6>
    <h1 className="h-5 text-uppercase fw-bold">To donate</h1>
</div>
            <div className="row g-5">
                <div className="col-lg-4">
                    <div className="bg-grey text-center pt-5 mt-lg-5">
                        <h2 className="text-uppercase fw-bold">Basic</h2>
                        <h6 className="text-grey mb-5">Good Choice</h6>
                        <div className="text-center bg-main p-4 mb-2">
                            <h1 className="display-4 text-white mb-0 fw-bold">
                                <small className="align-top"  style={{'fontSize': '22px', 'lineHeight': '45px' }}>
                                    $</small>49<small
                                    className="align-bottom" style={{'fontSize': '16px', 'lineHeight': '40px '}}>
                                    </small>
                            </h1>
                        </div>
                        <div className="text-center p-4">
                            <Link to="" className="btn btn-primary text-uppercase py-2 px-4 my-3">Donate Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-grey text-center pt-5">
                        <h2 className="text-uppercase fw-bold">Standard</h2>
                        <h6 className="text-grey mb-5">Very Good Choice</h6>
                        <div className="text-center bg-dark p-4 mb-2">
                            <h1 className="display-4 text-white mb-0 fw-bold">
                                <small className="align-top"
                                style={{'fontSize': '22px', 'lineHeight': '45px '}}
                                    >$</small>99<small
                                    className="align-bottom" style={{'fontSize': '16px', 'lineHeight': '40px '}} >
                                    </small>
                            </h1>
                        </div>
                        <div className="text-center p-4">
                            <Link to="" className="btn btn-primary text-uppercase py-2 px-4 my-3">Donate Now</Link>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="bg-grey text-center pt-5 mt-lg-5">
                        <h2 className="text-uppercase fw-bold">Extended</h2>
                        <h6 className="text-grey mb-5">The Best Choice</h6>
                        <div className="text-center bg-main p-4 mb-2">
                            <h1 className="display-4 text-white mb-0 fw-bold">
                                <small className="align-top"
                                style={{'fontSize': '22px', 'lineHeight': '45px '}}
                                    >$</small>149<small
                                    className="align-bottom" style={{'fontSize': '40px', 'lineHeight': '16px '}}>
                                  </small>
                            </h1>
                        </div>
                        <div className="text-center p-4">
                            <Link to="" className="btn btn-primary text-uppercase py-2 px-4 my-3">Donate Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






{/* Donate */}






  </>
}
