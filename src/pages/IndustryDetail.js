import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, TrendingUp, ShoppingCart, Heart, GraduationCap, Home, Leaf } from 'lucide-react';

const industriesData = {
  finance: {
    icon: TrendingUp,
    title: 'Finance',
    subtitle: 'Digital transformation for financial services and fintech leaders.',
    heroImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop',
    highlights: ['Fintech solutions', 'Payment systems', 'Risk & compliance'],
    features: [
      'Modern mobile/web products for banking and payments',
      'Secure integrations with KYC/AML and regulatory workflows',
      'Analytics, reporting, and forecasting dashboards',
      'Scalable cloud foundations and observability',
    ],
  },
  commerce: {
    icon: ShoppingCart,
    title: 'Commerce',
    subtitle: 'E‑commerce and retail experiences that convert and delight.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    highlights: ['Storefront UX', 'Omnichannel', 'Performance & SEO'],
    features: [
      'High‑converting storefronts and product catalogs',
      'Checkout, payments, logistics, and invoicing',
      'Site speed optimization and SEO best practices',
      'Customer analytics and lifecycle tactics',
    ],
  },
  healthcare: {
    icon: Heart,
    title: 'Healthcare',
    subtitle: 'Digital health solutions built for safety, speed, and scale.',
    heroImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&h=600&fit=crop',
    highlights: ['Telemedicine', 'Patient apps', 'Compliance'],
    features: [
      'HIPAA‑aware patient portals and telemedicine platforms',
      'Medical device connectivity and secure data flows',
      'Scheduling, billing, and care‑team collaboration tools',
      'Monitoring, analytics, and audit trails',
    ],
  },
  education: {
    icon: GraduationCap,
    title: 'Education',
    subtitle: 'Learning platforms and tools that empower educators and students.',
    heroImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop',
    highlights: ['LMS', 'Content pipelines', 'Engagement'],
    features: [
      'Learning management systems and classroom apps',
      'Content creation, curation, and personalization',
      'Assessment workflows and progress tracking',
      'Accessibility and multi‑device experiences',
    ],
  },
  proptech: {
    icon: Home,
    title: 'Proptech',
    subtitle: 'Property technology solutions for search, transactions, and operations.',
    heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
    highlights: ['Listings & search', 'Payments', 'Owner ops'],
    features: [
      'Property search UX with geospatial and rich media',
      'Unified payments and booking pipelines',
      'Owner and tenant portals with role‑based access',
      'Data pipelines for valuation and forecasting',
    ],
  },
  greentech: {
    icon: Leaf,
    title: 'Greentech',
    subtitle: 'Sustainable tech solutions for energy, climate, and operations.',
    heroImage: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48b84?w=1200&h=600&fit=crop',
    highlights: ['Sensors & data', 'Optimization', 'Reporting'],
    features: [
      'IoT sensors, telemetry, and dashboards',
      'Optimization algorithms for energy usage and routing',
      'Compliance reporting and stakeholder visualizations',
      'Scalable cloud data stores and APIs',
    ],
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const IndustryDetail = () => {
  const { slug } = useParams();
  const ind = industriesData[slug];

  if (!ind) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-3xl font-bold">Industry not found</h1>
        <p className="text-gray-400 mt-2">Please check the URL or browse all industries.</p>
        <Link to="/industries" className="btn-primary mt-6 inline-block">Back to Industries</Link>
      </div>
    );
  }

  const Icon = ind.icon;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section className="section-padding bg-gradient-to-br from-gray-900 to-black" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mx-auto w-16 h-16 bg-black rounded-xl flex items-center justify-center border border-gray-800 mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <motion.h1 className="text-5xl md:text-6xl font-bold text-white mb-4" variants={fadeInUp}>{ind.title}</motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-300" variants={fadeInUp}>{ind.subtitle}</motion.p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {ind.highlights.map((h) => (
                <span key={h} className="px-3 py-1 rounded-full border border-gray-800 text-gray-300 bg-black">{h}</span>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
                <span>Talk to us</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feature Grid */}
      <section className="section-padding bg-black">
        <div className="container-custom">
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {ind.features.map((f, idx) => (
              <motion.div key={idx} className="bg-gray-900 rounded-xl p-6 border border-gray-800" variants={fadeInUp}>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white" />
                  <p className="text-gray-300">{f}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visual Banner */}
      <section className="relative">
        <img src={ind.heroImage} alt={ind.title} className="w-full h-[360px] object-cover opacity-70" />
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let’s build for {ind.title.toLowerCase()}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Book a discovery call to outline a plan, timeline, and measurable outcomes.</p>
          <Link to="/contact" className="btn-secondary bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">Start a project</Link>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;