import React from 'react';
import aboutPic from "../../Assets/images/about.jpg";

export default function About() {
    return (
        <>    
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src={aboutPic} style={{ objectFit: 'cover' }} alt="photoAbout" />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="border-start border-5 border-success ps-5 mb-5">
                                <h6 className="text-uppercase" style={{ color: "#7AB730" }}>About Us</h6>
                                <h1 className="h-5 text-uppercase mb-0 fw-bolder">We Keep Pets Happy All Time</h1>
                            </div>
                            <h4 className="fw-bold mb-4" style={{ color: "#959595" }}>At Aleef Shelter , we're passionate about connecting animals with loving homes. Our mission is to make the adoption process as seamless as possible, ensuring that every animal finds its perfect match and every family finds its newest member.</h4>
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
    );
}
