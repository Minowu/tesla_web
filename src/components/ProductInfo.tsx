import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import { useAppStore } from '../store/appStore';

// 3D Model Components
const RobotModel = () => {
  const [error, setError] = useState(false);
  
  if (error) {
    return <ModelFallback color="#00d4ff" />;
  }
  
  try {
    const { scene } = useGLTF('/models/logistic_robot_test__2.glb');
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.warn('Error loading Robot Model:', error);
    setError(true);
    return <ModelFallback color="#00d4ff" />;
  }
};

const AGVModel = () => {
  const [error, setError] = useState(false);
  
  if (error) {
    return <ModelFallback color="#ff6b35" />;
  }
  
  try {
    const { scene } = useGLTF('/models/industrial_-_3d_agv__trolley_-_omrom.glb');
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.warn('Error loading AGV Model:', error);
    setError(true);
    return <ModelFallback color="#ff6b35" />;
  }
};

const LaserModel = () => {
  const [error, setError] = useState(false);
  
  if (error) {
    return <ModelFallback color="#8b5cf6" />;
  }
  
  try {
    const { scene } = useGLTF('/models/simulation_laser_cutting_robot_systems.glb');
    return <primitive object={scene} scale={0.8} />;
  } catch (error) {
    console.warn('Error loading Laser Model:', error);
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

const ProductInfo: React.FC = () => {
  const { setCurrentSection } = useAppStore();
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      id: 'industrial-robot',
      name: 'Robot Công nghiệp',
      category: 'Industrial Robotics',
      description: 'Robot công nghiệp 6 trục với độ chính xác cao, phù hợp cho các ứng dụng lắp ráp, hàn, và xử lý vật liệu.',
      features: [
        'Độ chính xác ±0.02mm',
        'Tải trọng 6-20kg',
        'Tầm với 1.4-2.1m',
        'Tích hợp AI Vision',
        'Giao diện người dùng thân thiện',
        'Bảo trì dễ dàng'
      ],
      specs: {
        'Tốc độ': '2.5 m/s',
        'Độ chính xác': '±0.02mm',
        'Tải trọng': '6-20kg',
        'Tầm với': '1.4-2.1m',
        'Nguồn điện': '220V/380V',
        'Bảo hành': '24 tháng'
      },
      model: RobotModel,
      color: '#00d4ff',
      icon: '🤖'
    },
    {
      id: 'agv-system',
      name: 'Hệ thống AGV',
      category: 'Automated Guided Vehicle',
      description: 'Xe tự hành AGV thông minh cho vận chuyển và logistics trong nhà máy, kho bãi.',
      features: [
        'Điều hướng SLAM',
        'Tải trọng 500-2000kg',
        'Tốc độ 1.5 m/s',
        'Pin Li-ion 8-12h',
        'Hệ thống an toàn đa lớp',
        'Tích hợp WMS/ERP'
      ],
      specs: {
        'Tốc độ': '1.5 m/s',
        'Tải trọng': '500-2000kg',
        'Pin': 'Li-ion 8-12h',
        'Độ chính xác': '±10mm',
        'Nhiệt độ': '-10°C ~ 50°C',
        'Bảo hành': '18 tháng'
      },
      model: AGVModel,
      color: '#ff6b35',
      icon: '🚗'
    },
    {
      id: 'laser-cutting',
      name: 'Máy Cắt Laser',
      category: 'Laser Cutting System',
      description: 'Hệ thống cắt laser CNC tự động với công nghệ fiber laser, phù hợp cho sản xuất công nghiệp.',
      features: [
        'Công suất 1-6kW',
        'Độ chính xác ±0.1mm',
        'Tốc độ cắt cao',
        'Tự động thay đổi lens',
        'Hệ thống làm mát',
        'Giao diện CNC'
      ],
      specs: {
        'Công suất': '1-6kW',
        'Độ chính xác': '±0.1mm',
        'Tốc độ cắt': '50m/min',
        'Kích thước bàn': '1500x3000mm',
        'Độ dày tối đa': '25mm',
        'Bảo hành': '12 tháng'
      },
      model: LaserModel,
      color: '#8b5cf6',
      icon: '⚡'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[activeProduct];
  const ModelComponent = currentProduct?.model;

  if (!currentProduct || !ModelComponent) {
    return (
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sản phẩm Công nghệ</h2>
            <p className="section-subtitle">
              Khám phá các sản phẩm robot và tự động hóa tiên tiến của chúng tôi
            </p>
          </div>
          <div className="loading-3d">
            <div className="spinner"></div>
            <p>Đang tải sản phẩm...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Sản phẩm Công nghệ</h2>
          <p className="section-subtitle">
            Khám phá các sản phẩm robot và tự động hóa tiên tiến của chúng tôi
          </p>
        </div>

        <div className="product-showcase">
          <div className="product-visual">
            <div className="product-3d-container">
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
            
            <div className="product-indicators">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  className={`product-indicator ${activeProduct === index ? 'active' : ''}`}
                  onClick={() => setActiveProduct(index)}
                  style={{ '--indicator-color': product.color } as any}
                >
                  <span className="indicator-icon">{product.icon}</span>
                  <span className="indicator-label">{product.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="product-details">
            <div className="product-header">
              <div className="product-badge" style={{ '--badge-color': currentProduct.color } as any}>
                <span>{currentProduct.icon}</span>
                <span>{currentProduct.category}</span>
              </div>
              
              <h3 className="product-name">{currentProduct.name}</h3>
              <p className="product-description">{currentProduct.description}</p>
            </div>

            <div className="product-content">
              <div className="product-features">
                <h4>Tính năng nổi bật</h4>
                <ul>
                  {currentProduct.features.map((feature, index) => (
                    <li key={index}>
                      <span className="feature-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="product-specs">
                <h4>Thông số kỹ thuật</h4>
                <div className="specs-grid">
                  {Object.entries(currentProduct.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentSection('contact')}
              >
                <span>📞</span>
                <span>Tư vấn ngay</span>
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentSection('solutions')}
              >
                <span>💡</span>
                <span>Xem giải pháp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo; 