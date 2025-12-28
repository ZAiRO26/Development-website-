import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Simplex noise functions for GLSL
const noiseGLSL = `
  // Simplex 3D Noise
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){ 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0 ); 
    vec4 p = permute( permute( permute( 
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }
`;

// Custom vertex shader with noise displacement
const vertexShader = `
  ${noiseGLSL}
  
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uNoiseStrength;
  uniform float uNoiseScale;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vDisplacement;
  
  void main() {
    vec3 pos = position;
    
    // Create organic noise-based displacement
    float noiseValue = snoise(pos * uNoiseScale + uTime * 0.3);
    noiseValue += snoise(pos * uNoiseScale * 2.0 + uTime * 0.2) * 0.5;
    noiseValue += snoise(pos * uNoiseScale * 4.0 + uTime * 0.1) * 0.25;
    
    // Mouse influence on displacement
    float mouseInfluence = length(uMouse) * 0.3;
    noiseValue += snoise(pos * 1.5 + vec3(uMouse.x, uMouse.y, 0.0) * 2.0) * mouseInfluence;
    
    // Apply displacement along normal
    float displacement = noiseValue * uNoiseStrength;
    pos += normal * displacement;
    
    vNormal = normalize(normalMatrix * normal);
    vPosition = pos;
    vDisplacement = displacement;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// Custom fragment shader with gradient colors and glow
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
    // Fresnel effect for edge glow
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);
    
    // Dynamic color mixing based on displacement and position
    float colorMix = vDisplacement * 2.0 + 0.5;
    colorMix = clamp(colorMix, 0.0, 1.0);
    
    // Three-color gradient
    vec3 color = mix(uColor1, uColor2, colorMix);
    color = mix(color, uColor3, fresnel * 0.5);
    
    // Add glow based on fresnel
    float glow = fresnel * 0.8;
    color += uColor2 * glow;
    
    // Time-based subtle color shift
    float shift = sin(uTime * 0.5) * 0.1 + 0.1;
    color += vec3(shift * 0.1, 0.0, shift * 0.15);
    
    // Mouse influence on brightness
    float mouseBrightness = 1.0 + length(uMouse) * 0.2;
    color *= mouseBrightness;
    
    gl_FragColor = vec4(color, 0.95);
  }
`;

// Organic Blob/Sphere Component
function OrganicBlob({ mousePosition }) {
    const meshRef = useRef();
    const materialRef = useRef();

    // Create shader material with uniforms
    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uNoiseStrength: { value: 0.15 },
        uNoiseScale: { value: 1.5 },
        uColor1: { value: new THREE.Color('#0f0c29') },  // Deep purple/black
        uColor2: { value: new THREE.Color('#6366f1') },  // Primary purple
        uColor3: { value: new THREE.Color('#38bdf8') },  // Cyan accent
    }), []);

    // Animation loop
    useFrame((state) => {
        const { clock } = state;

        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

            // Smooth mouse following
            const targetX = mousePosition.current.x * 0.5;
            const targetY = mousePosition.current.y * 0.5;

            materialRef.current.uniforms.uMouse.value.x += (targetX - materialRef.current.uniforms.uMouse.value.x) * 0.05;
            materialRef.current.uniforms.uMouse.value.y += (targetY - materialRef.current.uniforms.uMouse.value.y) * 0.05;
        }

        if (meshRef.current) {
            // Subtle rotation following mouse
            meshRef.current.rotation.x += (mousePosition.current.y * 0.1 - meshRef.current.rotation.x) * 0.02;
            meshRef.current.rotation.y += (mousePosition.current.x * 0.1 - meshRef.current.rotation.y) * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2.5, 64]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

// Floating Particles
function FloatingParticles({ count = 100, mousePosition }) {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const radius = 4 + Math.random() * 3;

            pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = radius * Math.cos(phi);
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
            pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;

            // Mouse influence
            pointsRef.current.rotation.x += mousePosition.current.y * 0.001;
            pointsRef.current.rotation.y += mousePosition.current.x * 0.001;
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
                size={0.03}
                color="#6366f1"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Scene component with effects
function Scene({ mousePosition }) {
    return (
        <>
            <color attach="background" args={['#0a0a0f']} />

            {/* Ambient lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
            <pointLight position={[-10, -10, -5]} intensity={0.3} color="#38bdf8" />

            {/* Main organic blob */}
            <OrganicBlob mousePosition={mousePosition} />

            {/* Floating particles */}
            <FloatingParticles count={80} mousePosition={mousePosition} />

            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={1.2}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
                <ChromaticAberration
                    offset={[0.0005, 0.0005]}
                />
            </EffectComposer>
        </>
    );
}

// Mouse tracker component
function MouseTracker({ mousePosition }) {
    const { size, viewport } = useThree();

    useEffect(() => {
        const handleMouseMove = (event) => {
            // Normalize mouse position to -1 to 1
            mousePosition.current.x = (event.clientX / size.width) * 2 - 1;
            mousePosition.current.y = -(event.clientY / size.height) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [size, mousePosition]);

    return null;
}

// Main WebGL Hero Component
export default function WebGLHero({ className = '' }) {
    const mousePosition = useRef({ x: 0, y: 0 });

    return (
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <MouseTracker mousePosition={mousePosition} />
                <Scene mousePosition={mousePosition} />
            </Canvas>
        </div>
    );
}
