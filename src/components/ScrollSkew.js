import { useRef } from 'react';
import { useScroll, useTransform, useVelocity, useSpring, motion } from 'framer-motion';

// Adds a subtle skew effect based on scroll velocity for a "warp speed" feel
const ScrollSkew = ({ children, className = '' }) => {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity value
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    // Map velocity to skew degrees
    // We cap it mostly between -3 and 3 degrees to be subtle but noticeable
    const skewY = useTransform(smoothVelocity, [-2000, 2000], [-3, 3], {
        clamp: true // Prevent extreme warping
    });

    return (
        <motion.div
            className={className}
            style={{ skewY, transformOrigin: "center center" }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollSkew;
