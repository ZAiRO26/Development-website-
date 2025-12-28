import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// Detect if mobile/low-performance device
const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
};

// Simplified noise for better performance
const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) { 
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i); 
    vec4 p = permute(permute(permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0)) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

// Optimized vertex shader - only 2 octaves of noise
const vertexShader = `
  ${noiseGLSL}
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uNoiseStrength;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  void main() {
    vec3 pos = position;
    
    // Simplified noise - only 2 octaves for performance
    float noiseValue = snoise(pos * 1.2 + uTime * 0.25);
    noiseValue += snoise(pos * 2.4 + uTime * 0.15) * 0.5;
    
    // Mouse influence - direct and responsive
    float mouseInfluence = length(uMouse) * 0.4;
    noiseValue += snoise(pos + vec3(uMouse.x * 3.0, uMouse.y * 3.0, 0.0)) * mouseInfluence;
    
    // Apply displacement
    float displacement = noiseValue * uNoiseStrength;
    pos += normal * displacement;
    
    vNormal = normalize(normalMatrix * normal);
    vPosition = pos;
    vDisplacement = displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Optimized fragment shader
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uMouse;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  void main() {
    // Fresnel for edge glow
    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.5);
    
    // Color mixing
    float colorMix = clamp(vDisplacement * 2.0 + 0.5, 0.0, 1.0);
    
    vec3 color = mix(uColor1, uColor2, colorMix);
    color = mix(color, uColor3, fresnel * 0.6);
    
    // Glow
    color += uColor2 * fresnel * 0.5;
    
    // Mouse brightness boost
    float mouseBrightness = 1.0 + length(uMouse) * 0.3;
    color *= mouseBrightness;
    
    gl_FragColor = vec4(color, 0.9);
  }
`;

// Organic Blob - Optimized
function OrganicBlob({ mousePosition, detail = 32 }) {
    const meshRef = useRef();
    const materialRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uNoiseStrength: { value: 0.18 },
        uColor1: { value: new THREE.Color('#0f0c29') },
        uColor2: { value: new THREE.Color('#6366f1') },
        uColor3: { value: new THREE.Color('#38bdf8') },
    }), []);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value += delta * 0.8;

            // FASTER mouse following (0.15 instead of 0.05)
            const targetX = mousePosition.current.x;
            const targetY = mousePosition.current.y;

            materialRef.current.uniforms.uMouse.value.x += (targetX - materialRef.current.uniforms.uMouse.value.x) * 0.15;
            materialRef.current.uniforms.uMouse.value.y += (targetY - materialRef.current.uniforms.uMouse.value.y) * 0.15;
        }

        if (meshRef.current) {
            // Faster rotation response
            meshRef.current.rotation.x += (mousePosition.current.y * 0.15 - meshRef.current.rotation.x) * 0.08;
            meshRef.current.rotation.y += (mousePosition.current.x * 0.15 - meshRef.current.rotation.y) * 0.08;
        }
    });

    return (
        <mesh ref={meshRef}>
            <icosahedronGeometry args={[2.5, detail]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

// Simplified particles
function FloatingParticles({ count = 40, mousePosition }) {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 4 + Math.random() * 2.5;

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.03;
            pointsRef.current.rotation.x += mousePosition.current.y * 0.002;
            pointsRef.current.rotation.y += mousePosition.current.x * 0.002;
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
                size={0.04}
                color="#6366f1"
                transparent
                opacity={0.5}
                sizeAttenuation
            />
        </points>
    );
}

// Scene with conditional effects
function Scene({ mousePosition, enableEffects = true, geometryDetail = 32 }) {
    return (
        <>
            <color attach="background" args={['#0a0a0f']} />

            <ambientLight intensity={0.3} />
            <pointLight position={[8, 8, 8]} intensity={0.6} color="#6366f1" />
            <pointLight position={[-8, -8, -4]} intensity={0.4} color="#38bdf8" />

            <OrganicBlob mousePosition={mousePosition} detail={geometryDetail} />
            <FloatingParticles count={enableEffects ? 40 : 20} mousePosition={mousePosition} />

            {enableEffects && (
                <EffectComposer>
                    <Bloom
                        intensity={0.8}
                        luminanceThreshold={0.3}
                        luminanceSmoothing={0.7}
                    />
                </EffectComposer>
            )}
        </>
    );
}

// Main WebGL Hero Component - Optimized
export default function WebGLHero({ className = '' }) {
    const mousePosition = useRef({ x: 0, y: 0 });
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    // Check for mobile on mount
    useEffect(() => {
        setIsMobileDevice(isMobile());
    }, []);

    // Mouse tracking at window level for better responsiveness
    useEffect(() => {
        const handleMouseMove = (e) => {
            mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePosition.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        // Also handle touch for mobile
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

    // Performance settings based on device
    const dpr = isMobileDevice ? [1, 1] : [1, 1.5];
    const geometryDetail = isMobileDevice ? 20 : 32;
    const enableEffects = !isMobileDevice;

    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={dpr}
                gl={{
                    antialias: !isMobileDevice,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true,
                }}
                style={{ background: 'transparent' }}
                frameloop="always"
            >
                <Scene
                    mousePosition={mousePosition}
                    enableEffects={enableEffects}
                    geometryDetail={geometryDetail}
                />
            </Canvas>
        </div>
    );
}
