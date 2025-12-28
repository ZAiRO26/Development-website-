import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Individual 3D Shape Component - Now reacts to mouse
const FloatingShape = ({
    type = 'sphere',
    size = 80,
    color = '#6366F1',
    position,
    delay = 0,
    rotationSpeed = 20,
    opacity = 0.6,
    mouseOffset = { x: 0, y: 0 }, // Mouse-based offset
    parallaxStrength = 1, // How much this shape reacts to mouse
}) => {
    const shapeStyles = {
        sphere: {
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${color}88, ${color}22)`,
            boxShadow: `
                inset -15px -15px 40px rgba(0,0,0,0.3),
                inset 8px 8px 20px rgba(255,255,255,0.1),
                0 0 60px ${color}33
            `,
        },
        cube: {
            borderRadius: '20%',
            background: `linear-gradient(135deg, ${color}99, ${color}44)`,
            boxShadow: `
                8px 8px 24px rgba(0,0,0,0.4),
                0 0 40px ${color}22
            `,
        },
        torus: {
            borderRadius: '50%',
            background: 'transparent',
            border: `${size / 5}px solid ${color}77`,
            boxShadow: `
                inset 0 0 ${size / 2}px ${color}33,
                0 0 30px ${color}22
            `,
        },
        diamond: {
            borderRadius: '15%',
            background: `linear-gradient(45deg, ${color}bb, ${color}44)`,
            boxShadow: `
                4px 4px 16px rgba(0,0,0,0.5),
                0 0 40px ${color}33
            `,
        }
    };

    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{
                width: type === 'torus' ? size * 1.5 : size,
                height: type === 'torus' ? size * 1.5 : size,
                left: position.x,
                top: position.y,
                opacity: opacity,
                ...shapeStyles[type],
            }}
            animate={{
                rotate: type === 'diamond' ? [45, 405] : [0, 360],
                y: [0, -25, 0, 25, 0],
                scale: [1, 1.03, 1, 0.97, 1],
                // Mouse-reactive offset
                x: mouseOffset.x * parallaxStrength * 50,
                translateY: mouseOffset.y * parallaxStrength * 50,
            }}
            transition={{
                rotate: {
                    duration: rotationSpeed,
                    repeat: Infinity,
                    ease: 'linear',
                },
                y: {
                    duration: 8 + delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                scale: {
                    duration: 10 + delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                },
                x: {
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                },
                translateY: {
                    type: 'spring',
                    stiffness: 50,
                    damping: 20,
                },
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: opacity, scale: 1 }}
            viewport={{ once: true }}
        />
    );
};

// Subtle Particle - reacts to mouse
const Particle = ({ x, y, size, delay, mouseOffset }) => (
    <motion.div
        className="absolute rounded-full"
        style={{
            width: size,
            height: size,
            left: `${x}%`,
            top: `${y}%`,
            background: 'rgba(99, 102, 241, 0.4)',
        }}
        animate={{
            y: [0, -20, 0, 20, 0],
            x: mouseOffset.x * 30, // React to mouse
            opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
            y: {
                duration: 10 + delay,
                repeat: Infinity,
                ease: 'easeInOut',
            },
            x: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
            },
            opacity: {
                duration: 10 + delay,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        }}
    />
);

// Main Hero3D Component - Enhanced mouse reactivity
export default function Hero3D({ className = '' }) {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse tracking - faster response
    const springConfig = { stiffness: 100, damping: 30 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform mouse position to rotation values - STRONGER effect (±10 degrees)
    const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

    // Additional parallax transforms for gradient orbs
    const orbMoveX = useTransform(springX, [-0.5, 0.5], [-80, 80]);
    const orbMoveY = useTransform(springY, [-0.5, 0.5], [-60, 60]);

    // Handle mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
            setMousePos({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Generate particles - fewer for performance
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
    }));

    // 3D Shapes - with varying parallax strengths
    const shapes = [
        // Left side shapes
        { type: 'sphere', size: 120, color: '#6366F1', position: { x: '3%', y: '15%' }, delay: 0, rotationSpeed: 30, opacity: 0.5, parallaxStrength: 1.5 },
        { type: 'torus', size: 80, color: '#818CF8', position: { x: '8%', y: '65%' }, delay: 0.5, rotationSpeed: 22, opacity: 0.4, parallaxStrength: 1.2 },
        { type: 'diamond', size: 50, color: '#38BDF8', position: { x: '12%', y: '85%' }, delay: 1, rotationSpeed: 45, opacity: 0.45, parallaxStrength: 0.8 },

        // Right side shapes
        { type: 'sphere', size: 80, color: '#38BDF8', position: { x: '88%', y: '10%' }, delay: 1, rotationSpeed: 25, opacity: 0.45, parallaxStrength: -1.3 },
        { type: 'torus', size: 100, color: '#6366F1', position: { x: '85%', y: '55%' }, delay: 1.5, rotationSpeed: 28, opacity: 0.5, parallaxStrength: -1.0 },
        { type: 'cube', size: 60, color: '#A5B4FC', position: { x: '90%', y: '80%' }, delay: 2, rotationSpeed: 35, opacity: 0.4, parallaxStrength: -0.7 },

        // Subtle accent in corners
        { type: 'sphere', size: 40, color: '#FB7185', position: { x: '95%', y: '25%' }, delay: 0.5, rotationSpeed: 20, opacity: 0.35, parallaxStrength: -1.8 },
        { type: 'diamond', size: 35, color: '#34D399', position: { x: '5%', y: '40%' }, delay: 1.5, rotationSpeed: 40, opacity: 0.35, parallaxStrength: 2.0 },
    ];

    return (
        <motion.div
            ref={containerRef}
            className={`absolute inset-0 overflow-hidden ${className}`}
            style={{
                perspective: '1200px',
                transformStyle: 'preserve-3d',
            }}
        >
            {/* Subtle background gradient mesh */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark" />

            {/* Large ambient gradient orbs - FOLLOW MOUSE */}
            <motion.div
                className="absolute w-[700px] h-[700px] rounded-full blur-[150px] opacity-25"
                style={{
                    background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)',
                    left: '5%',
                    top: '10%',
                    x: orbMoveX,
                    y: orbMoveY,
                }}
            />
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-20"
                style={{
                    background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)',
                    right: '5%',
                    bottom: '15%',
                    x: useTransform(springX, [-0.5, 0.5], [60, -60]),
                    y: useTransform(springY, [-0.5, 0.5], [40, -40]),
                }}
            />

            {/* 3D Scene with ENHANCED mouse tracking */}
            <motion.div
                className="absolute inset-0"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Particles */}
                {particles.map((particle) => (
                    <Particle key={particle.id} {...particle} mouseOffset={mousePos} />
                ))}

                {/* 3D Floating Shapes - at edges with parallax */}
                {shapes.map((shape, index) => (
                    <FloatingShape
                        key={index}
                        {...shape}
                        mouseOffset={mousePos}
                    />
                ))}

                {/* Subtle grid overlay for depth */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(99, 102, 241, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
