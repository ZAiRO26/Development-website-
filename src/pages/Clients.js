import React from 'react';
import { ArrowRight, Star, Clock, Users, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection, { AnimatedItem, FadeUp } from '../components/AnimatedSection';
import MagneticButton from '../components/MagneticButton';
import LogoMarquee from '../components/LogoMarquee';

const Clients = () => {
  const featuredCaseStudies = [
    {
      id: 1,
      title: "Speeding up Merck's process from 6 months to 6 hours",
      subtitle: "An AI Assistant that boosts R&D delivered in five weeks and under budget",
      category: "R&D productivity",
      company: "Merck",
      industry: "Healthcare",
      duration: "5 weeks",
      team: "8 people",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
      results: ["99% faster process", "Under budget", "Improved efficiency"]
    },
    {
      id: 2,
      title: "60% more user engagement with hyper-personalization",
      subtitle: "AI PoC in under 6 weeks to test a hypothesis on hyper-localizing real estate content",
      category: "AI for real estate",
      company: "Keller Williams",
      industry: "Proptech",
      duration: "6 weeks",
      team: "6 people",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      results: ["60% more engagement", "Faster localization", "Better UX"]
    },
    {
      id: 3,
      title: "Team extension for mobile design revamp at speed",
      subtitle: "Seamless experience, unified payment flows, and easier navigation",
      category: "Mobile App Redesign",
      company: "Careem",
      industry: "Transportation",
      duration: "12 weeks",
      team: "12 people",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      results: ["Improved UX", "Unified payments", "Enhanced navigation"]
    }
  ];

  const clientLogos = [
    { name: 'Microsoft', text: 'MICROSOFT' },
    { name: 'Google', text: 'GOOGLE' },
    { name: 'Amazon', text: 'AMAZON' },
    { name: 'Netflix', text: 'NETFLIX' },
    { name: 'Spotify', text: 'SPOTIFY' },
    { name: 'Uber', text: 'UBER' },
  ];

  const testimonials = [
    {
      name: "Mark Greiner",
      role: "Digital Innovation Manager",
      company: "Merck",
      quote: "Excellence and speed. It's rare to get both, and CodeTazos delivers.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Adi Pavlovic",
      role: "Director of Innovation",
      company: "Keller Williams",
      quote: "CodeTazos has been the best agency we've worked with so far.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Dally Singh",
      role: "Chief Product Officer",
      company: "Total Processing",
      quote: "It doesn't feel like an external team, it feels like we're just working together.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
    }
  ];

  const stats = [
    { value: "500+", label: "Projects Completed" },
    { value: "50+", label: "Fortune 500 Clients" },
    { value: "95%", label: "Client Satisfaction" },
    { value: "15+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Hero Section */}
      <section className="mesh-bg pt-32 pb-20 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <FadeUp>
              <p className="text-accent-cyan font-medium tracking-widest uppercase mb-6">
                Success Stories
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="section-title text-white mb-6 leading-tight">
                Our <span className="gradient-text">Clients</span>
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-xl text-neutral-slate max-w-3xl mx-auto leading-relaxed">
                Discover how we've helped companies across industries achieve remarkable results through innovative digital solutions.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding gradient-navy-bg">
        <div className="container-custom">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-8" staggerChildren={0.1}>
            {stats.map((stat, index) => (
              <AnimatedItem key={index}>
                <div className="text-center">
                  <motion.p
                    className="stat-value mb-2"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-neutral-slate font-medium">{stat.label}</p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <section className="py-16 bg-background-dark">
        <div className="container-custom">
          <p className="text-center text-sm text-neutral-slate uppercase tracking-widest mb-8 font-medium">
            Trusted by industry leaders
          </p>
          <LogoMarquee logos={clientLogos} speed={30} />
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="section-padding bg-background-dark">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <p className="text-accent-cyan font-medium tracking-widest uppercase mb-4">Case Studies</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Featured <span className="gradient-text">Projects</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <div className="space-y-20">
            {featuredCaseStudies.map((study, index) => (
              <AnimatedSection key={study.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <AnimatedItem className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent" />
                    <div className="absolute bottom-6 left-6">
                      <span className="inline-block px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-sm font-medium rounded-full backdrop-blur-sm">
                        {study.category}
                      </span>
                    </div>
                  </motion.div>
                </AnimatedItem>

                <AnimatedItem className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-3">{study.title}</h3>
                    <p className="text-lg text-neutral-slate">{study.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-panel p-4">
                      <p className="font-bold text-white">{study.company}</p>
                      <p className="text-sm text-neutral-slate">{study.industry}</p>
                    </div>
                    <div className="glass-panel p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-accent-cyan" />
                        <p className="font-bold text-white">{study.duration}</p>
                      </div>
                      <p className="text-sm text-neutral-slate">Duration</p>
                    </div>
                    <div className="glass-panel p-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent-cyan" />
                        <p className="font-bold text-white">{study.team}</p>
                      </div>
                      <p className="text-sm text-neutral-slate">Team size</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-3">Key Results:</h4>
                    <ul className="space-y-2">
                      {study.results.map((result, idx) => (
                        <li key={idx} className="flex items-center text-white/80">
                          <CheckCircle2 className="w-4 h-4 text-accent-cyan mr-3 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <MagneticButton to={`/clients/case-study/${study.id}`} variant="cta">
                    Read full case study
                    <ArrowRight className="inline-block ml-2 w-4 h-4" />
                  </MagneticButton>
                </AnimatedItem>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding mesh-bg">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <AnimatedItem>
              <p className="text-accent-cyan font-medium tracking-widest uppercase mb-4">Testimonials</p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Client <span className="gradient-text">Feedback</span>
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerChildren={0.15}>
            {testimonials.map((testimonial, index) => (
              <AnimatedItem key={index}>
                <motion.div
                  className="glass-panel-hover p-8 h-full"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-accent-cyan/30"
                    />
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-neutral-slate">{testimonial.role}</p>
                      <p className="text-sm font-medium text-accent-cyan">{testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-navy-primary via-navy-secondary to-accent-cyan relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
        </div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center">
            <AnimatedItem>
              <h2 className="section-title text-white mb-6">
                Ready to Join Our <span className="text-gradient">Success Stories</span>?
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                Let's discuss how we can help you achieve similar results for your business.
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <MagneticButton to="/contact" className="bg-white text-navy-primary hover:bg-white/90">
                Start Your Project
                <ArrowRight className="inline-block ml-2 w-4 h-4" />
              </MagneticButton>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Clients;