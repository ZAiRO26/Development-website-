import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Performance-optimized animated section with stagger
const AnimatedSection = ({
    children,
    className = '',
    delay = 0,
    staggerChildren = 0.1,
    once = true,
    amount = 0.2
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: delay,
                staggerChildren: staggerChildren,
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
        >
            {children}
        </motion.div>
    );
};

// Individual animated item with direction support
export const AnimatedItem = ({
    children,
    className = '',
    direction = 'up' // 'up', 'down', 'left', 'right', 'fade', 'scale', 'rotate'
}) => {
    const getInitial = () => {
        switch (direction) {
            case 'up':
                return { opacity: 0, y: 40 };
            case 'down':
                return { opacity: 0, y: -40 };
            case 'left':
                return { opacity: 0, x: 40 };
            case 'right':
                return { opacity: 0, x: -40 };
            case 'scale':
                return { opacity: 0, scale: 0.8 };
            case 'rotate':
                return { opacity: 0, rotate: -10, scale: 0.9 };
            case 'fade':
            default:
                return { opacity: 0 };
        }
    };

    const getAnimate = () => {
        switch (direction) {
            case 'up':
            case 'down':
                return { opacity: 1, y: 0 };
            case 'left':
            case 'right':
                return { opacity: 1, x: 0 };
            case 'scale':
                return { opacity: 1, scale: 1 };
            case 'rotate':
                return { opacity: 1, rotate: 0, scale: 1 };
            case 'fade':
            default:
                return { opacity: 1 };
        }
    };

    const itemVariants = {
        hidden: getInitial(),
        visible: {
            ...getAnimate(),
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
            },
        },
    };

    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
};

// Standalone fade-up animation with spring physics
export const FadeUp = ({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    once = true
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            {children}
        </motion.div>
    );
};

// Enhanced fade with scale effect
export const FadeScale = ({
    children,
    className = '',
    delay = 0,
    once = true
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};

// Slide in from side
export const SlideIn = ({
    children,
    className = '',
    direction = 'left',
    delay = 0,
    once = true
}) => {
    const x = direction === 'left' ? -60 : direction === 'right' ? 60 : 0;
    const y = direction === 'up' ? 60 : direction === 'down' ? -60 : 0;

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            {children}
        </motion.div>
    );
};

// Scale on hover animation wrapper
export const ScaleOnHover = ({ children, className = '', scale = 1.05 }) => {
    return (
        <motion.div
            className={className}
            whileHover={{
                scale,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.div>
    );
};

// Floating animation for decorative elements
export const FloatingElement = ({ children, className = '', delay = 0, amplitude = 15 }) => {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-amplitude, amplitude, -amplitude],
            }}
            transition={{
                duration: 4,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    );
};

// Parallax scroll effect
export const ParallaxSection = ({ children, className = '', speed = 0.5 }) => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

    return (
        <motion.div className={className} style={{ y }}>
            {children}
        </motion.div>
    );
};

// Counter animation for stats
export const AnimatedCounter = ({ value, className = '', duration = 2 }) => {

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
        >
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                {value}
            </motion.span>
        </motion.span>
    );
};

// Stagger container for lists
export const StaggerContainer = ({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true
}) => {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

// Pop-in effect for cards and elements
export const PopIn = ({
    children,
    className = '',
    delay = 0,
    once = true
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration: 0.5,
                delay,
                type: "spring",
                stiffness: 200,
                damping: 20
            }}
        >
            {children}
        </motion.div>
    );
};

// Reveal animation with mask effect
export const RevealText = ({
    children,
    className = '',
    delay = 0,
    once = true
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once, amount: 0.3 }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
