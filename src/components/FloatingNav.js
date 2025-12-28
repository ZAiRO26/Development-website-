import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FloatingNav - HUD-style navigation inspired by hki.paris/xp
 * Elements float in corners, maximizing screen real estate
 */
const FloatingNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const mainLinks = [
        { name: 'Services', href: '/services' },
        { name: 'Industries', href: '/industries' },
        { name: 'Clients', href: '/clients' },
        { name: 'About', href: '/about' },
        { name: 'Insights', href: '/insights' },
        { name: 'Contact', href: '/contact' },
    ];

    const handleLogoClick = (e) => {
        if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95 },
        open: { opacity: 1, scale: 1 }
    };

    return (
        <>
            {/* Top Left: Logo */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="fixed top-6 left-6 z-50"
            >
                <Link
                    to="/"
                    onClick={handleLogoClick}
                    className="group flex items-center space-x-3"
                >
                    <motion.div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                    >
                        <span className="font-bold text-white text-xl">C</span>
                    </motion.div>
                    <span className="text-xl font-medium text-white opacity-80 group-hover:opacity-100 transition-opacity hidden sm:block">
                        CodeTazos
                    </span>
                </Link>
            </motion.div>

            {/* Top Right: Menu Trigger */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="fixed top-6 right-6 z-50"
            >
                <motion.button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
            </motion.div>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-40 backdrop-blur-xl bg-black/90 flex items-center justify-center"
                    >
                        <nav className="flex flex-col items-center space-y-6">
                            {mainLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <Link
                                        to={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`text-4xl md:text-6xl font-light tracking-tight transition-all
                                            ${location.pathname.startsWith(link.href)
                                                ? 'text-white'
                                                : 'text-white/50 hover:text-white hover:translate-x-2'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* CTA at bottom of menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2"
                        >
                            <Link
                                to="/contact"
                                onClick={() => setIsMenuOpen(false)}
                                className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity"
                            >
                                Get in Touch
                            </Link>
                        </motion.div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        </>
    );
};

export default FloatingNav;
