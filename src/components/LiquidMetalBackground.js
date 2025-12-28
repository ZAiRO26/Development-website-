import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Floating metallic blob
const MetallicBlob = ({ position, scale, speed, distort, color }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
        }
    });

    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    metalness={0.95}
                    roughness={0.1}
                    distort={distort}
                    speed={2}
                    envMapIntensity={1.5}
                />
            </mesh>
        </Float>
    );
};

// Main scene with multiple floating shapes
const Scene = () => {
    const blobs = useMemo(() => [
        { position: [-2, 1, -3], scale: 1.2, speed: 1.5, distort: 0.4, color: '#6366f1' },
        { position: [2.5, -0.5, -4], scale: 0.9, speed: 1.2, distort: 0.5, color: '#8b5cf6' },
        { position: [0, 0.5, -2], scale: 0.6, speed: 2, distort: 0.3, color: '#a855f7' },
        { position: [-3, -1.5, -5], scale: 1.5, speed: 0.8, distort: 0.6, color: '#4f46e5' },
        { position: [3, 2, -6], scale: 1.8, speed: 0.6, distort: 0.35, color: '#7c3aed' },
    ], []);

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />

            <Environment preset="city" />

            {blobs.map((blob, i) => (
                <MetallicBlob key={i} {...blob} />
            ))}

            {/* Gradient fog effect */}
            <fog attach="fog" args={['#09090B', 5, 15]} />
        </>
    );
};

// Main component wrapper
const LiquidMetalBackground = ({ children }) => {
    return (
        <div className="relative min-h-screen">
            {/* 3D Canvas Background */}
            <div className="fixed inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: 'high-performance'
                    }}
                    style={{ background: 'transparent' }}
                >
                    <Scene />
                </Canvas>
            </div>

            {/* Gradient overlay for text readability */}
            <div
                className="fixed inset-0 z-[1] pointer-events-none"
                style={{
                    background: `
                        radial-gradient(ellipse at center, transparent 0%, rgba(9,9,11,0.4) 50%, rgba(9,9,11,0.8) 100%)
                    `
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default LiquidMetalBackground;
