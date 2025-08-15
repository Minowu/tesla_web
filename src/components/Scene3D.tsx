import React from 'react';
import { Canvas } from '@react-three/fiber';
// import { Preload } from '@react-three/drei';
// import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
// import { useAppStore } from '../store/appStore';
import { RobotModels } from './RobotModels';
import { Environment3D } from './Environment3D';
import { Lighting } from './Lighting';
import { CameraController } from './CameraController';
// import { useFPS } from '../hooks/useFPS';

// interface Scene3DProps {
//   className?: string;
// }

export const Scene3D: React.FC = () => {
  // const { isPerformanceMode } = useAppStore();

  // Preload models on component mount - temporarily disabled
  // React.useEffect(() => {
  //   preloadModels();
  // }, []);

  // Monitor FPS - temporarily disabled
  // useFPS();

  return (
    <div className="scene-3d">
      <Canvas
        camera={{ 
          position: [5, 3, 5], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          logarithmicDepthBuffer: true
        }}
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Lighting */}
        <Lighting />
        
        {/* Environment */}
        <Environment3D />
        
        {/* Robot Models */}
        <RobotModels />
        
        {/* Camera Controls */}
        <CameraController />
        
        {/* Post Processing Effects - temporarily disabled */}
        {/* <EffectComposer>
          <Bloom 
            intensity={0.5} 
            luminanceThreshold={0.8}
            luminanceSmoothing={0.9}
          />
          <DepthOfField 
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          />
        </EffectComposer> */}
        
        {/* <Preload all /> */}
      </Canvas>
    </div>
  );
};

 