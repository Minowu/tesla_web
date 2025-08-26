import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// 3D Model Components
const LaserCuttingModel = () => {
  const { scene } = useGLTF('/simulation_laser_cutting_robot_systems.glb');
  return <primitive object={scene} scale={0.5} />;
};

const SmartApplicationModel = () => {
  const { scene } = useGLTF('/assembly_solar.glb');
  return <primitive object={scene} scale={0.3} />;
};

const RoboticAutomationModel = () => {
  const { scene } = useGLTF('/industrial_-_3d_agv__trolley_-_omrom.glb');
  return <primitive object={scene} scale={0.4} />;
};

const IoTIntegrationModel = () => {
  const { scene } = useGLTF('/logistic_robot_test__2.glb');
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
  const navigate = useNavigate();

  // Animation refs và controls
  const headerRef = useRef(null);
  const visualRef = useRef(null);
  const contentRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true });
  const visualInView = useInView(visualRef, { once: true });
  const contentInView = useInView(contentRef, { once: true });
  
  const headerControls = useAnimation();
  const visualControls = useAnimation();
  const contentControls = useAnimation();

  // Animation effects
  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerInView]);

  useEffect(() => {
    if (visualInView) {
      visualControls.start("visible");
    }
  }, [visualInView]);

  useEffect(() => {
    if (contentInView) {
      contentControls.start("visible");
    }
  }, [contentInView]);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  // Auto cycle through solutions
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSolution((prev) => (prev + 1) % solutions.length);
    }, 20000);
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
        <motion.div 
          ref={headerRef}
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-title">
            Giải Pháp <span className="text-gradient">Công Nghệ</span>
          </h2>
          <p className="section-subtitle">
            Khám phá các giải pháp công nghệ tiên tiến giúp doanh nghiệp của bạn phát triển bền vững
          </p>
        </motion.div>

        <div className="solutions-showcase">
          <motion.div 
            ref={visualRef}
            className="solutions-visual"
            variants={visualVariants}
            initial="hidden"
            animate={visualControls}
            transition={{ duration: 1, ease: "easeOut" }}
          >
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
                <motion.div
                  key={solution.id}
                  className={`solution-indicator ${index === activeSolution ? 'active' : ''}`}
                  onClick={() => setActiveSolution(index)}
                  style={{ '--indicator-color': solution.color } as any}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="indicator-icon">{solution.icon}</span>
                  <span className="indicator-label">{solution.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            ref={contentRef}
            className="solutions-content"
            variants={contentVariants}
            initial="hidden"
            animate={contentControls}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
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
              <button className="btn btn-primary" onClick={() => navigate('/solutions')}>
                <span>Khám phá chi tiết</span>
                <span className="btn-icon">→</span>
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/contactus')}>
                <span>Liên hệ tư vấn</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsShowcase;
