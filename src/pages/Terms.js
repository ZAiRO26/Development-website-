import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { FadeUp } from '../components/AnimatedSection';

const Terms = () => {
    return (
        <div className="min-h-screen bg-background-dark">
            {/* Hero Section */}
            <section className="mesh-bg pt-32 pb-16">
                <div className="container-custom">
                    <div className="text-center max-w-4xl mx-auto">
                        <FadeUp>
                            <div className="icon-container mx-auto mb-6">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                        </FadeUp>
                        <FadeUp delay={0.1}>
                            <h1 className="section-title text-white mb-4">Terms of Service</h1>
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
                        <h2 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
                        <p className="text-neutral-slate mb-6">
                            By accessing and using our services, you agree to be bound by these Terms of Service
                            and all applicable laws and regulations. If you do not agree with any of these terms,
                            you are prohibited from using or accessing our services.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">2. Use License</h2>
                        <p className="text-neutral-slate mb-6">
                            Permission is granted to temporarily access the materials on our website for personal,
                            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">3. Disclaimer</h2>
                        <p className="text-neutral-slate mb-6">
                            The materials on our website are provided on an 'as is' basis. We make no warranties,
                            expressed or implied, and hereby disclaim and negate all other warranties including,
                            without limitation, implied warranties or conditions of merchantability.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">4. Limitations</h2>
                        <p className="text-neutral-slate mb-6">
                            In no event shall CodeTazos or its suppliers be liable for any damages arising out
                            of the use or inability to use the materials on our website, even if we have been
                            notified of the possibility of such damage.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">5. Governing Law</h2>
                        <p className="text-neutral-slate mb-6">
                            These terms and conditions are governed by and construed in accordance with applicable
                            laws and you irrevocably submit to the exclusive jurisdiction of the courts.
                        </p>

                        <h2 className="text-2xl font-bold text-white mb-6">6. Contact</h2>
                        <p className="text-neutral-slate">
                            For any questions regarding these Terms of Service, please contact us at{' '}
                            <a href="mailto:legal@codetazos.com" className="text-accent-cyan hover:text-white transition-colors">
                                legal@codetazos.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
