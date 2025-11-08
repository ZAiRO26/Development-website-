import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Code, Megaphone, Target, Camera, ShoppingCart, Users, Lightbulb } from 'lucide-react';

const servicesData = {
  'app-development': {
    icon: Code,
    title: 'App Development',
    subtitle: 'Custom mobile and web applications engineered for performance and scale.',
    heroImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
    highlights: ['iOS/Android + Responsive Web', 'Robust APIs & Integrations', 'Cloud-native architectures'],
    features: [
      'Product discovery, UX, and technical scoping',
      'Modern stacks (React, Node.js) with best practices',
      'Automated testing, CI/CD, and observability',
      'Security-first development and compliance guidance',
    ],
  },
  'social-media-marketing': {
    icon: Megaphone,
    title: 'Social Media Marketing',
    subtitle: 'Content and account management designed to grow industrial brands.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    highlights: ['Account setup & daily ops', 'Content creation & scheduling', 'Analytics & growth'],
    features: [
      'Editorial calendars and brand voice guidelines',
      'Community management and engagement workflows',
      'Hashtag, SEO, and audience research',
      'Monthly reporting with actionable insights',
    ],
  },
  'meta-instagram-ads': {
    icon: Target,
    title: 'Meta/Instagram Ads',
    subtitle: 'Targeted campaigns focusing on qualified leads and conversions.',
    heroImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=600&fit=crop',
    highlights: ['Audience targeting', 'Creative testing', 'Conversion tracking'],
    features: [
      'Pixel setup, events, and lookalike audiences',
      'Creative production, A/B tests, and budget optimization',
      'Performance dashboards with cohort analysis',
      'Safety checks and policy compliance',
    ],
  },
  'instagram-virtual-avatars': {
    icon: Users,
    title: 'Instagram Virtual Avatars',
    subtitle: 'Engaging digital personas for campaigns and storytelling.',
    heroImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop',
    highlights: ['Concept & design', 'Content pipelines', 'Brand safety'],
    features: [
      'Avatar identity, behavior scripts, and voice tone',
      'Scheduling pipelines with measurable KPIs',
      'Compliance, approvals, and governance',
      'Ongoing performance tracking and iteration',
    ],
  },
  'virtual-ai-product-photography': {
    icon: Camera,
    title: 'Virtual AI Product Photography',
    subtitle: 'Studio-grade product imagery generated and enhanced with AI.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop',
    highlights: ['Lighting presets', 'Bulk pipelines', 'Brand consistency'],
    features: [
      'Background removal, relighting, and styling presets',
      'Prompt engineering and quality assurance',
      'High-volume image processing with automation',
      'Brand guideline adherence across assets',
    ],
  },
  ecommerce: {
    icon: ShoppingCart,
    title: 'Shopping Websites / E‑commerce',
    subtitle: 'High‑converting storefronts tailored to industrial buyers.',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
    highlights: ['Storefront UX', 'Payments & logistics', 'SEO & performance'],
    features: [
      'Catalogs, variants, pricing, and invoicing',
      'Checkout, payment gateways, and shipping integrations',
      'Site speed optimization and search visibility',
      'Analytics setup and growth tactics',
    ],
  },
  'idea-to-go-live': {
    icon: Lightbulb,
    title: 'Idea to Go Live',
    subtitle: 'Consulting and delivery from concept to launch.',
    heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    highlights: ['Discovery', 'Roadmaps', 'Governance'],
    features: [
      'Workshops to shape MVP and priorities',
      'Delivery planning and vendor coordination',
      'Risk management and stakeholder comms',
      'Launch readiness and post‑launch support',
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

const ServiceDetail = () => {
  const { slug } = useParams();
  const svc = servicesData[slug];

  if (!svc) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <p className="text-gray-400 mt-2">Please check the URL or browse all services.</p>
        <Link to="/services" className="btn-primary mt-6 inline-block">Back to Services</Link>
      </div>
    );
  }

  const Icon = svc.icon;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <motion.section className="section-padding bg-gradient-to-br from-gray-900 to-black" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mx-auto w-16 h-16 bg-black rounded-xl flex items-center justify-center border border-gray-800 mb-4">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <motion.h1 className="text-5xl md:text-6xl font-bold text-white mb-4" variants={fadeInUp}>{svc.title}</motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-300" variants={fadeInUp}>{svc.subtitle}</motion.p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {svc.highlights.map((h) => (
                <span key={h} className="px-3 py-1 rounded-full border border-gray-800 text-gray-300 bg-black">{h}</span>
              ))}
            </div>
            <div className="mt-8">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
                <span>Request a quote</span>
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
            {svc.features.map((f, idx) => (
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
        <img src={svc.heroImage} alt={svc.title} className="w-full h-[360px] object-cover opacity-70" />
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Let’s elevate your {svc.title.toLowerCase()}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Speak with our experts to plan a tailored engagement and timeline.</p>
          <Link to="/contact" className="btn-secondary bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">Start a project</Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;