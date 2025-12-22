import React from 'react';
import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { FadeUp } from '../components/AnimatedSection';

const Cookies = () => {
    return (
        <div className="min-h-screen bg-background-dark">
            {/* Hero Section */}
            <section className="mesh-bg pt-32 pb-16">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto">
                        <FadeUp>
                            <div className="icon-container mx-auto mb-6">
                                <Cookie className="w-6 h-6 text-white" />
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <h1 className="section-title text-white mb-4">Cookie Policy</h1>
                        </FadeUp>
                        <FadeUp delay={0.2}>
                            <p className="text-neutral-slate">Last updated: December 2024</p>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-background-dark">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        className="glass-panel p-8 md:p-12 prose prose-invert max-w-none"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">What Are Cookies</h2>
                        <p className="text-neutral-slate mb-6">
                            Cookies are small text files that are placed on your computer or mobile device when
                            you visit a website. They are widely used to make websites work more efficiently and
                            provide information to the owners of the site.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">How We Use Cookies</h2>
                        <p className="text-neutral-slate mb-6">
                            We use cookies for a variety of purposes including: keeping you signed in,
                            understanding how you use our website, and improving your experience.
                            We also use cookies to show you relevant content and advertisements.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">Types of Cookies We Use</h2>
                        <ul className="text-neutral-slate mb-6 space-y-2">
                            <li><strong className="text-white">Essential Cookies:</strong> Required for the website to function properly</li>
                            <li><strong className="text-white">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                            <li><strong className="text-white">Marketing Cookies:</strong> Used to track visitors across websites for advertising</li>
                            <li><strong className="text-white">Preference Cookies:</strong> Remember your settings and preferences</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-white mb-6">Managing Cookies</h2>
                        <p className="text-neutral-slate mb-6">
                            Most web browsers allow you to control cookies through their settings preferences.
                            However, limiting cookies may affect your experience on our website.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
                        <p className="text-neutral-slate">
                            If you have any questions about our Cookie Policy, please contact us at{' '}
                            <a href="mailto:privacy@codetazos.com" className="text-accent-cyan hover:text-white transition-colors">
                                privacy@codetazos.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Cookies;
