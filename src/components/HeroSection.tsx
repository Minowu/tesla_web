import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import AnimatedCounter from './AnimatedCounter';  
import {motion, useInView, useAnimation} from 'framer-motion';

const HeroSection: React.FC = () => {
  const { setCurrentSection } = useAppStore();
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  // Tạo separate refs và controls cho từng animation
  const heroVisualRef = useRef(null);
  const aboutImageRef = useRef(null);
  const robotCardsRef = useRef(null);
  const featuresRef = useRef(null);
  const techHighlightsRef = useRef(null);
  
  const heroVisualInView = useInView(heroVisualRef, { once: true });
  const aboutImageInView = useInView(aboutImageRef, { once: true });
  const robotCardsInView = useInView(robotCardsRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });
  const techHighlightsInView = useInView(techHighlightsRef, { once: true });
  
  const heroVisualControls = useAnimation();
  const aboutImageControls = useAnimation();
  const robotCardsControls = useAnimation();
  const featuresControls = useAnimation();
  const techHighlightsControls = useAnimation();
  
  // Animation cho hero visual
  useEffect(() => {
    if (heroVisualInView) {
      heroVisualControls.start("visible");
    } 
  }, [heroVisualInView]);

  // Animation cho about image
  useEffect(() => {
    if (aboutImageInView) {
      aboutImageControls.start("visible");
    } 
  }, [aboutImageInView]);

  // Animation cho robot cards
  useEffect(() => {
    if (robotCardsInView) {
      robotCardsControls.start("visible");
    } 
  }, [robotCardsInView]);

  // Animation cho features
  useEffect(() => {
    if (featuresInView) {
      featuresControls.start("visible");
    } 
  }, [featuresInView]);

  // Animation cho tech highlights
  useEffect(() => {
    if (techHighlightsInView) {
      techHighlightsControls.start("visible");
    } 
  }, [techHighlightsInView]);
  
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

    // Auto rotate features
    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 3);
    }, 4000);

    return () => {
      clearInterval(timer);
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
      title: "Camera AI nhận diện",
      description: "Phát hiện và nhận diện vật thể với độ chính xác cao "
    },
    {
      icon: "🌐",
      title: "Kho thông minh",
      description: "Tự động hóa quy trình vận hành kho, đảm bảo độ an toàn và hiệu quả"
    }
  ];

  // Variants cho các animations
  const heroVisualVariants = {
    hidden: { opacity: 0.1, x: 300 },
    visible: { opacity: 1, x: 0 }
  };

  const aboutImageVariants = {
    hidden: { opacity: 0.2, y: 200 },
    visible: { opacity: 1, y: 0 }
  };

  const robotCardVariants = {
    hidden: { opacity: 0.2, x: 600 },
    visible: { opacity: 1, x: 0 }
  };

  const featuresVariants = {
    hidden: { opacity: 0.2, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  const techHighlightsVariants = {
    hidden: { opacity: 0.2, y: 80 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="hero">
      <div className="hero-background">
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
        <section className='section-stack-cards'>
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
                  onClick={() => navigate('/products')}
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
            </div>
            
            <motion.div 
              ref={heroVisualRef}
              className="hero-visual"
              variants={heroVisualVariants}
              initial="hidden"
              animate={heroVisualControls}
              transition={{ duration: 1, delay: 0.2, ease: 'easeInOut'}}
            >
              <div className="hero-image-main">
                <img src="/robot1.png" alt="Robot tự động chính" />
              </div>
            </motion.div>
          </div>
          <div className="hero-logo">
              <div className="hero-logo-main">
                <img src="/1.png" alt="Logo ThaDo Robot" />
              </div>
            </div>
        </section>
        
        <section className='section-stack-cards'>
          <div className="section-header" style={{position: 'sticky',top: '80px',margin: 'var(--space-3xl) 0',borderRadius: 'var(--radius-xl)',padding: 'var(--space-2xl)',background: 'var(--bg-glass-sticky)',backdropFilter: 'blur(20px)'}}>
            <h2 className="section-title">Về <span style={{color: 'var(--primary)'}} className="text-company">Thadorobot</span></h2>
            
            <div className="hero-about-layout">
              <motion.div 
                ref={aboutImageRef}
                className="hero-about-image"
                variants={aboutImageVariants}
                initial="hidden"
                animate={aboutImageControls}
                transition={{ duration: 1, delay: 0.3}}
              >
                <img src="../Office_aboutus.png" alt="Logo ThaDo Robot" />
              </motion.div>
              
              <div className="hero-about-content">
                <p className="section-subtitle">
                là một doanh nghiệp hàng đầu tại Việt Nam, chuyên cung cấp các giải pháp công nghệ tiên tiến trong lĩnh vực Robot và Nhà máy thông minh. Chúng tôi hoạt động mạnh mẽ trong các lĩnh vực chủ chốt như Hệ thống đóng gói tự động (APS), Giải pháp tự động hóa nhà máy (FAS), và Giải pháp quản lý kho thông minh (SWS)
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-number"><AnimatedCounter from={0} to={Math.round(currentStat)}/>+</div>
                      <div className="hero-stat-label">Dự án thành công</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-number"><AnimatedCounter from={0} to={5}/>+</div>
                      <div className="hero-stat-label">Năm kinh nghiệm</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-number"><AnimatedCounter from={0} to={99}/>%</div>
                      <div className="hero-stat-label">Khách hàng hài lòng</div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Robot Showcase */}
        <section className='section-stack-cards'>
          <div className="hero-robots-showcase">
            <h2 className="hero-robots-showcase-title"> Sản phẩm của chúng tôi</h2>
            <div ref={robotCardsRef} className="robots-grid">
              {[
                { img: "/robot2.png", title: "AGV Robot", desc: "Tự động di chuyển hàng hóa" },
                { img: "/robot3.png", title: "Assembly Robot", desc: "Lắp ráp tự động chính xác" },
                { img: "/robot4.png", title: "Logistics Robot", desc: "Quản lý kho thông minh" },
                { img: "/robot5.png", title: "Manufacturing Robot", desc: "Sản xuất tự động hóa" }
              ].map((robot, index) => (
                <motion.div 
                  key={index}
                  className="robot-card"
                  onClick={() => navigate('/products')}
                  style={{ cursor: 'pointer' }}
                  variants={{
                    hidden: { opacity: 0.2, x: 600 - (index * 100) },
                    visible: { opacity: 1, x: 0 }
                  }}
                  initial="hidden"
                  animate={robotCardsControls}
                  transition={{ duration: 1.2, delay: index * 0.1 }}
                >
                  <div className="robot-image">
                    <img src={robot.img} alt={robot.title} />
                  </div>
                  <div className="robot-info">
                    <h4>{robot.title}</h4>
                    <p>{robot.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className='section-stack-cards'>
          <div className="hero-solution">
            <h2 className="hero-solution-title"> Giải pháp của chúng tôi</h2>
            {/* Features Section */}
            <div className="hero-features">
              <motion.div 
                ref={featuresRef}
                className="features-container"
                variants={featuresVariants}
                initial="hidden"
                animate={featuresControls}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
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
              </motion.div>
            </div>

            {/* Technology Highlights */}
            <div className="hero-tech-highlights">
              <motion.div 
                ref={techHighlightsRef}
                className="tech-highlights-grid"
                variants={techHighlightsVariants}
                initial="hidden"
                animate={techHighlightsControls}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
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
              </motion.div>
            </div>
          </div>
        </section>
        {/* Call to Action */}
        {/* <div className="hero-cta">
          <div className="cta-content">
            <h3>Sẵn sàng chuyển đổi số?</h3>
            <p>Liên hệ ngay để được tư vấn miễn phí và demo trực tiếp</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentSection('contact')}
              >
                <span>📞</span>
                <span>Liên hệ ngay</span>
              </button>
              <button className="btn btn-outline">
                <span>📋</span>
                <span>Yêu cầu demo</span>
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;