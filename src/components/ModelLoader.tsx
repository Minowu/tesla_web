import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

interface ModelLoaderProps {
  modelPath: string;
  fallbackColor: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Loading Fallback Component
const LoadingFallback = ({ color }: { color: string }) => (
  <div style={{ 
    width: '100%', 
    height: '100%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.1)',
    color: color,
    fontSize: '0.9rem',
    fontWeight: '500'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: `3px solid ${color}20`, 
        borderTop: `3px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}></div>
      <div>Đang tải model 3D...</div>
    </div>
  </div>
);

// Error Fallback Component
const ErrorFallback = ({ color }: { color: string }) => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

// Model Component with Error Handling
const ModelComponent: React.FC<ModelLoaderProps> = ({ 
  modelPath, 
  fallbackColor, 
  scale = 1, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0] 
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setError(true);
      }
    }, 15000); // 15 second timeout

    return () => clearTimeout(timer);
  }, [isLoading]);

  // Handle connection errors
  useEffect(() => {
    const handleConnectionError = (event: ErrorEvent) => {
      if (event.error && event.error.message) {
        const errorMessage = event.error.message.toLowerCase();
        if (errorMessage.includes('connection') || errorMessage.includes('receiving end')) {
          console.warn('Connection error in ModelLoader, using fallback');
          setError(true);
          event.preventDefault();
        }
      }
    };

    window.addEventListener('error', handleConnectionError);
    return () => window.removeEventListener('error', handleConnectionError);
  }, []);

  if (error) {
    return <ErrorFallback color={fallbackColor} />;
  }

  try {
    const { scene } = useGLTF(modelPath);
    
    useEffect(() => {
      setIsLoading(false);
    }, []);

    return (
      <primitive 
        object={scene} 
        scale={scale} 
        position={position} 
        rotation={rotation} 
      />
    );
  } catch (error) {
    console.warn(`Error loading model: ${modelPath}`, error);
    setError(true);
    return <ErrorFallback color={fallbackColor} />;
  }
};

// Main ModelLoader Component
const ModelLoader: React.FC<ModelLoaderProps> = ({
  modelPath,
  fallbackColor,
  cameraPosition = [2, 1, 4],
  cameraFov = 50,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  return (
    <Suspense fallback={<LoadingFallback color={fallbackColor} />}>
      <Canvas 
        camera={{ position: cameraPosition, fov: cameraFov }}
        style={{ 
          width: '100%', 
          height: '100%',
          background: 'transparent'
        }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} />
        <ModelComponent 
          modelPath={modelPath}
          fallbackColor={fallbackColor}
          scale={scale}
          position={position}
          rotation={rotation}
        />
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.5}
          minDistance={2}
          maxDistance={10}
          dampingFactor={0.05}
          enableDamping={true}
          makeDefault={true}
        />
      </Canvas>
    </Suspense>
  );
};

export default ModelLoader; 