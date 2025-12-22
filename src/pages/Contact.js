import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Briefcase, Users, Megaphone, ChevronDown, ArrowRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection, { AnimatedItem, FadeUp } from '../components/AnimatedSection';
import MagneticButton from '../components/MagneticButton';

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const offices = [
    {
      city: "New York",
      country: "United States",
      address: "350 Fifth Avenue, Suite 4800",
      phone: "+1 212 555 0123",
      email: "newyork@codetazos.com",
      hours: "9 AM - 6 PM EST",
    },
    {
      city: "London",
      country: "United Kingdom",
      address: "1 Canada Square, Canary Wharf",
      phone: "+44 20 7946 0958",
      email: "london@codetazos.com",
      hours: "9 AM - 5 PM GMT",
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "1 Raffles Place, Tower 2",
      phone: "+65 6123 4567",
      email: "singapore@codetazos.com",
      hours: "9 AM - 6 PM SGT",
    }
  ];

  const contactMethods = [
    {
      icon: Briefcase,
      title: "Business Inquiries",
      description: "Let's talk about your project and how we can help you grow.",
      contact: "hello@codetazos.com",
      link: "mailto:hello@codetazos.com",
    },
    {
      icon: Users,
      title: "Careers",
      description: "Join our team of talented professionals and shape the future.",
      contact: "careers@codetazos.com",
      link: "mailto:careers@codetazos.com",
    },
    {
      icon: Megaphone,
      title: "Media & Press",
      description: "For all media inquiries, please get in touch with our team.",
      contact: "press@codetazos.com",
      link: "mailto:press@codetazos.com",
    }
  ];

  const faqs = [
    {
      question: "What kind of services do you offer?",
      answer: "We offer a wide range of services including web development, mobile app development, product design, AI solutions, and digital consulting. We work with companies of all sizes, from startups to large enterprises."
    },
    {
      question: "How does the project process work?",
      answer: "Our process is collaborative and transparent. We start with a discovery phase to understand your needs, followed by design, development, and testing. We use agile methodologies to ensure we deliver value quickly and efficiently."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We are technology-agnostic but have deep expertise in modern frameworks like React, Next.js, Node.js, and Python. We choose the best tools for the job to ensure your project is scalable, secure, and high-performing."
    },
    {
      question: "How much does it cost to work with you?",
      answer: "The cost depends on the project scope and complexity. We offer flexible engagement models, including fixed-price projects and dedicated teams. Contact us for a detailed proposal tailored to your needs."
    }
  ];

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="mesh-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px]"
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <FadeUp>
              <p className="text-primary font-medium tracking-widest uppercase mb-6">
                Get In Touch
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="section-title text-white mb-6 leading-tight">
                Contact <span className="text-primary">Us</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                We're here to help. Reach out to us for any business inquiries, career opportunities, or media requests.
              </p>
            </FadeUp>
          </div>

          {/* Contact Methods */}
          <AnimatedSection className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerChildren={0.1}>
            {contactMethods.map((method, index) => (
              <AnimatedItem key={index}>
                <motion.a
                  href={method.link}
                  className="block bento-card text-center h-full group"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="icon-container mx-auto mb-6 bg-primary/10 border border-primary/30">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-white/60 mb-4">{method.description}</p>
                  <p className="text-primary font-medium">{method.contact}</p>
                </motion.a>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-background-dark">
        <div className="container-custom max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <AnimatedItem>
              <p className="text-primary font-medium tracking-widest uppercase mb-4">Send a Message</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-4">
                Start Your <span className="text-primary">Project</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-white/60">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatePresence mode="wait">
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-panel p-12 text-center"
              >
                <motion.div
                  className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Send className="w-8 h-8 text-black" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-4">Thank you!</h3>
                <p className="text-white/60 mb-8">
                  Your message has been sent successfully. We will be in touch shortly.
                </p>
                <MagneticButton onClick={() => setFormSubmitted(false)} variant="secondary">
                  Send another message
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="glass-panel p-8 md:p-12 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white mb-2">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white mb-2">How can we help you?</label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="" className="bg-background-dark">Select a service</option>
                    <option value="ai" className="bg-background-dark">AI Solutions</option>
                    <option value="design" className="bg-background-dark">UI/UX Design</option>
                    <option value="web" className="bg-background-dark">Web Development</option>
                    <option value="mobile" className="bg-background-dark">Mobile Development</option>
                    <option value="consulting" className="bg-background-dark">Digital Consulting</option>
                    <option value="other" className="bg-background-dark">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">Estimated Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  >
                    <option value="" className="bg-background-dark">Select a budget range</option>
                    <option value="25-50" className="bg-background-dark">$25k - $50k</option>
                    <option value="50-100" className="bg-background-dark">$50k - $100k</option>
                    <option value="100-200" className="bg-background-dark">$100k - $200k</option>
                    <option value="200+" className="bg-background-dark">$200k+</option>
                    <option value="unsure" className="bg-background-dark">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 bg-surface border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <div className="text-center pt-4">
                  <MagneticButton variant="cta">
                    Send Message
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Offices Section */}
      <section className="section-padding gradient-navy-bg">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <p className="text-primary font-medium tracking-widest uppercase mb-4">Global Presence</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Our <span className="text-primary">Offices</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerChildren={0.1}>
            {offices.map((office, index) => (
              <AnimatedItem key={index}>
                <motion.div
                  className="glass-panel p-8 h-full"
                  whileHover={{ y: -5, boxShadow: '0 0 40px rgba(252, 218, 105, 0.2)' }}
                >
                  <h3 className="text-2xl font-bold text-white mb-1">{office.city}</h3>
                  <p className="text-primary mb-6">{office.country}</p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-white/60">{office.address}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-white/60">{office.phone}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-white/60">{office.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-white/60">{office.hours}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-background-dark">
        <div className="container-custom max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <p className="text-primary font-medium tracking-widest uppercase mb-4">FAQ</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="space-y-4" staggerChildren={0.1}>
            {faqs.map((faq, index) => (
              <AnimatedItem key={index}>
                <motion.div
                  className="glass-panel overflow-hidden"
                  whileHover={{ borderColor: 'rgba(252, 218, 105, 0.3)' }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 flex justify-between items-center text-left"
                  >
                    <span className="font-bold text-white pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-6 pb-6 text-white/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-padding bg-gradient-to-br from-surface via-surface-light to-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(123,143,163,0.15)_0%,_transparent_50%)]" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <AnimatedItem>
              <h2 className="section-title text-text-primary mb-6">
                Have a Project in Mind?{' '}
                <span className="text-primary">Let's Talk.</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                We're always excited to hear about new ideas and challenges.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton variant="cta">
                  Get a Free Consultation
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </MagneticButton>
                <MagneticButton to="/services" variant="secondary">
                  Explore Services
                </MagneticButton>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;