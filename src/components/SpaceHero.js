import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Sphere, useTexture, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// Detect mobile
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
};

// Procedural moon texture generator
function createMoonTexture(size = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Base gray color
    ctx.fillStyle = '#8a8a8a';
    ctx.fillRect(0, 0, size, size);

    // Add noise and craters
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;

    // Add subtle noise
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 30;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }

    ctx.putImageData(imageData, 0, 0);

    // Draw craters
    const craterCount = 80;
    for (let i = 0; i < craterCount; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const radius = Math.random() * 25 + 5;

        // Crater shadow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(60, 60, 65, 0.8)');
        gradient.addColorStop(0.7, 'rgba(80, 80, 85, 0.5)');
        gradient.addColorStop(1, 'rgba(138, 138, 138, 0)');

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Crater rim highlight
        ctx.beginPath();
        ctx.arc(x - radius * 0.2, y - radius * 0.2, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180, 180, 185, 0.3)';
        ctx.fill();
    }

    return new THREE.CanvasTexture(canvas);
}

// The Moon component
function Moon({ mousePosition, isMobileDevice }) {
    const moonRef = useRef();
    const glowRef = useRef();
    const rotationRef = useRef({ x: 0, y: 0 });

    // Create moon texture
    const moonTexture = useMemo(() => createMoonTexture(isMobileDevice ? 256 : 512), [isMobileDevice]);

    useFrame((state, delta) => {
        if (moonRef.current) {
            // Slow constant rotation
            moonRef.current.rotation.y += delta * 0.05;

            // Smooth mouse-following tilt (very smooth lerp for cinematic feel)
            const targetX = mousePosition.current.y * 0.15;
            const targetY = mousePosition.current.x * 0.15;

            rotationRef.current.x += (targetX - rotationRef.current.x) * 0.03;
            rotationRef.current.y += (targetY - rotationRef.current.y) * 0.03;

            moonRef.current.rotation.x = rotationRef.current.x;
            moonRef.current.rotation.z = rotationRef.current.y * 0.5;
        }

        // Glow pulsing
        if (glowRef.current) {
            glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02);
        }
    });

    return (
        <group>
            {/* Main Moon Sphere */}
            <mesh ref={moonRef}>
                <icosahedronGeometry args={[2, isMobileDevice ? 32 : 48]} />
                <meshStandardMaterial
                    map={moonTexture}
                    roughness={0.9}
                    metalness={0.1}
                    emissive="#1a1a2e"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Atmospheric Glow Ring */}
            <mesh ref={glowRef} position={[0, 0, -0.5]}>
                <ringGeometry args={[2.2, 3.2, 64]} />
                <meshBasicMaterial
                    color="#4a9fff"
                    transparent
                    opacity={0.08}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Inner glow */}
            <mesh>
                <sphereGeometry args={[2.05, 32, 32]} />
                <meshBasicMaterial
                    color="#6fa8ff"
                    transparent
                    opacity={0.05}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

// Orbiting Asteroids/Comets
function Asteroids({ count = 20, mousePosition, isMobileDevice }) {
    const groupRef = useRef();
    const asteroidsRef = useRef([]);

    // Create asteroid data
    const asteroidData = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            orbitRadius: 3.5 + Math.random() * 3,
            orbitSpeed: 0.1 + Math.random() * 0.2,
            orbitOffset: Math.random() * Math.PI * 2,
            size: 0.03 + Math.random() * 0.08,
            yOffset: (Math.random() - 0.5) * 2,
            inclination: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.7 ? '#6fa8ff' : '#aaaaaa',
        }));
    }, [count]);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        asteroidData.forEach((asteroid, i) => {
            if (asteroidsRef.current[i]) {
                const angle = time * asteroid.orbitSpeed + asteroid.orbitOffset;
                const x = Math.cos(angle) * asteroid.orbitRadius;
                const z = Math.sin(angle) * asteroid.orbitRadius * 0.6;
                const y = asteroid.yOffset + Math.sin(angle * 2) * asteroid.inclination;

                asteroidsRef.current[i].position.set(x, y, z);
            }
        });

        // Mouse parallax for asteroid group
        if (groupRef.current) {
            groupRef.current.rotation.x = mousePosition.current.y * 0.1;
            groupRef.current.rotation.y = mousePosition.current.x * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {asteroidData.map((asteroid, i) => (
                <mesh
                    key={asteroid.id}
                    ref={(el) => (asteroidsRef.current[i] = el)}
                >
                    <icosahedronGeometry args={[asteroid.size, 0]} />
                    <meshBasicMaterial
                        color={asteroid.color}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    );
}

// Comet trails
function CometTrails({ count = 8, mousePosition }) {
    const cometsRef = useRef([]);

    const cometData = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            startAngle: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.3,
            radius: 4 + Math.random() * 2.5,
            yOffset: (Math.random() - 0.5) * 3,
            tailLength: 0.5 + Math.random() * 0.5,
        }));
    }, [count]);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        cometData.forEach((comet, i) => {
            if (cometsRef.current[i]) {
                const angle = time * comet.speed + comet.startAngle;
                const x = Math.cos(angle) * comet.radius;
                const z = Math.sin(angle) * comet.radius * 0.5;
                const y = comet.yOffset;

                cometsRef.current[i].position.set(x, y, z);
                cometsRef.current[i].rotation.z = -angle;
            }
        });
    });

    return (
        <group>
            {cometData.map((comet, i) => (
                <group key={comet.id} ref={(el) => (cometsRef.current[i] = el)}>
                    {/* Comet head */}
                    <mesh>
                        <sphereGeometry args={[0.04, 8, 8]} />
                        <meshBasicMaterial color="#88ccff" />
                    </mesh>
                    {/* Comet tail */}
                    <mesh position={[-comet.tailLength / 2, 0, 0]}>
                        <planeGeometry args={[comet.tailLength, 0.02]} />
                        <meshBasicMaterial
                            color="#4488ff"
                            transparent
                            opacity={0.4}
                            blending={THREE.AdditiveBlending}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// Deep space starfield with parallax
function DeepStarfield({ mousePosition, isMobileDevice }) {
    const starsRef = useRef();
    const positionRef = useRef({ x: 0, y: 0 });

    useFrame(() => {
        if (starsRef.current) {
            // Very smooth parallax
            positionRef.current.x += (mousePosition.current.x * 0.3 - positionRef.current.x) * 0.02;
            positionRef.current.y += (mousePosition.current.y * 0.3 - positionRef.current.y) * 0.02;

            starsRef.current.rotation.y = positionRef.current.x * 0.1;
            starsRef.current.rotation.x = positionRef.current.y * 0.1;
        }
    });

    return (
        <group ref={starsRef}>
            <Stars
                radius={50}
                depth={80}
                count={isMobileDevice ? 2000 : 5000}
                factor={4}
                saturation={0.1}
                fade
                speed={0.5}
            />
        </group>
    );
}

// Scene component
function Scene({ mousePosition, isMobileDevice }) {
    return (
        <>
            <color attach="background" args={['#000005']} />

            {/* Subtle ambient light */}
            <ambientLight intensity={0.15} />

            {/* Main directional light (sun) */}
            <directionalLight
                position={[10, 5, 8]}
                intensity={1.5}
                color="#ffffff"
            />

            {/* Rim light for moon edge glow */}
            <pointLight
                position={[-8, 0, -5]}
                intensity={0.8}
                color="#4a9fff"
                distance={20}
            />

            {/* Deep starfield */}
            <DeepStarfield mousePosition={mousePosition} isMobileDevice={isMobileDevice} />

            {/* The Moon */}
            <Moon mousePosition={mousePosition} isMobileDevice={isMobileDevice} />

            {/* Orbiting asteroids */}
            <Asteroids
                count={isMobileDevice ? 12 : 25}
                mousePosition={mousePosition}
                isMobileDevice={isMobileDevice}
            />

            {/* Comet trails */}
            {!isMobileDevice && <CometTrails count={6} mousePosition={mousePosition} />}

            {/* Post-processing for cinematic look */}
            {!isMobileDevice && (
                <EffectComposer>
                    <Bloom
                        intensity={0.6}
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.8}
                    />
                    <Vignette
                        eskil={false}
                        offset={0.3}
                        darkness={1.1}
                    />
                </EffectComposer>
            )}
        </>
    );
}

// Main Space Hero Component
export default function SpaceHero({ className = '' }) {
    const mousePosition = useRef({ x: 0, y: 0 });
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile());
    }, []);

    // Smooth mouse tracking at window level
    useEffect(() => {
        let animationId;
        const targetMouse = { x: 0, y: 0 };

        const handleMouseMove = (e) => {
            targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const handleTouchMove = (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                targetMouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
                targetMouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
            }
        };

        // Smooth interpolation loop
        const animate = () => {
            mousePosition.current.x += (targetMouse.x - mousePosition.current.x) * 0.08;
            mousePosition.current.y += (targetMouse.y - mousePosition.current.y) * 0.08;
            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 7], fov: 45 }}
                dpr={isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 1.5)}
                gl={{
                    antialias: !isMobileDevice,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                }}
                style={{ background: '#000005' }}
            >
                <Scene mousePosition={mousePosition} isMobileDevice={isMobileDevice} />
            </Canvas>
        </div>
    );
}
