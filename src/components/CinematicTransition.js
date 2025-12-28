import React from 'react';
import { motion } from 'framer-motion';

/**
 * CinematicTransition - Optimized fast page transitions
 * Reduced duration for snappy navigation
 */

// Fast, minimal content animation
const contentVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    enter: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};

const CinematicTransition = ({ children }) => {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={contentVariants}
        >
            {children}
        </motion.div>
    );
};

export default CinematicTransition;
