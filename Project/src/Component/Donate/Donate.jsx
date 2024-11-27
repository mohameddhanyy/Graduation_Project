import React from 'react'
import '../Donate/Donate.module.css';
import {Link} from "react-router-dom"

export default function Donate() {



  return (
    <div>
    <div className="container-fluid py-5">
        <div className="container">
            <div className="border-start border-5 border-success ps-5 mb-5" style={{'max-width': '600px'}}>
                <h6 className=" text-uppercase text-main">Donate</h6>
                <h1 className="display-5 text-uppercase mb-0 fw-bold">Better life for innocent pets . . .</h1>
            </div>
            <div className="row g-5">
                <div className="col-lg-4">
                    <div className="bg-grey text-center pt-5 mt-lg-5">
                        <h2 className="text-uppercase fw-bold">Basic</h2>
                        <h6 className="text-grey mb-5">Good Choice</h6>
                        <div className="text-center bg-main p-4 mb-2">
                            <h1 className="display-4 text-white mb-0 fw-bold">
                                <small className="align-top"  style={{'font-size': '22px', 'line-height': '45px' }}
                                     >$</small>49<small
                                    className="align-bottom" style={{'font-size': '16px', 'line-height': '40px '}}>
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
                                style={{'font-size': '22px', 'line-height': '45px '}}
                                    >$</small>99<small
                                    className="align-bottom" style={{'font-size': '16px', 'line-height': '40px '}} >
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
                                style={{'font-size': '22px', 'line-height': '45px '}}
                                    >$</small>149<small
                                    className="align-bottom" style={{'font-size': '40px', 'line-height': '16px '}}>
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
  )
}
