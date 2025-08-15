import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
// import { useAppStore } from '../store/appStore';
// import { useProductStore } from '../store/appStore';

interface RobotModelProps {
  productId: string;
  position: [number, number, number];
  scale?: number;
  delay?: number;
}

export const RobotModels: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const products = [
    { id: 'amr', name: 'AMR Robot', color: '#4a90e2' },
    { id: 'handlift', name: 'Handlift', color: '#e74c3c' },
    { id: 'reach-truck', name: 'Reach Truck', color: '#f39c12' },
    { id: 'charging-station', name: 'Charging Station', color: '#9b59b6' }
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {products.map((product, index) => (
        <RobotModel
          key={product.id}
          productId={product.id}
          position={[
            (index - (products.length - 1) / 2) * 4,
            0,
            0
          ]}
          scale={0.8}
          delay={index * 0.3}
        />
      ))}
    </group>
  );
};

const RobotModel: React.FC<RobotModelProps> = ({ 
  productId, 
  position, 
  scale = 1, 
  delay = 0 
}) => {
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Thêm hiệu ứng float nhẹ
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime * 2 + delay) * 0.1;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      position={position}
    >
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, -Math.PI / 4, 0]}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group ref={modelRef}>
          <SimpleRobotModel productId={productId} scale={scale} />
        </group>
      </PresentationControls>
    </Float>
  );
};

interface SimpleRobotModelProps {
  productId: string;
  scale?: number;
}

const SimpleRobotModel: React.FC<SimpleRobotModelProps> = ({ productId, scale = 1 }) => {
  // Tạo robot đẹp hơn dựa trên productId
  const getRobotGeometry = (id: string) => {
    switch (id) {
      case 'amr':
        return (
          <group>
            {/* Base chính */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.5, 0.6, 1]} />
              <meshStandardMaterial color="#4a90e2" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Bánh xe trước */}
            <mesh position={[-0.6, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[-0.6, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            
            {/* Bánh xe sau */}
            <mesh position={[0.6, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[0.6, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            
            {/* Cảm biến Lidar */}
            <mesh position={[0, 0.8, 0]} castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
              <meshStandardMaterial color="#34495e" metalness={0.9} roughness={0.1} />
            </mesh>
            
            {/* Đèn LED */}
            <mesh position={[0, 0.6, 0.51]} castShadow>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.8} />
            </mesh>
            <mesh position={[0, 0.6, -0.51]} castShadow>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.8} />
            </mesh>
          </group>
        );
      
      case 'handlift':
        return (
          <group>
            {/* Base chính */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.8, 0.8]} />
              <meshStandardMaterial color="#e74c3c" metalness={0.6} roughness={0.3} />
            </mesh>
            
            {/* Cột nâng */}
            <mesh position={[0, 1.2, 0]} castShadow>
              <boxGeometry args={[0.2, 1.6, 0.2]} />
              <meshStandardMaterial color="#c0392b" />
            </mesh>
            
            {/* Càng nâng */}
            <mesh position={[0, 1.2, 0.3]} castShadow>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color="#e67e22" />
            </mesh>
            <mesh position={[0, 1.2, -0.3]} castShadow>
              <boxGeometry args={[0.1, 0.8, 0.1]} />
              <meshStandardMaterial color="#e67e22" />
            </mesh>
            
            {/* Tay cầm */}
            <mesh position={[0, 1.6, 0]} castShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
              <meshStandardMaterial color="#34495e" />
            </mesh>
            
            {/* Bánh xe */}
            <mesh position={[-0.5, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[0.5, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
          </group>
        );
      
      case 'reach-truck':
        return (
          <group>
            {/* Base chính */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 1, 1]} />
              <meshStandardMaterial color="#f39c12" metalness={0.7} roughness={0.2} />
            </mesh>
            
            {/* Cabin */}
            <mesh position={[0, 1.2, 0.3]} castShadow>
              <boxGeometry args={[0.8, 0.6, 0.4]} />
              <meshStandardMaterial color="#e67e22" />
            </mesh>
            
            {/* Cột nâng chính */}
            <mesh position={[0, 2.2, 0]} castShadow>
              <boxGeometry args={[0.3, 2, 0.3]} />
              <meshStandardMaterial color="#d68910" />
            </mesh>
            
            {/* Cột nâng phụ */}
            <mesh position={[0, 2.2, 0.2]} castShadow>
              <boxGeometry args={[0.2, 1.8, 0.2]} />
              <meshStandardMaterial color="#e67e22" />
            </mesh>
            
            {/* Càng nâng */}
            <mesh position={[0, 2.2, 0.5]} castShadow>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshStandardMaterial color="#f1c40f" />
            </mesh>
            <mesh position={[0, 2.2, -0.5]} castShadow>
              <boxGeometry args={[0.1, 1, 0.1]} />
              <meshStandardMaterial color="#f1c40f" />
            </mesh>
            
            {/* Bánh xe */}
            <mesh position={[-0.8, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[0.8, 0, 0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[-0.8, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
            <mesh position={[0.8, 0, -0.4]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
              <meshStandardMaterial color="#2c3e50" />
            </mesh>
          </group>
        );
      
      case 'charging-station':
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.2, 0.8]} />
              <meshStandardMaterial color="#34495e" />
            </mesh>
            
            {/* Thân chính */}
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
              <boxGeometry args={[1, 1.4, 0.6]} />
              <meshStandardMaterial color="#9b59b6" metalness={0.5} roughness={0.4} />
            </mesh>
            
            {/* Cổng sạc */}
            <mesh position={[0, 0.8, 0.35]} castShadow>
              <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
              <meshStandardMaterial color="#8e44ad" emissive="#8e44ad" emissiveIntensity={0.5} />
            </mesh>
            
            {/* Màn hình */}
            <mesh position={[0, 1.4, 0.31]} castShadow>
              <boxGeometry args={[0.5, 0.3, 0.02]} />
              <meshStandardMaterial color="#2c3e50" emissive="#3498db" emissiveIntensity={0.3} />
            </mesh>
            
            {/* Đèn LED */}
            <mesh position={[0, 1.6, 0.31]} castShadow>
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={1} />
            </mesh>
            
            {/* Nút bấm */}
            <mesh position={[0.3, 0.8, 0.31]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
              <meshStandardMaterial color="#e74c3c" />
            </mesh>
          </group>
        );
      
      default:
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#95a5a6" />
          </mesh>
        );
    }
  };

  return (
    <group scale={scale}>
      {getRobotGeometry(productId)}
    </group>
  );
};

// Preload function (no longer needed but kept for compatibility)
export const preloadModels = () => {
  console.log('Models are generated dynamically');
}; 