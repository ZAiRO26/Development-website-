import React, { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Code, Palette, Brain, Smartphone, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem, FadeUp, FloatingElement, Card3DReveal } from '../components/AnimatedSection';
import MagneticButton from '../components/MagneticButton';
import SplitText from '../components/SplitText';

// Lazy load 3D component for performance
const Hero3D = lazy(() => import('../components/Hero3D'));

const Home = () => {

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      desc: 'Stunning, responsive websites that convert visitors into customers',
      href: '/services/development',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      desc: 'Native and cross-platform mobile experiences',
      href: '/services/development',
    },
    {
      icon: Brain,
      title: 'AI Solutions',
      desc: 'Transform your business with cutting-edge AI integration',
      href: '/services/ai',
    },
    {
      icon: Code,
      title: 'Custom Software',
      desc: 'Tailored solutions built for your unique challenges',
      href: '/services/development',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      desc: 'Beautiful interfaces that users love to interact with',
      href: '/services/design',
    },
    {
      icon: Zap,
      title: 'Digital Strategy',
      desc: 'Data-driven strategies for digital transformation',
      href: '/services/ideation',
    },
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Speeding up Merck's process from 6 months to 6 hours",
      subtitle: "An AI Assistant that boosts R&D delivered in five weeks and under budget",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
      category: "R&D productivity",
      result: "99%",
      resultText: "Faster"
    },
    {
      id: 2,
      title: "60% more user engagement with hyper-personalization",
      subtitle: "AI PoC in under 6 weeks to test a hypothesis on hyper-localizing real estate content",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      category: "AI for real estate",
      result: "60%",
      resultText: "Engagement"
    },
    {
      id: 3,
      title: "Team extension for mobile design revamp at speed",
      subtitle: "Seamless and consistent experience, unified payment flows, and easier in-app navigation",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      category: "Mobile App Redesign",
      result: "2x",
      resultText: "Faster"
    },
  ];

  const teamMembers = [
    {
      name: "Ravi Saxena",
      role: "Owner",
      description: "Leads vision, strategy, and client success.",
      avatar: "/team-ravi.png"
    },
    {
      name: "Shikhar Saxena",
      role: "Marketing & Sales Head",
      description: "Drives growth, partnerships, and revenue.",
      avatar: "/team-shikhar.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Digital & Social Media Lead",
      description: "Owns content, social, and digital campaigns.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background-dark overflow-hidden">
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-background-dark via-purple-900/20 to-background-dark" />
          }>
            <Hero3D />
          </Suspense>
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/40 via-transparent to-background-dark/80" />
        </div>

        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="text-center max-w-5xl mx-auto">
            <FadeUp delay={0.2}>
              <h1 className="section-title-xl text-white mb-8">
                Your <span className="headline-serif-italic text-primary">Vision,</span>
                <br />
                <SplitText
                  className="headline-serif-bold"
                  splitBy="letter"
                  delay={0.3}
                  stagger={0.04}
                  animation="fadeUp"
                >
                  Engineered.
                </SplitText>
              </h1>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-body text-xl md:text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                We provide a complete suite of development and marketing services for industrial businesses. Let us handle the tech, so you can focus on growth.
              </p>
            </FadeUp>

            {/* CTA Buttons */}
            <FadeUp delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                <MagneticButton to="/contact" variant="cta">
                  Request a quote
                </MagneticButton>

                <Link
                  to="/services"
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-primary group-hover:shadow-glow-sm transition-all duration-300">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  <span className="font-medium">View Services</span>
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Trusted By Logo Marquee */}

        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Bento Grid Section */}
      <section className="section-padding bg-background-dark relative">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <p className="text-primary font-medium tracking-widest uppercase mb-4">What We Do</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Comprehensive <span className="text-primary">Digital Services</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="section-subtitle">
                From ideation to deployment, we provide end-to-end solutions that transform your digital presence.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          {/* Bento Grid */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.1}>
            {services.map((service, index) => (
              <Card3DReveal key={service.title}>
                <Link to={service.href}>
                  <motion.div
                    className="bento-card group cursor-pointer h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="icon-container mb-6 bg-primary/10 border border-primary/30">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      {service.desc}
                    </p>
                    <div className="mt-6 flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-medium">Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </motion.div>
                </Link>
              </Card3DReveal>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="section-padding gradient-navy-bg relative">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <p className="text-primary font-medium tracking-widest uppercase mb-4">Our Work</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Design, Engineering & <span className="text-primary">Applied AI</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="section-subtitle">
                See how we've helped industry leaders achieve exceptional results.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-3 gap-8" staggerChildren={0.15}>
            {caseStudies.map((study) => (
              <AnimatedItem key={study.id}>
                <motion.div
                  className="group cursor-pointer"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/90 via-background-dark/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full backdrop-blur-sm">
                        {study.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">{study.result}</p>
                        <p className="text-sm text-white/70">{study.resultText}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors mb-3 line-clamp-2">
                    {study.title}
                  </h3>
                  <p className="text-white/60 line-clamp-2">{study.subtitle}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedSection>

          <FadeUp delay={0.5}>
            <div className="text-center mt-12">
              <MagneticButton to="/clients" variant="secondary">
                View all case studies
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="section-padding bg-background-dark relative overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <FloatingElement className="absolute top-20 left-10" delay={0} amplitude={20}>
            <div className="w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
          </FloatingElement>
          <FloatingElement className="absolute bottom-20 right-10" delay={1} amplitude={15}>
            <div className="w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
          </FloatingElement>
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Meet our <span className="text-gradient">Team</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerChildren={0.2}>
            {teamMembers.map((member, index) => (
              <AnimatedItem key={index} direction="scale">
                <motion.div
                  className="glass-panel-hover p-8 h-full rounded-2xl group cursor-pointer"
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 25px 50px rgba(139, 92, 246, 0.15)'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center mb-6">
                    <motion.img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary/30 group-hover:border-primary transition-colors duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div>
                      <h4 className="font-bold text-white text-lg group-hover:text-primary transition-colors duration-300">{member.name}</h4>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary leading-relaxed">{member.description}</p>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-surface via-surface-light to-primary/20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(123,143,163,0.15)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <AnimatedItem>
              <h2 className="section-title text-text-primary mb-6">
                Ready to Build Something <br className="hidden md:block" />
                <span className="text-primary">Amazing?</span>
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
                Let's discuss your project and see how we can help you achieve your digital goals.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <MagneticButton to="/contact" variant="cta">
                Start Your Project Today
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </MagneticButton>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;