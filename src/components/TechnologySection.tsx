import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';

// 3D Model Components
const RobotModel = () => {
  const [error, setError] = useState(false);
  
  if (error) {
    return <ModelFallback color="#00d4ff" />;
  }
  
  try {
    const { scene } = useGLTF('/logistic_robot_test__2.glb');
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.warn('Error loading Robot Model:', error);
    setError(true);
    return <ModelFallback color="#00d4ff" />;
  }
};

const LaserModel = () => {
  const [error, setError] = useState(false);
  
  if (error) {
    return <ModelFallback color="#ff6b35" />;
  }
  
  try {
    const { scene } = useGLTF('/simulation_laser_cutting_robot_systems.glb');
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.warn('Error loading Laser Model:', error);
    setError(true);
    return <ModelFallback color="#ff6b35" />;
  }
};

const AGVModel = () => {
  const [error, setError] = useState(false);
  
  if (error) {
    return <ModelFallback color="#8b5cf6" />;
  }
  
  try {
    const { scene } = useGLTF('/industrial_-_3d_agv__trolley_-_omrom.glb');
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.warn('Error loading AGV Model:', error);
    setError(true);
    return <ModelFallback color="#8b5cf6" />;
  }
};

const ModelFallback = ({ color }: { color: string }) => (
  <mesh>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const TechnologySection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTechnology, setActiveTechnology] = useState(0);

  const technologies = [
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      category: 'Artificial Intelligence',
      description: 'Công nghệ trí tuệ nhân tạo và học máy tiên tiến cho tự động hóa thông minh.',
      features: [
        'Computer Vision',
        'Natural Language Processing',
        'Predictive Analytics',
        'Deep Learning',
        'Neural Networks',
        'Reinforcement Learning'
      ],
      applications: [
        'Nhận diện hình ảnh',
        'Xử lý ngôn ngữ tự nhiên',
        'Dự đoán bảo trì',
        'Tối ưu hóa quy trình',
        'Kiểm soát chất lượng',
        'Phân tích dữ liệu'
      ],
      model: RobotModel,
      color: '#00d4ff',
      icon: '🧠'
    },
    {
      id: 'iot',
      name: 'Internet of Things',
      category: 'IoT & Connectivity',
      description: 'Hệ thống kết nối thiết bị thông minh và thu thập dữ liệu real-time.',
      features: [
        'Sensor Networks',
        'Real-time Monitoring',
        'Cloud Integration',
        'Edge Computing',
        'Wireless Communication',
        'Data Analytics'
      ],
      applications: [
        'Giám sát nhà máy',
        'Quản lý năng lượng',
        'Theo dõi tài sản',
        'Bảo trì dự đoán',
        'An toàn lao động',
        'Tối ưu hóa sản xuất'
      ],
      model: LaserModel,
      color: '#ff6b35',
      icon: '🌐'
    },
    {
      id: 'robotics',
      name: 'Industrial Robotics',
      category: 'Advanced Robotics',
      description: 'Robot công nghiệp thông minh với độ chính xác cao và khả năng thích ứng.',
      features: [
        'Collaborative Robots',
        'Precision Control',
        'Safety Systems',
        'Easy Programming',
        'Flexible Integration',
        'Remote Monitoring'
      ],
      applications: [
        'Lắp ráp tự động',
        'Hàn và cắt',
        'Xử lý vật liệu',
        'Kiểm tra chất lượng',
        'Đóng gói',
        'Vận chuyển'
      ],
      model: AGVModel,
      color: '#8b5cf6',
      icon: '🤖'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechnology((prev) => (prev + 1) % technologies.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [technologies.length]);

  const currentTech = technologies[activeTechnology];
  const ModelComponent = currentTech?.model;

  if (!currentTech || !ModelComponent) {
    return (
      <section className="technology-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Công nghệ Tiên tiến</h2>
            <p className="section-subtitle">
              Khám phá các công nghệ hiện đại trong tự động hóa và robot
            </p>
          </div>
          <div className="loading-3d">
            <div className="spinner"></div>
            <p>Đang tải công nghệ...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="technology-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Công nghệ Tiên tiến</h2>
          <p className="section-subtitle">
            Khám phá các công nghệ hiện đại trong tự động hóa và robot
          </p>
        </div>

        <div className="technology-showcase">
          <div className="technology-visual">
            <div className="technology-3d-container">
              <Canvas
                camera={{ position: [0, 0, 8], fov: 50 }}
                onError={(error) => console.warn('Canvas error:', error)}
              >
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Float
                  speed={2}
                  rotationIntensity={0.5}
                  floatIntensity={0.5}
                >
                  <ModelComponent />
                </Float>
                <OrbitControls 
                  enableZoom={true}
                  enablePan={false}
                  enableRotate={true}
                  zoomSpeed={0.5}
                  rotateSpeed={0.5}
                  minDistance={4}
                  maxDistance={12}
                />
                <Environment preset="city" />
              </Canvas>
            </div>
            
            <div className="technology-indicators">
              {technologies.map((tech, index) => (
                <button
                  key={tech.id}
                  className={`technology-indicator ${activeTechnology === index ? 'active' : ''}`}
                  onClick={() => setActiveTechnology(index)}
                  style={{ '--indicator-color': tech.color } as any}
                >
                  <span className="indicator-icon">{tech.icon}</span>
                  <span style={{color: 'var(--text-primary)'}} className="indicator-label">{tech.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="technology-details">
            <div className="technology-header">
              <div className="technology-badge" style={{ '--badge-color': currentTech.color } as any}>
                <span>{currentTech.icon}</span>
                <span>{currentTech.category}</span>
              </div>
              
              <h3 className="technology-name">{currentTech.name}</h3>
              <p className="technology-description">{currentTech.description}</p>
            </div>

            <div className="technology-content">
              <div className="technology-features">
                <h4>Tính năng chính</h4>
                <ul>
                  {currentTech.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-icon">⚡</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="technology-applications">
                <h4>Ứng dụng</h4>
                <div className="applications-grid">
                  {currentTech.applications.map((app, index) => (
                    <div key={index} className="application-item">
                      <span className="app-icon">🎯</span>
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="technology-actions">
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/solutions')}
              >
                <span>💡</span>
                <span>Xem giải pháp</span>
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/products')}
              >
                <span>🤖</span>
                <span>Sản phẩm</span>
              </button>
            </div>
          </div>
        </div>

        {/* Technology Stats */}
        <div className="technology-stats">
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Độ chính xác</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Hoạt động</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50%</div>
            <div className="stat-label">Tiết kiệm chi phí</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">300%</div>
            <div className="stat-label">Tăng hiệu suất</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection; 