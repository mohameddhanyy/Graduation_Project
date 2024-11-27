import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams(); // Get the ID parameter from the URL

  useEffect(() => {
    axios.get('https://localhost:7195/api/Blog')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);
  
  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    // Scroll to the top of the page when the blog ID changes
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="container">
      <div className="border-start border-5 border-success ps-5 mb-5" style={{ maxWidth: '600px' }}>
        <h6 className="text-uppercase text-main">Blog</h6>
        <h1 className="g-small text-uppercase mb-0 fw-bold">Learn more about animals</h1>
      </div>

      <div className="row">
        {blogs.map(blog => (
          <div className="col-md-6 mb-4" key={blog.id}>
            <div className="card h-100 blog-card">
              <Link to={`/blog/${blog.id}`}>
                <img src={blog.image} className="card-img-top" alt={blog.subject} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{blog.subject}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogComponent;
