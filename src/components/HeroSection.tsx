import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

const HeroSection: React.FC = () => {
  const { setCurrentSection } = useAppStore();
  const [currentStat, setCurrentStat] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    // Animate stats
    const targetStat = 500;
    const duration = 2000;
    const increment = targetStat / (duration / 16);
    
    const timer = setInterval(() => {
      setCurrentStat(prev => {
        if (prev >= targetStat) {
          clearInterval(timer);
          return targetStat;
        }
        return Math.min(prev + increment, targetStat);
      });
    }, 16);

    // Set loaded state
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Auto rotate features
    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);

    return () => {
      clearInterval(timer);
      clearTimeout(loadTimer);
      clearInterval(featureTimer);
    };
  }, []);

  const features = [
    {
      icon: "🤖",
      title: "Robot AGV Thông Minh",
      description: "Hệ thống robot tự động di chuyển với AI và cảm biến tiên tiến"
    },
    {
      icon: "⚡",
      title: "Tự Động Hóa Toàn Diện",
      description: "Giải pháp tích hợp cho mọi quy trình sản xuất và logistics"
    },
    {
      icon: "🌐",
      title: "Kết Nối IoT",
      description: "Hệ thống giám sát và điều khiển thời gian thực qua IoT"
    }
  ];

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Main Hero Content */}
        <div className="hero-main">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🚀</span>
              <span>Giải pháp Robot thông minh</span>
            </div>
            
            <h1 className="hero-title">
              Tương lai của
              <span className="hero-title-highlight"> Tự động hóa</span>
              <br />
              bắt đầu từ đây
            </h1>
            
            <p className="hero-subtitle">
              Chúng tôi cung cấp các giải pháp robot tự động hóa tiên tiến, 
              giúp doanh nghiệp tối ưu hóa quy trình sản xuất và nâng cao hiệu quả hoạt động.
            </p>
            
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentSection('products')}
              >
                <span>🤖</span>
                <span>Khám phá sản phẩm</span>
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => setCurrentSection('solutions')}
              >
                <span>💡</span>
                <span>Giải pháp</span>
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{Math.round(currentStat)}+</div>
                <div className="hero-stat-label">Dự án thành công</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">15+</div>
                <div className="hero-stat-label">Năm kinh nghiệm</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">99%</div>
                <div className="hero-stat-label">Khách hàng hài lòng</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-image-main">
              <img src="/robot1.png" alt="Robot tự động chính" />
            </div>
          </div>
        </div>

        {/* Robot Showcase Grid */}
        <div className="hero-robots-showcase">
          <div className="robots-grid">
            <div className="robot-card">
              <div className="robot-image">
                <img src="/robot2.png" alt="Robot AGV" />
              </div>
              <div className="robot-info">
                <h4>AGV Robot</h4>
                <p>Tự động di chuyển hàng hóa</p>
              </div>
            </div>
            
            <div className="robot-card">
              <div className="robot-image">
                <img src="/robot3.png" alt="Robot Assembly" />
              </div>
              <div className="robot-info">
                <h4>Assembly Robot</h4>
                <p>Lắp ráp tự động chính xác</p>
              </div>
            </div>
            
            <div className="robot-card">
              <div className="robot-image">
                <img src="/robot4.png" alt="Robot Logistics" />
              </div>
              <div className="robot-info">
                <h4>Logistics Robot</h4>
                <p>Quản lý kho thông minh</p>
              </div>
            </div>
            
            <div className="robot-card">
              <div className="robot-image">
                <img src="/robot5.png" alt="Robot Manufacturing" />
              </div>
              <div className="robot-info">
                <h4>Manufacturing Robot</h4>
                <p>Sản xuất tự động hóa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="hero-features">
          <div className="features-container">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${index === activeFeature ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
                <div className="feature-arrow">→</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Highlights */}
        <div className="hero-tech-highlights">
          <div className="tech-highlights-grid">
            <div className="tech-highlight">
              <div className="tech-icon">🔋</div>
              <div className="tech-content">
                <h4>Pin Li-ion</h4>
                <p>Thời gian hoạt động lên đến 8 giờ</p>
              </div>
            </div>
            
            <div className="tech-highlight">
              <div className="tech-icon">📡</div>
              <div className="tech-content">
                <h4>5G Connectivity</h4>
                <p>Kết nối siêu nhanh và ổn định</p>
              </div>
            </div>
            
            <div className="tech-highlight">
              <div className="tech-icon">🎯</div>
              <div className="tech-content">
                <h4>AI Navigation</h4>
                <p>Định vị chính xác với AI</p>
              </div>
            </div>
            
            <div className="tech-highlight">
              <div className="tech-icon">🛡️</div>
              <div className="tech-content">
                <h4>Safety System</h4>
                <p>Hệ thống an toàn đa lớp</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="hero-cta">
          <div className="cta-content">
            <h3>Sẵn sàng chuyển đổi số?</h3>
            <p>Liên hệ ngay để được tư vấn miễn phí và demo trực tiếp</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">
                <span>📞</span>
                <span>Liên hệ ngay</span>
              </button>
              <button className="btn btn-outline">
                <span>📋</span>
                <span>Yêu cầu demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 