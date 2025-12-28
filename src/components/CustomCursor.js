import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * CustomCursor - Optimized lightweight cursor
 * Uses CSS transforms for smooth 60fps performance
 */
const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseMove = useCallback((e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!isVisible) setIsVisible(true);
    }, [isVisible]);

    const handleMouseOver = useCallback((e) => {
        const target = e.target;
        const isInteractive =
            target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') ||
            target.closest('button') ||
            target.classList.contains('cursor-pointer');
        setIsHovering(isInteractive);
    }, []);

    useEffect(() => {
        // Skip on touch devices
        if ('ontouchstart' in window) return;

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.addEventListener('mouseover', handleMouseOver, { passive: true });
        document.addEventListener('mouseleave', () => setIsVisible(false));

        // Hide default cursor
        document.body.style.cursor = 'none';

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseover', handleMouseOver);
            document.body.style.cursor = 'auto';
        };
    }, [handleMouseMove, handleMouseOver]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
            animate={{
                x: position.x - (isHovering ? 24 : 6),
                y: position.y - (isHovering ? 24 : 6),
                width: isHovering ? 48 : 12,
                height: isHovering ? 48 : 12,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                type: 'tween',
                duration: 0.15,
                ease: 'easeOut',
            }}
            style={{
                backgroundColor: 'white',
                borderRadius: '50%',
            }}
        />
    );
};

export default CustomCursor;
