import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const BlogDetailsComponent = () => {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    axios.get(`https://localhost:7195/api/Blog/${id}`)
      .then(response => {
        setBlog(response.data);
      })
      .catch(error => {
        console.error('Error fetching blog details:', error);
      });
  }, [id]);
  useEffect(() => window.scrollTo(0, 0), []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  // Format the date without time
  const formattedDate = new Date(blog.bDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                       <div className="border-start border-5 border-success ps-5 mb-5" style={{'max-width': '600px'}}>
                <h6 className=" text-uppercase text-main">Blog</h6>
                <h1 className="h-5 text-uppercase mb-0 fw-bold">{blog.subject} </h1> </div>

      <div className="card border-0 shadow">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={blog.image} className="card-img-top" alt={blog.subject} style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{blog.subject}</h5>
              <p className="card-text" style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '1rem', maxHeight: expanded ? 'none' : '6em', overflow: 'hidden', textOverflow: 'ellipsis' }}>{blog.bDiscreption}</p>
              <div className='my-4'>
              {!expanded && (
                <button className="btn btn-primary mx-3  " onClick={toggleExpand}>Read More</button>
              )}
                              <Link to={`/Blog`} className="btn btn-primary ">Blog Details</Link>



              </div>

              <p className="card-text"><small className="text-muted">{formattedDate}</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsComponent;
