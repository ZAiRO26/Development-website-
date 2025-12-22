import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      const scrollThreshold = 50;

      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (isOpen) {
        setShowNav(true);
        return;
      }

      if (window.scrollY > lastScrollY && window.scrollY > 200) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isOpen]);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMouseEnter = (dropdown) => {
    clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  const servicesItems = [
    { name: 'All Products', href: '/services/products', highlight: true },
    { name: 'Ideation', href: '/services/ideation' },
    { name: 'Software Development', href: '/services/development' },
    { name: 'Design', href: '/services/design' },
    { name: 'Generative AI and Data', href: '/services/ai' },
    { name: 'Maintenance', href: '/services/maintenance' },
    { name: 'Cooperation Models', href: '/services/cooperation' },
  ];

  const industriesItems = [
    { name: 'Finance', href: '/industries/finance' },
    { name: 'Commerce', href: '/industries/commerce' },
    { name: 'Healthcare', href: '/industries/healthcare' },
    { name: 'Education', href: '/industries/education' },
    { name: 'Proptech', href: '/industries/proptech' },
    { name: 'Greentech', href: '/industries/greentech' },
  ];

  const clientsItems = [
    { name: 'Case studies', href: '/clients/case-studies' },
    { name: 'Other projects', href: '/clients/projects' },
  ];

  const aboutItems = [
    { name: 'How we work', href: '/about/how-we-work' },
    { name: 'Sustainability', href: '/about/sustainability' },
    { name: 'Working at CodeTazos', href: '/about/careers' },
    { name: 'Job opportunities', href: '/about/jobs' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Press Office', href: '/about/press' },
    { name: 'Refer CodeTazos', href: '/about/refer' },
  ];

  const insightsItems = [
    { name: 'Latest News', href: '/latest-news', highlight: true },
    { name: 'Blog', href: '/insights/blog' },
    { name: 'Newsletters and originals', href: '/insights/newsletters' },
    { name: 'Packages', href: '/insights/packages', highlight: true },
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const NavDropdown = ({ items, isActive }) => (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
          className="absolute top-full left-0 mt-2 w-72 p-2 z-50 rounded-2xl backdrop-blur-xl border shadow-lg bg-black/80 border-white/10"
        >
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-4 py-3 text-sm rounded-lg transition-all duration-200 text-white/80 hover:text-white hover:bg-white/5"
              onClick={() => setActiveDropdown(null)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: showNav ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled || isOpen
        ? 'bg-black/90 backdrop-blur-xl shadow-lg border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="container-custom">
        <div className="flex items-center h-20">
          {/* Left: Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link to="/" className="flex items-center space-x-3 group" onClick={handleLogoClick}>
              <motion.div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-navy-secondary to-accent-cyan"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-display font-bold text-white text-lg">C</span>
              </motion.div>
              <span className="logo-font text-xl transition-colors duration-300 text-white group-hover:text-accent-cyan">
                CodeTazos
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-1">
            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('services')} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center space-x-1 px-4 py-2 transition-colors rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                <span className="font-medium">Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={servicesItems} isActive={activeDropdown === 'services'} />
            </div>

            {/* Industries Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('industries')} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center space-x-1 px-4 py-2 transition-colors rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                <span className="font-medium">Industries</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'industries' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={industriesItems} isActive={activeDropdown === 'industries'} />
            </div>

            {/* Clients Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('clients')} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center space-x-1 px-4 py-2 transition-colors rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                <span className="font-medium">Clients</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'clients' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={clientsItems} isActive={activeDropdown === 'clients'} />
            </div>

            {/* About Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('about')} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center space-x-1 px-4 py-2 transition-colors rounded-lg whitespace-nowrap text-white/80 hover:text-white hover:bg-white/5">
                <span className="font-medium">About us</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={aboutItems} isActive={activeDropdown === 'about'} />
            </div>

            {/* Insights Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('insights')} onMouseLeave={handleMouseLeave}>
              <button className="flex items-center space-x-1 px-4 py-2 transition-colors rounded-lg text-white/80 hover:text-white hover:bg-white/5">
                <span className="font-medium">Insights</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'insights' ? 'rotate-180' : ''}`} />
              </button>
              <NavDropdown items={insightsItems} isActive={activeDropdown === 'insights'} />
            </div>
          </div>

          {/* Right: Theme Toggle + CTA Button (Desktop) + Mobile Menu Button */}
          <div className="flex-1 flex items-center justify-end space-x-3">


            <div className="hidden lg:block">
              <Link
                to="/contact"
                className="btn-get-in-touch inline-flex items-center space-x-2"
              >
                <span>Get in touch</span>
              </Link>
            </div>
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors bg-white/5 text-white hover:bg-white/10"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="py-4 space-y-1 border-t border-white/10">
                {/* Services Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <span>Services</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'services' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'services' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 overflow-hidden"
                      >
                        {servicesItems.map((item, idx) => (
                          <Link key={idx} to={item.href} className={`block px-4 py-2 rounded-lg text-sm transition-colors ${item.highlight ? 'text-primary font-medium' : 'text-white/60'} hover:text-white hover:bg-white/5`} onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Industries Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'industries' ? null : 'industries')}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <span>Industries</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'industries' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'industries' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 overflow-hidden"
                      >
                        {industriesItems.map((item, idx) => (
                          <Link key={idx} to={item.href} className="block px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Clients Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'clients' ? null : 'clients')}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <span>Clients</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'clients' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'clients' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 overflow-hidden"
                      >
                        {clientsItems.map((item, idx) => (
                          <Link key={idx} to={item.href} className="block px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'about' ? null : 'about')}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <span>About us</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'about' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'about' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 overflow-hidden"
                      >
                        {aboutItems.map((item, idx) => (
                          <Link key={idx} to={item.href} className="block px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors" onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Insights Accordion */}
                <div>
                  <button
                    onClick={() => setMobileAccordion(mobileAccordion === 'insights' ? null : 'insights')}
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors text-white/80 hover:text-white hover:bg-white/5"
                  >
                    <span>Insights</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileAccordion === 'insights' ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileAccordion === 'insights' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-1 overflow-hidden"
                      >
                        {insightsItems.map((item, idx) => (
                          <Link key={idx} to={item.href} className={`block px-4 py-2 rounded-lg text-sm transition-colors ${item.highlight ? 'text-primary font-medium' : 'text-white/60'} hover:text-white hover:bg-white/5`} onClick={() => setIsOpen(false)}>
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <Link to="/contact" className="btn-cta block text-center" onClick={() => setIsOpen(false)}>Get in touch</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;