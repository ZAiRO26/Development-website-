import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Instagram, Youtube, ArrowUpRight, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'App Development', href: '/services/app-development' },
      { name: 'Social Media Marketing', href: '/services/social-media-marketing' },
      { name: 'Meta/Instagram Ads', href: '/services/meta-instagram-ads' },
      { name: 'Instagram Virtual Avatars', href: '/services/instagram-virtual-avatars' },
      { name: 'Virtual AI Product Photography', href: '/services/virtual-ai-product-photography' },
      { name: 'Shopping Websites / E-commerce', href: '/services/ecommerce' },
      { name: 'Idea to Go Live', href: '/services/idea-to-go-live' },
    ],
    industries: [
      { name: 'Finance', href: '/industries/finance' },
      { name: 'Commerce', href: '/industries/commerce' },
      { name: 'Healthcare', href: '/industries/healthcare' },
      { name: 'Education', href: '/industries/education' },
      { name: 'Proptech', href: '/industries/proptech' },
      { name: 'Greentech', href: '/industries/greentech' },
    ],
    about: [
      { name: 'How we work', href: '/about/how-we-work' },
      { name: 'Sustainability', href: '/about/sustainability' },
      { name: 'Working at FreekiWebsite', href: '/about/careers' },
      { name: 'Job opportunities', href: '/about/jobs' },
      { name: 'Contact us', href: '/contact' },
      { name: 'Press Office', href: '/about/press' },
    ],
    insights: [
      { name: 'Blog', href: '/insights/blog' },
      { name: 'Newsletters and originals', href: '/insights/newsletters' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/freekiwebsite', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/freekiwebsite', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/freekiwebsite', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/freekiwebsite', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/freekiwebsite', label: 'YouTube' },
  ];

  const FooterLinkItem = ({ link }) => (
    <motion.li whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Link
        to={link.href}
        className="text-neutral-slate hover:text-accent-cyan transition-colors text-sm flex items-center group"
      >
        <span>{link.name}</span>
        <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </motion.li>
  );

  return (
    <footer className="bg-background-dark text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-primary/20 rounded-full filter blur-[150px]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/10 rounded-full filter blur-[100px]" />
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container-custom py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl font-bold font-display mb-2">
                Stay ahead of the curve
              </h3>
              <p className="text-neutral-slate">
                Subscribe to our newsletter for industry insights and updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-slate" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:w-80 pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-slate focus:outline-none focus:border-accent-cyan transition-colors"
                />
              </div>
              <motion.button
                className="btn-cta whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-navy-secondary to-accent-cyan rounded-xl flex items-center justify-center shadow-glow-sm"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <span className="font-display font-bold text-white text-lg">F</span>
              </motion.div>
              <span className="font-display font-bold text-xl group-hover:text-accent-cyan transition-colors">
                FreekiWebsite
              </span>
            </Link>
            <p className="text-neutral-slate mb-8 max-w-sm leading-relaxed">
              We speed up AI adoption and ramp up engineering and design teams to help you lead your industry with world-class digital experiences.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-slate hover:text-accent-cyan hover:border-accent-cyan/50 hover:bg-accent-cyan/10 transition-all duration-300"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700"
                />
                <button type="submit" className="btn-secondary px-4 py-2">Subscribe</button>
              </form>
              <p className="text-xs text-gray-400 mt-2">We’ll send occasional updates. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <FooterLinkItem key={link.name} link={link} />
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">Industries</h3>
            <ul className="space-y-3">
              {footerLinks.industries.map((link) => (
                <FooterLinkItem key={link.name} link={link} />
              ))}
            </ul>
          </div>

          {/* About & Insights */}
          <div>
            <h3 className="font-display font-bold text-white mb-6">About us</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.about.map((link) => (
                <FooterLinkItem key={link.name} link={link} />
              ))}
            </ul>
            <h3 className="font-display font-bold text-white mb-6">Insights</h3>
            <ul className="space-y-3">
              {footerLinks.insights.map((link) => (
                <FooterLinkItem key={link.name} link={link} />
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-neutral-slate">
              <span>© 2024 FreekiWebsite. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-accent-cyan transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-accent-cyan transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-accent-cyan transition-colors">
                Cookie Policy
              </Link>
            </div>
            <div className="text-sm text-neutral-slate flex items-center gap-2">
              Made with
              <motion.span
                className="text-accent-cyan"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ❤️
              </motion.span>
              in India
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;