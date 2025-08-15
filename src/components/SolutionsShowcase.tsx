import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// 3D Model Components
const LaserCuttingModel = () => {
  const { scene } = useGLTF('/models/simulation_laser_cutting_robot_systems.glb');
  return <primitive object={scene} scale={0.5} />;
};

const SmartApplicationModel = () => {
  const { scene } = useGLTF('/models/assembly_solar.glb');
  return <primitive object={scene} scale={0.3} />;
};

const RoboticAutomationModel = () => {
  const { scene } = useGLTF('/models/industrial_-_3d_agv__trolley_-_omrom.glb');
  return <primitive object={scene} scale={0.4} />;
};

const IoTIntegrationModel = () => {
  const { scene } = useGLTF('/models/logistic_robot_test__2.glb');
  return <primitive object={scene} scale={0.3} />;
};

// Loading Fallback
const LoadingFallback = () => (
  <div className="loading-3d">
    <div className="spinner"></div>
  </div>
);

// Solutions Data
const solutions = [
  {
    id: 'laser-cutting',
    title: 'Cắt Laser Thông Minh',
    description: 'Hệ thống cắt laser tự động với độ chính xác cao, tích hợp AI để tối ưu hóa quy trình sản xuất.',
    icon: '⚡',
    color: '#00d4ff',
    model: LaserCuttingModel,
    features: ['Độ chính xác ±0.01mm', 'Tốc độ cắt 100m/phút', 'Tích hợp AI', 'Bảo trì thông minh']
  },
  {
    id: 'smart-application',
    title: 'Ứng Dụng Thông Minh',
    description: 'Phát triển ứng dụng IoT và AI cho các ngành công nghiệp, giúp tối ưu hóa hiệu suất sản xuất.',
    icon: '🤖',
    color: '#ff6b35',
    model: SmartApplicationModel,
    features: ['IoT Integration', 'Real-time Monitoring', 'Predictive Analytics', 'Cloud Platform']
  },
  {
    id: 'robotic-automation',
    title: 'Tự Động Hóa Robot',
    description: 'Giải pháp robot công nghiệp tiên tiến với khả năng học tập và thích ứng với môi trường sản xuất.',
    icon: '🦾',
    color: '#ff4757',
    model: RoboticAutomationModel,
    features: ['Collaborative Robots', 'Machine Learning', 'Safety Systems', 'Easy Programming']
  },
  {
    id: 'iot-integration',
    title: 'Tích Hợp IoT',
    description: 'Hệ thống IoT toàn diện kết nối thiết bị, thu thập dữ liệu và phân tích để ra quyết định thông minh.',
    icon: '🌐',
    color: '#3742fa',
    model: IoTIntegrationModel,
    features: ['Sensor Networks', 'Data Analytics', 'Cloud Integration', 'Security First']
  }
];

const SolutionsShowcase: React.FC = () => {
  const [activeSolution, setActiveSolution] = useState(0);

  // Auto cycle through solutions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSolution((prev) => (prev + 1) % solutions.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSolution = solutions[activeSolution];
  
  if (!currentSolution) {
    return <div>Loading...</div>;
  }
  
  const ModelComponent = currentSolution.model;

  return (
    <section className="solutions">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Giải Pháp <span className="text-gradient">Công Nghệ</span>
          </h2>
          <p className="section-subtitle">
            Khám phá các giải pháp công nghệ tiên tiến giúp doanh nghiệp của bạn phát triển bền vững
          </p>
        </div>

        <div className="solutions-showcase">
          <div className="solutions-visual">
            <div className="solutions-3d-container">
              <Suspense fallback={<LoadingFallback />}>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ModelComponent />
                  </Float>
                  <OrbitControls enableZoom={false} enablePan={false} />
                  <Environment preset="city" />
                </Canvas>
              </Suspense>
            </div>
            
            <div className="solutions-indicators">
              {solutions.map((solution, index) => (
                <div
                  key={solution.id}
                  className={`solution-indicator ${index === activeSolution ? 'active' : ''}`}
                  onClick={() => setActiveSolution(index)}
                  style={{ '--indicator-color': solution.color } as React.CSSProperties}
                >
                  <span className="indicator-icon">{solution.icon}</span>
                  <span className="indicator-label">{solution.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="solutions-content">
            <div className="solution-header">
              <div 
                className="solution-badge"
                style={{ '--badge-color': currentSolution.color } as React.CSSProperties}
              >
                <span className="badge-icon">{currentSolution.icon}</span>
                <span>Giải pháp {activeSolution + 1}/{solutions.length}</span>
              </div>
              
              <h3 className="solution-title">{currentSolution.title}</h3>
              <p className="solution-description">{currentSolution.description}</p>
            </div>

            <div className="solution-features">
              <h4>Tính năng nổi bật</h4>
              <ul>
                {currentSolution.features.map((feature, index) => (
                  <li key={index}>
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="solution-actions">
              <button className="btn btn-primary">
                <span>Khám phá chi tiết</span>
                <span className="btn-icon">→</span>
              </button>
              <button className="btn btn-secondary">
                <span>Liên hệ tư vấn</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsShowcase;
