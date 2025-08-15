import React from 'react';
// import { useFrame } from '@react-three/fiber';
import { Sky, Stars, Sparkles, Cloud } from '@react-three/drei';
// import { useAppStore } from '../store/appStore';

export const Environment3D: React.FC = () => {
  // const { isPerformanceMode } = useAppStore();

  return (
    <>
      {/* Sky với gradient đẹp */}
      <Sky
        distance={450000}
        sunPosition={[0, 1, 0]}
        inclination={0.5}
        azimuth={0.25}
        rayleigh={0.5}
        turbidity={10}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Stars với hiệu ứng sparkle */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Sparkles cho hiệu ứng ma thuật */}
      <Sparkles
        count={200}
        scale={50}
        size={2}
        speed={0.3}
        opacity={0.1}
        color="#ffffff"
      />

      {/* Floating Clouds */}
      <FloatingClouds />

      {/* Ground với texture đẹp */}
      <Ground />
    </>
  );
};

const FloatingClouds: React.FC = () => {
  return (
    <group>
      <Cloud
        opacity={0.5}
        speed={0.4}
        position={[-10, 15, -10]}
      />
      <Cloud
        opacity={0.3}
        speed={0.6}
        position={[15, 20, -15]}
      />
      <Cloud
        opacity={0.4}
        speed={0.5}
        position={[-5, 25, -20]}
      />
      <Cloud
        opacity={0.6}
        speed={0.3}
        position={[20, 18, -12]}
      />
    </group>
  );
};

const Ground: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#1a1a2e"
        metalness={0.1}
        roughness={0.8}
      />
    </mesh>
  );
}; 