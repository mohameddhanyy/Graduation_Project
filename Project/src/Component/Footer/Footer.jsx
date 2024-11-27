import React from 'react'
import "./Footer.module.css"
import {Link, useNavigate} from "react-router-dom"

export default function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      };
  return <>
  {/* <section className='bg-main-light p-5 ps-5'>
    <div className='footer-title border-bottom pb-4'>
        <h3>Get the FreshCart app</h3>
        <p>We will send you a link, open it on your phone to download the app.</p>
        <div className='d-flex '>
          <input type="email" className='form-control w-75 ms-3 me-5' name='email' placeholder='E-mail' />
          <button type='submit' className='btn bg-main text-white ms-3'>Share App Link</button>
        </div>
    </div>
    <div className="partners py-1 d-flex align-items-center justify-content-between border-bottom ">
      <div className='d-flex '>
      <span className='h5 me-4'>Payment Partners</span>
        <img  style={{height:"25px" , width:"30px" , marginRight:"5px"}} src={Amazone} alt="Payment Way" />
        <img style={{height:"25px", width:"30px"  , marginRight:"3px"}} src={MasterCard} alt="Payment Way" />
        <img  style={{height:"25px" , width:"30px"  , marginRight:"3px"}} src={Express} alt="Payment Way" />
        <img  style={{height:"25px" , width:"30px"  , marginRight:"3px"}} src={Paypal} alt="Payment Way" />
      </div>
      <div className=''>
        <span className='h5'>Get deliveries with FreshCart</span>
        <img  style={{height:"120px" , width:"120px" , marginRight:"5px"}} src={Google} alt="download Way" />
        <img style={{height:"35px", width:"130px"  , marginRight:"3px"}} src={Mac} alt="download Way" />
      </div>
    </div>
  </section> */}
<div class="container-fluid bg-grey mt-5 py-5">
        <div class="container pt-5">
            <div class="row g-5">
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase border-start border-5 border-success ps-3 mb-4">Get In Touch</h5>
                    <p class="mb-4">No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et dolor sed dolor</p>
                    <p class="mb-2"><i class="fa-solid fa-location-dot text-success me-3 h3"></i>123 Street, New York, USA</p>
                    <p class="mb-2"><i class="fa-regular fa-envelope text-success me-3 py-1 h3"></i>info@example.com</p>
                    <p class="mb-0"><i class="fa-solid fa-mobile-screen-button text-success me-3 py-1 h3"></i>+0100000</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase border-start border-5 border-success ps-3 mb-4">Quick Links</h5>
                    <div class="d-flex flex-column justify-content-start">
                        <Link class="text-body mb-2" to="/" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>Home</Link>
                        <Link class="text-body mb-2" to="/about" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>About Us</Link>
                        <Link class="text-body mb-2" to="/blog" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>Latest Blogs</Link>
                    </div>
                </div> 
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase border-start border-5 border-success ps-3 mb-4">Popular Links</h5>
                    <div class="d-flex flex-column justify-content-start">
                        <Link class="text-body mb-2" to="/" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>Home</Link>
                        <Link class="text-body mb-2" to="/about" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>About Us</Link>
                        <Link class="text-body mb-2" to="/adopt" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>Adopt</Link>
                        <Link class="text-body mb-2" to="/lost" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>Lost Animal</Link>
                        <Link class="text-body mb-2" to="/foster" onClick={scrollToTop}><i class="fa-solid fa-arrow-right text-success me-2"></i>Fosters</Link>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase border-start border-5 border-success ps-3 mb-4">Newsletter</h5>
                    <form action="">
                        <div class="input-group">
                            {/* <input type="text" class="form-control p-3" placeholder="Your Email"> */}
                            <Link  to="/register">     <button class="btn btn-success" onClick={scrollToTop}>Sign Up</button> </Link>
                        </div>
                    </form>
                    {/* <h6 class="text-uppercase mt-4 mb-3">Follow Us</h6> */}
                    {/* <div class="d-flex"> 
                        <a className="btn btn-outline-success btn-square me-2" to="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a className="btn btn-outline-success btn-square me-2" to="#"><i className="fa-brands fa-instagram"></i></a>
                        <a className="btn btn-outline-success btn-square" to="#"><i className="fa-brands fa-linkedin"></i></a>
                    </div> */}
                </div>
                {/* <div className="col-12 text-center text-body">
                    <a className="text-body" to="">Terms & Conditions</a>
                    <span className="mx-1">|</span>
                    <a className="text-body" to="">Privacy Policy</a>
                    <span className="mx-1">|</span>
                    <a className="text-body" to="">Customer Support</a>
                    <span className="mx-1">|</span>
                    <a className="text-body" to="">Payments</a>
                    <span className="mx-1">|</span>
                    <a className="text-body" to="">Help</a>
                    <span className="mx-1">|</span>
                    <a className="text-body" to="">FAQs</a>
                </div> */}
            </div>
        </div>
    </div>
    <div className="container-fluid bg-dark text-white-50 py-4">
        <div className="container">
            <div className="row g-5">
                <div className="col-md-6 text-center text-md-start">
                    <p className="mb-md-0">&copy; <a className="text-white" href="#">Pet Shelter</a>. All Rights Reserved.</p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                    <p className="mb-0">Designed by <a className="text-white">Helwan 2024</a></p>
                </div>
            </div>
        </div>
    </div>





  </>
}
