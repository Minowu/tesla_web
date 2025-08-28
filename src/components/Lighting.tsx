import React from 'react';
// import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// import { useAppStore } from '../store/appStore';

export const Lighting: React.FC = () => {
  // const { currentProduct, isPerformanceMode } = useAppStore();
  // const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  // const pointLightRef = useRef<THREE.PointLight>(null);

  // useFrame((state) => {
  //   // Animate lights based on current product
  //   if (directionalLightRef.current) {
  //     directionalLightRef.current.intensity = 
  //       1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  //   }
    
  //   if (pointLightRef.current) {
  //     pointLightRef.current.intensity = 
  //       0.5 + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  //   }
  // });

  return (
    <>
      {/* Main Directional Light - Ánh sáng chính */}
      <primitive 
        object={new THREE.DirectionalLight(0xffffff, 1.2)} 
        position={[10, 10, 5]} 
        castShadow 
      />

      {/* Fill Light - Ánh sáng phụ */}
      <primitive 
        object={new THREE.DirectionalLight(0x4ecdc4, 0.4)} 
        position={[-5, 5, -5]} 
      />

      {/* Rim Light - Ánh sáng viền */}
      <primitive 
        object={new THREE.DirectionalLight(0xff6b35, 0.3)} 
        position={[0, 0, -10]} 
      />

      {/* Point Light for Product Highlight - Ánh sáng điểm */}
      <primitive 
        object={new THREE.PointLight(0x00d4ff, 0.8, 15, 2)} 
        position={[0, 8, 0]} 
      />

      {/* Spot Light for Focus - Ánh sáng tập trung */}
      <primitive 
        object={new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 6, 0.5)} 
        position={[0, 15, 0]} 
        castShadow 
      />

      {/* Hemisphere Light for Ambient - Ánh sáng môi trường */}
      <primitive 
        object={new THREE.HemisphereLight(0xffffff, 0x1a1a2e, 0.3)} 
      />

      {/* Ambient Light - Ánh sáng tổng thể */}
      <primitive 
        object={new THREE.AmbientLight(0xffffff, 0.2)} 
      />

      {/* Colored accent lights */}
      <primitive 
        object={new THREE.PointLight(0xff6b6b, 0.5, 10, 1)} 
        position={[-8, 5, 0]} 
      />
      <primitive 
        object={new THREE.PointLight(0x4ecdc4, 0.5, 10, 1)} 
        position={[8, 5, 0]} 
      />
      <primitive 
        object={new THREE.PointLight(0x45b7d1, 0.5, 10, 1)} 
        position={[0, 5, 8]} 
      />
    </>
  );
}; 