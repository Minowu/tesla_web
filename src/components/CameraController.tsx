import React from 'react';
// import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import { gsap } from 'gsap';
// import { useAppStore } from '../store/appStore';

export const CameraController: React.FC = () => {
  // const { camera } = useThree();
  // const controlsRef = useRef<any>(null);
  // const { 
  //   currentProduct, 
  //   cameraPosition, 
  //   cameraTarget,
  //   isAutoRotate,
  //   resetCamera 
  // } = useAppStore();

  // Camera animations - temporarily disabled
  // useEffect(() => {
  //   if (currentProduct) {
  //     // Animate to product focus
  //     gsap.to(camera.position, {
  //       x: cameraPosition[0],
  //       y: cameraPosition[1],
  //       z: cameraPosition[2],
  //       duration: 2,
  //       ease: "power2.out"
  //     });

  //     if (controlsRef.current) {
  //       gsap.to(controlsRef.current.target, {
  //         x: cameraTarget[0],
  //         y: cameraTarget[1],
  //         z: cameraTarget[2],
  //         duration: 2,
  //         ease: "power2.out"
  //       });
  //     }
  //   }
  // }, [currentProduct, cameraPosition, cameraTarget, camera]);

  // Auto rotation - temporarily disabled
  // useFrame(() => {
  //   if (controlsRef.current && isAutoRotate) {
  //     controlsRef.current.autoRotate = true;
  //     controlsRef.current.autoRotateSpeed = 0.5;
  //   } else if (controlsRef.current) {
  //     controlsRef.current.autoRotate = false;
  //   }
  // });

  return (
    <>
      {/* Main Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        panSpeed={0.8}
        target={[0, 0, 0]}
      />

      {/* Presentation Controls for Product Focus - temporarily disabled */}
      {/* {currentProduct && (
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        />
      )} */}
    </>
  );
}; 