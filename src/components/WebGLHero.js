import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Detect mobile device
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
};

// Animated Blob using drei's MeshDistortMaterial (GPU optimized, stable)
function AnimatedBlob({ mousePosition, isMobileDevice }) {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Smooth rotation based on time
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;

            // Mouse influence on rotation (smooth interpolation)
            const targetRotX = mousePosition.current.y * 0.2;
            const targetRotZ = mousePosition.current.x * 0.1;
            meshRef.current.rotation.x += (targetRotX - meshRef.current.rotation.x) * 0.1;
            meshRef.current.rotation.z += (targetRotZ - meshRef.current.rotation.z) * 0.1;
        }

        // Animate distortion speed
        if (materialRef.current) {
            materialRef.current.distort = 0.4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Sphere ref={meshRef} args={[2.2, isMobileDevice ? 32 : 64, isMobileDevice ? 32 : 64]}>
            <MeshDistortMaterial
                ref={materialRef}
                color="#6366f1"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.8}
                emissive="#2d1b69"
                emissiveIntensity={0.3}
            />
        </Sphere>
    );
}

// Outer glow ring
function GlowRing({ mousePosition }) {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.1;
            ringRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05);
        }
    });

    return (
        <mesh ref={ringRef} position={[0, 0, -1]}>
            <ringGeometry args={[3, 3.3, 64]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
    );
}

// Floating particles
function FloatingParticles({ count = 30, mousePosition }) {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 3.5 + Math.random() * 2;

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.05;
            pointsRef.current.rotation.x += mousePosition.current.y * 0.001;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#a5b4fc"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Scene component
function Scene({ mousePosition, isMobileDevice }) {
    return (
        <>
            <color attach="background" args={['#0a0a0f']} />

            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#6366f1" />
            <pointLight position={[5, -5, -5]} intensity={0.3} color="#38bdf8" />

            {/* Main blob */}
            <AnimatedBlob mousePosition={mousePosition} isMobileDevice={isMobileDevice} />

            {/* Glow ring */}
            {!isMobileDevice && <GlowRing mousePosition={mousePosition} />}

            {/* Particles */}
            <FloatingParticles count={isMobileDevice ? 15 : 30} mousePosition={mousePosition} />
        </>
    );
}

// Main WebGL Hero Component
export default function WebGLHero({ className = '' }) {
    const mousePosition = useRef({ x: 0, y: 0 });
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile());
    }, []);

    // Mouse/touch tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                mousePosition.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
                mousePosition.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 1.5)}
                gl={{
                    antialias: !isMobileDevice,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                }}
                style={{ background: 'transparent' }}
            >
                <Scene mousePosition={mousePosition} isMobileDevice={isMobileDevice} />
            </Canvas>
        </div>
    );
}
