import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Premium Magnetic Button with refined physics and no "sticky" bug
const MagneticButton = ({
    children,
    to = null,
    href = null,
    onClick = null,
    className = '',
    variant = 'primary', // 'primary', 'secondary', 'cta'
    magnetic = true
}) => {
    // Static container for measurement
    const containerRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!magnetic || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const deltaX = (e.clientX - centerX);
        const deltaY = (e.clientY - centerY);

        // Apply magnetic pull (weaker force for stability)
        setPosition({ x: deltaX * 0.35, y: deltaY * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary':
                return 'btn-secondary';
            case 'cta':
                return 'btn-cta';
            case 'primary':
            default:
                return 'btn-primary';
        }
    };

    // Base styling
    const baseClassName = `inline-flex items-center justify-center ${getVariantStyles()} ${className}`;

    // Wraps content in physics motion
    const ContentWrapper = ({ children }) => (
        <span className="relative z-10 block pointer-events-none">
            <motion.span
                className="inline-flex items-center"
                animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
            >
                {children}
            </motion.span>
        </span>
    );

    // The moving child part
    const MotionButton = (
        <motion.div
            className={baseClassName}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        >
            <ContentWrapper>{children}</ContentWrapper>
        </motion.div>
    );

    // Render logic
    const renderContent = () => {
        // Ensure the container handles events, not the moving child
        // This prevents the feedback loop where the moving element changes cursor position
        return (
            <div
                ref={containerRef}
                className="inline-block"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ touchAction: 'none' }}
            >
                {MotionButton}
            </div>
        );
    };

    // If it's a link or button, we need to wrap differently to keep semantics
    if (to) {
        return (
            <div
                ref={containerRef}
                className="inline-block"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <Link to={to} className="inline-block focus:outline-none">
                    {MotionButton}
                </Link>
            </div>
        );
    }

    if (href) {
        return (
            <div
                ref={containerRef}
                className="inline-block"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <a href={href} className="inline-block focus:outline-none" target="_blank" rel="noopener noreferrer">
                    {MotionButton}
                </a>
            </div>
        );
    }

    if (onClick) {
        return (
            <div
                ref={containerRef}
                className="inline-block"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <button onClick={onClick} className="inline-block focus:outline-none bg-transparent border-0 p-0 cursor-pointer">
                    {MotionButton}
                </button>
            </div>
        );
    }

    return renderContent();
};

export default MagneticButton;
