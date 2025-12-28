import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ImageReveal - Premium image component with reveal animation and hover effects
 * Features parallax tilt, scale on hover, and reveal mask animation
 */
const ImageReveal = ({
    src,
    alt = '',
    className = '',
    aspectRatio = '16/9', // '1/1', '4/3', '16/9', '3/4'
    revealDirection = 'bottom', // 'left', 'right', 'top', 'bottom'
    enableTilt = true,
    enableScale = true,
}) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 200, damping: 20 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

    const handleMouseMove = (e) => {
        if (!enableTilt || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) / rect.width);
        y.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    // Get reveal animation direction
    const getRevealVariants = () => {
        const directions = {
            left: { initial: { x: '-100%' }, animate: { x: 0 } },
            right: { initial: { x: '100%' }, animate: { x: 0 } },
            top: { initial: { y: '-100%' }, animate: { y: 0 } },
            bottom: { initial: { y: '100%' }, animate: { y: 0 } },
        };
        return directions[revealDirection] || directions.bottom;
    };

    const revealVariants = getRevealVariants();

    return (
        <motion.div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{
                perspective: 1000,
                aspectRatio,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Reveal mask overlay */}
            <motion.div
                className="absolute inset-0 z-10 bg-primary"
                initial={revealVariants.initial}
                whileInView={revealVariants.animate}
                viewport={{ once: true }}
                transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.2
                }}
                style={{
                    transformOrigin: revealDirection === 'left' || revealDirection === 'right'
                        ? 'left center'
                        : 'center top'
                }}
            />

            {/* Image with tilt effect */}
            <motion.div
                className="w-full h-full"
                style={{
                    rotateX: enableTilt ? rotateX : 0,
                    rotateY: enableTilt ? rotateY : 0,
                    transformStyle: 'preserve-3d',
                }}
            >
                <motion.img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                        scale: enableScale && isHovered ? 1.05 : 1,
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                />
            </motion.div>

            {/* Shine effect on hover */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                }}
                animate={{
                    backgroundPosition: isHovered ? '200% 0' : '-200% 0',
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            />
        </motion.div>
    );
};

/**
 * ImageParallax - Image with scroll-based parallax effect
 */
export const ImageParallax = ({
    src,
    alt = '',
    className = '',
    speed = 0.2, // Parallax speed multiplier
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                style={{ scale: 1.2 }} // Extra size for parallax movement
                initial={{ y: 0 }}
                whileInView={{ y: `${speed * 100}%` }}
                transition={{ duration: 1.5, ease: 'linear' }}
                viewport={{ once: false }}
            />
        </div>
    );
};

export default ImageReveal;
