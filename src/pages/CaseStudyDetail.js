import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CaseStudyDetail = () => {
  const { id } = useParams();
  return (
    <div className="min-h-screen section-padding bg-black text-white">
      <div className="container-custom max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">Case Study #{id}</h1>
          <p className="text-gray-400 mt-3">A full write‑up is coming soon. In the meantime, browse our portfolio or contact us for details.</p>
        </div>
        <div className="flex justify-center gap-4">
          <Link to="/clients" className="btn-secondary">View all case studies</Link>
          <Link to="/contact" className="btn-primary">Talk to us</Link>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;