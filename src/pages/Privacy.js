import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { FadeUp } from '../components/AnimatedSection';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background-dark">
            {/* Hero Section */}
            <section className="mesh-bg pt-32 pb-16">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto">
                        <FadeUp>
                            <div className="icon-container mx-auto mb-6">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <h1 className="section-title text-white mb-4">Privacy Policy</h1>
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
                        <h2 className="text-2xl font-bold text-white mb-6">1. Information We Collect</h2>
                        <p className="text-neutral-slate mb-6">
                            We collect information you provide directly to us, such as when you create an account,
                            make a purchase, or contact us for support. This may include your name, email address,
                            phone number, and any other information you choose to provide.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">2. How We Use Your Information</h2>
                        <p className="text-neutral-slate mb-6">
                            We use the information we collect to provide, maintain, and improve our services,
                            to process transactions and send related information, and to communicate with you
                            about products, services, and events.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">3. Information Sharing</h2>
                        <p className="text-neutral-slate mb-6">
                            We do not sell, trade, or otherwise transfer your personal information to third parties
                            without your consent, except as described in this policy or as required by law.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">4. Data Security</h2>
                        <p className="text-neutral-slate mb-6">
                            We implement appropriate technical and organizational measures to protect your personal
                            information against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">5. Your Rights</h2>
                        <p className="text-neutral-slate mb-6">
                            You have the right to access, correct, or delete your personal information.
                            You may also have the right to restrict or object to certain processing of your data.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">6. Contact Us</h2>
                        <p className="text-neutral-slate">
                            If you have any questions about this Privacy Policy, please contact us at{' '}
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

export default Privacy;
