import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen section-padding bg-black text-white text-center">
      <div className="container-custom max-w-2xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8">The page you’re looking for doesn’t exist or may have moved.</p>
        <div className="flex justify-center gap-4">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/contact" className="btn-secondary">Get in touch</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;