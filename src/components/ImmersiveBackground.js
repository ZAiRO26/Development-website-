import React from 'react';

/**
 * ImmersiveBackground - Optimized animated gradient background
 * Uses pure CSS gradients for maximum performance (no Canvas pixel manipulation)
 */
const ImmersiveBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen">
            {/* CSS-based animated gradient background - much faster than Canvas */}
            <div
                className="fixed inset-0 z-0"
                style={{
                    background: '#09090B',
                }}
            >
                {/* Animated gradient blobs using CSS transforms (GPU accelerated) */}
                <div
                    className="absolute w-[600px] h-[600px] rounded-full opacity-40 animate-blob-1"
                    style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%)',
                        left: '10%',
                        top: '20%',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="absolute w-[500px] h-[500px] rounded-full opacity-35 animate-blob-2"
                    style={{
                        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
                        right: '10%',
                        top: '50%',
                        filter: 'blur(60px)',
                    }}
                />
                <div
                    className="absolute w-[450px] h-[450px] rounded-full opacity-30 animate-blob-3"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, transparent 70%)',
                        left: '40%',
                        bottom: '10%',
                        filter: 'blur(60px)',
                    }}
                />
            </div>

            {/* Vignette overlay */}
            <div
                className="fixed inset-0 z-[1] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(9,9,11,0.7) 100%)'
                }}
            />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default ImmersiveBackground;
