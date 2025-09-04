import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Float, Html } from '@react-three/drei';
import { useAppStore } from '../store/appStore';



interface Solution {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  features: string[];
  applications: string[];
  modelPath: string;
  stats: {
    label: string;
    value: string;
  }[];
  benefits: string[];
  technology: string[];
}

// 3D Model Component
const ModelComponent: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  try {
    const { scene } = useGLTF(modelPath);
    
    return (
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <primitive object={scene} scale={1.5} />
      </Float>
    );
  } catch (error) {
    console.error('Error loading 3D model:', error);
    return (
      <Html center>
        <div className="model-error">
          <div className="error-icon">⚠️</div>
          <h3>Không thể tải model 3D</h3>
          <p>Vui lòng thử lại sau</p>
        </div>
      </Html>
    );
  }
};

const solutions: Solution[] = [
  {
    id: 'agv',
    title: 'AGV Tự động',
    titleEn: 'Automated Guided Vehicle',
    description: 'Hệ thống xe tự động dẫn đường thông minh cho logistics và sản xuất',
    icon: '🚛',
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, #00d4ff, #0099cc)',
    features: [
      'Dẫn đường laser SLAM',
      'Tải trọng 500-2000kg',
      'Tích hợp WMS/ERP',
      'Bảo mật đa lớp',
      'Báo cáo real-time',
      'Bảo trì dự đoán'
    ],
    applications: [
      'Kho hàng tự động',
      'Sản xuất linh hoạt',
      'Bệnh viện',
      'Trung tâm phân phối',
      'Nhà máy thông minh',
      'Logistics'
    ],
    modelPath: '/assets/models/industrial_-_3d_agv__trolley_-_omrom.glb',
    stats: [
      { label: 'Tải trọng', value: '2000kg' },
      { label: 'Tốc độ', value: '2m/s' },
      { label: 'Pin', value: '8h' },
      { label: 'Độ chính xác', value: '±5mm' }
    ],
    benefits: [
      'Giảm 60% chi phí vận hành',
      'Tăng 80% hiệu suất',
      'An toàn 100%',
      'Linh hoạt 24/7'
    ],
    technology: [
      'SLAM Navigation',
      'LiDAR Sensing',
      'AI Path Planning',
      '5G Connectivity',
      'Edge Computing',
      'IoT Integration'
    ]
  },
  {
    id: 'amr',
    title: 'Camera AI nhận diện',
    titleEn: 'Autonomous Mobile Robot',
    description: 'Robot di động tự chủ với AI tiên tiến cho môi trường phức tạp',
    icon: '🤖',
    color: '#ff6b35',
    gradient: 'linear-gradient(135deg, #ff6b35, #cc5500)',
    features: [
      'AI Navigation',
      'Multi-sensor fusion',
      'Dynamic path planning',
      'Human detection',
      'Voice control',
      'Cloud integration'
    ],
    applications: [
      'E-commerce',
      'Manufacturing',
      'Healthcare',
      'Retail',
      'Education',
      'Research'
    ],
    modelPath: '/assets/models/logistic_robot_test__2.glb',
    stats: [
      { label: 'Tải trọng', value: '1500kg' },
      { label: 'Tốc độ', value: '1.5m/s' },
      { label: 'Pin', value: '10h' },
      { label: 'Độ chính xác', value: '±3mm' }
    ],
    benefits: [
      'Tự học và thích nghi',
      'Tương tác tự nhiên',
      'Bảo mật cao',
      'Mở rộng dễ dàng'
    ],
    technology: [
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Cloud AI',
      '5G Network',
      'Blockchain'
    ]
  },
  
  {
    id: 'warehouse',
    title: 'Kho thông minh',
    titleEn: 'Smart Warehouse',
    description: 'Hệ thống kho tự động hóa hoàn toàn với robot và AI',
    icon: '🏭',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    features: [
      'AS/RS System',
      'Multi-level storage',
      'Automated picking',
      'Real-time tracking',
      'Predictive analytics',
      'Energy optimization'
    ],
    applications: [
      'E-commerce',
      'Manufacturing',
      'Pharmaceuticals',
      'Food & Beverage',
      'Automotive',
      'Electronics'
    ],
    modelPath: '/assets/models/assembly_solar.glb',
    stats: [
      { label: 'Dung tích', value: '50,000m³' },
      { label: 'Thông lượng', value: '10,000/h' },
      { label: 'Độ chính xác', value: '99.9%' },
      { label: 'Tiết kiệm', value: '70%' }
    ],
    benefits: [
      'Tối ưu không gian',
      'Giảm lỗi',
      'Tăng tốc độ',
      'Tiết kiệm chi phí'
    ],
    technology: [
      'AS/RS Technology',
      'WMS Integration',
      'IoT Sensors',
      'AI Analytics',
      'Cloud Platform',
      'Digital Twin'
    ]
  }
];

const Solutions3DViewer: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<Solution>(solutions[0]!);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'technology' | 'benefits'>('overview');
  const { setCurrentSection } = useAppStore();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="solutions-loading">
        <div className="loading-spinner"></div>
        <h2>Đang tải giải pháp...</h2>
      </div>
    );
  }

  return (
    <div className="solutions-3d-viewer">
      {/* Hero Section */}
      <div className="solutions-hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🚀</span>
            <span>Giải pháp Công nghệ Hàng đầu</span>
          </div>
          <h1 className="hero-title">
            Tương lai của <span className="title-highlight">Tự động hóa</span> bắt đầu từ đây
          </h1>
          <p className="hero-subtitle">
            Khám phá các giải pháp robot tự động hóa tiên tiến được thiết kế đặc biệt cho Industry 4.0
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Dự án thành công</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Năm kinh nghiệm</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="solutions-main">
        <div className="solutions-grid">
          {/* Menu Panel */}
          <div className="solutions-menu-panel">
            <div className="menu-header">
              <h3>Giải pháp của chúng tôi</h3>
              <p>Chọn giải pháp để xem chi tiết</p>
            </div>
            <div className="solutions-menu">
              {solutions.map((solution) => (
                <motion.div
                  key={solution.id}
                  className={`solution-menu-item ${selectedSolution.id === solution.id ? 'active' : ''}`}
                  onClick={() => setSelectedSolution(solution)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="menu-item-content">
                    <div className="menu-item-info">
                      <h4 className="menu-item-title">{solution.title}</h4>
                      <p className="menu-item-subtitle">{solution.titleEn}</p>
                      <p className="menu-item-description">{solution.description}</p>
                    </div>
                    <div className="menu-item-arrow">→</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="solution-details-panel">
            <div className="solution-header">
              <div className="solution-info">
                <h2 className="solution-title">{selectedSolution.title}</h2>
                <p className="solution-subtitle">{selectedSolution.titleEn}</p>
                <p className="solution-description">{selectedSolution.description}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="solution-stats">
              {selectedSolution.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="stat-value" style={{ color: 'var(--primary)' }}>
                    {stat.value}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <div className="solution-tabs">
              <button
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Tổng quan
              </button>
              <button
                className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                onClick={() => setActiveTab('features')}
              >
                Tính năng
              </button>
              <button
                className={`tab-btn ${activeTab === 'technology' ? 'active' : ''}`}
                onClick={() => setActiveTab('technology')}
              >
                Công nghệ
              </button>
              <button
                className={`tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                onClick={() => setActiveTab('benefits')}
              >
                Lợi ích
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="tab-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && (
                    <div className="overview-content">
                      <div className="overview-section">
                        <h3>Ứng dụng chính</h3>
                        <div className="applications-grid">
                          {selectedSolution.applications.map((app, index) => (
                            <motion.div
                              key={index}
                              className="application-tag"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              {app}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="features-content">
                      <div className="features-grid">
                        {selectedSolution.features.map((feature, index) => (
                          <motion.div
                            key={index}
                            className="feature-item"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="feature-icon" style={{ color: 'var(--primary)' }}>✓</div>
                            <div className="feature-text">{feature}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'technology' && (
                    <div className="technology-content">
                      <div className="technology-grid">
                        {selectedSolution.technology.map((tech, index) => (
                          <motion.div
                            key={index}
                            className="technology-item"
                            style={{ background: 'var(--gradient-primary)' }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'benefits' && (
                    <div className="benefits-content">
                      <div className="benefits-grid">
                        {selectedSolution.benefits.map((benefit, index) => (
                          <motion.div
                            key={index}
                            className="benefit-item"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="benefit-text">{benefit}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* CTA Buttons */}
            <div className="solution-cta">
              <button
                className="btn btn-primary"
                style={{ background: 'var(--gradient-primary)' }}
                onClick={() => setCurrentSection('contact')}
              >
                <span>Tư vấn triển khai</span>
              </button>
              <button className="btn btn-secondary">
                <span>Tải brochure</span>
              </button>
              <button className="btn btn-outline">
                <span>Xem demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Model Section */}
      <div className="model-section">
        <div className="model-header">
          <h2>Mô hình 3D {selectedSolution.title}</h2>
          <p>Tương tác với mô hình 3D để khám phá chi tiết kỹ thuật</p>
        </div>
        <div className="model-viewer-container">
          <div className="model-viewer">
            <Suspense fallback={
              <div className="model-loading">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Đang tải model 3D...</p>
              </div>
            }>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                style={{ width: '100%', height: '500px' }}
              >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
                <ModelComponent modelPath={selectedSolution.modelPath} />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Environment preset="city" />
              </Canvas>
            </Suspense>
            <div className="model-controls">
              <button className="control-btn">
                <span>Xoay</span>
              </button>
              <button className="control-btn">
                <span>Zoom</span>
              </button>
              <button className="control-btn">
                <span>VR</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="contact-cta-section">
        <div className="cta-content">
          <h2>Sẵn sàng bắt đầu dự án của bạn?</h2>
          <p>Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết</p>
          <div className="cta-buttons">
            <button className="btn btn-primary" onClick={() => setCurrentSection('contact')}>
              <span>Liên hệ ngay</span>
            </button>
            <button className="btn btn-secondary">
              <span>Yêu cầu demo</span>
            </button>
          </div>
        </div>
      </div>


      {/* Chat Button */}
      <div className="chat-button">
        <a href="http://zaloapp.com/qr/p/9c0gt66v8htn"style={{textDecoration: 'none',color: 'var(--text-primary)'}}>
        <span className="chat-icon">💬</span>
        <span className="chat-text">Chat với chúng tôi</span>
        <span className="chat-emoji">👋</span>
        </a>
      </div>
    </div>
  );
};

export default Solutions3DViewer; 