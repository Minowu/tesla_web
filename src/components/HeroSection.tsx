import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {motion, useInView, useAnimation, animate} from 'framer-motion';
import productsData from '../data/products.json';
import type { Brand, Product } from '../types/products';
import { useTranslation } from 'react-i18next';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeFeature, setActiveFeature] = useState(0);
  
  // States cho animated counters
  const [projectsCount, setProjectsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [satisfactionCount, setSatisfactionCount] = useState(0);

  // Tạo separate refs và controls cho từng animation
  const heroVisualRef = useRef(null);
  const aboutImageRef = useRef(null);
  const robotCardsRef = useRef(null);
  
  const heroVisualInView = useInView(heroVisualRef, { once: false });
  const aboutImageInView = useInView(aboutImageRef, { once: true });
  const robotCardsInView = useInView(robotCardsRef, { once: true,amount:0.8 });
  
  const heroVisualControls = useAnimation();
  const aboutImageControls = useAnimation();
  const robotCardsControls = useAnimation();
  
  // Animation cho hero visual
  useEffect(() => {
    if (heroVisualInView) {
      heroVisualControls.start("visible");
    } 
  }, [heroVisualInView]);

  // Animation cho about image và counters
  useEffect(() => {
    if (aboutImageInView) {
      aboutImageControls.start("visible");
      
      // Animate counters cùng lúc với about image
      const animateCounters = () => {
        // Animate projects count
        animate(0, 500, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (value) => setProjectsCount(Math.round(value))
        });
        
        // Animate years count
        animate(0, 5, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (value) => setYearsCount(Math.round(value))
        });
        
        // Animate satisfaction count
        animate(0, 99, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (value) => setSatisfactionCount(Math.round(value))
        });
      };
      
      animateCounters();
    } 
  }, [aboutImageInView]);

  // Animation cho robot cards
  useEffect(() => {
    if (robotCardsInView) {
      robotCardsControls.start("visible");
    } 
  }, [robotCardsInView]);
  
  const features = [
    {
      title: t('hero.feature_1_title'),
      description: t('hero.feature_1_desc')
    },
    {
      title: t('hero.feature_2_title'),
      description: t('hero.feature_2_desc')
    },
    {
      title: t('hero.feature_3_title'),
      description: t('hero.feature_3_desc')
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

  // (đã dùng inline variants cho card)

  const featuresVariants = {
    hidden: { opacity: 0.2, y: 100 },
    visible: { opacity: 1, y: 0 }
  };

  const techHighlightsVariants = {
    hidden: { opacity: 0.2, y: 80 },
    visible: { opacity: 1, y: 0 }
  };

  // Chọn 4 sản phẩm từ 4 danh mục khác nhau
  const getShowcaseProducts = (): Product[] => {
    const brands: Brand[] = (productsData as any).brands as Brand[];
    const selected: Product[] = [];
    const seenCategories = new Set<string>();

    for (const brand of brands) {
      for (const category of brand.categories) {
        if (seenCategories.has(category.id)) continue;
        const firstProduct = category.products[0];
        if (firstProduct) {
          selected.push(firstProduct);
          seenCategories.add(category.id);
          if (selected.length === 4) return selected;
        }
      }
    }
    return selected.slice(0, 4);
  };

  const showcaseProducts = getShowcaseProducts();

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
                <span>{t('hero.badge')}</span>
              </div>
              
              <h1 className="hero-title">
                {t('hero.title_line1')}
                <span className="hero-title-highlight"> {t('hero.title_highlight')}</span>
                <br />
                {t('hero.title_line2')}
              </h1>
              
              <p className="hero-subtitle">
                {t('hero.subtitle')}
              </p>
              
              <div className="hero-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/products')}
                >
                  <span>{t('hero.btn_products')}</span>
                </button>
                
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/solutions')}
                >
                  <span>{t('hero.btn_solutions')}</span>
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
                <img src="/assets/robot1.png" alt="Robot tự động chính" />
              </div>
            </motion.div>
          </div>
          <div className="hero-logo">
              <div className="hero-logo-main">
                <img src="/assets/1.png" alt="Logo ThaDo Robot" />
              </div>
            </div>
        </section>
        
        <section className='section-stack-cards'>
          <div className="section-header" style={{position: 'sticky',top: '80px',margin: 'var(--space-3xl) 0',borderRadius: 'var(--radius-xl)',padding: 'var(--space-2xl)',background: 'var(--bg-glass-sticky)',backdropFilter: 'blur(20px)'}}>
            <h2 className="section-title">{t('hero.about_title').split(' ')[0]} <span style={{color: 'var(--primary)'}} className="text-company">{t('hero.about_title').split(' ').slice(1).join(' ')}</span></h2>
            
            <div className="hero-about-layout">
              <motion.div 
                ref={aboutImageRef}
                className="hero-about-image"
                variants={aboutImageVariants}
                initial="hidden"
                animate={aboutImageControls}
                transition={{ duration: 1, delay: 0.3}}
              >
                <img src="/assets/Office_aboutus.png" alt="Logo ThaDo Robot" />
              </motion.div>
              
              <div className="hero-about-content">
                <p className="section-subtitle">
                {t('hero.about_desc')}
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <div className="hero-stat-number">{projectsCount}+</div>
                      <div className="hero-stat-label">{t('hero.stats_projects')}</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-number">{yearsCount}+</div>
                      <div className="hero-stat-label">{t('hero.stats_years')}</div>
                    </div>
                    <div className="hero-stat">
                      <div className="hero-stat-number">{satisfactionCount}%</div>
                      <div className="hero-stat-label">{t('hero.stats_satisfaction')}</div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Robot Showcase */}
        <section className='section-stack-cards'>
          <div className="hero-robots-showcase">
            <h2 className="hero-robots-showcase-title"> {t('hero.robots_title')}</h2>
            <div ref={robotCardsRef} className="robots-grid">
              {showcaseProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  className="robot-card"
                  onClick={() => navigate(`/product/${product.id}`)}
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
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="robot-info">
                    <h4>{product.name}</h4>
                    <p>{product.description?.line1 || 'Sản phẩm nổi bật'}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className='section-stack-cards solution-stackcards'>
          <div className="hero-solution">
            <h2 className="hero-solution-title"> {t('hero.solutions_title')}</h2>
            {/* Features Section */}
            <div className="hero-features">
              <div 
                className="features-container"
              >
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className={`feature-card ${index === activeFeature ? 'active' : ''}`}
                    onClick={() => setActiveFeature(index)}
                  >
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
              <div 
                className="tech-highlights-grid"
              >
                <div className="tech-highlight">
                  <div className="tech-content">
                    <h4>{t('hero.tech_battery_title')}</h4>
                    <p>{t('hero.tech_battery_desc')}</p>
                  </div>
                </div>
                
                <div className="tech-highlight">
                  <div className="tech-content">
                    <h4>{t('hero.tech_5g_title')}</h4>
                    <p>{t('hero.tech_5g_desc')}</p>
                  </div>
                </div>
                
                <div className="tech-highlight">
                  <div className="tech-content">
                    <h4>{t('hero.tech_ai_title')}</h4>
                    <p>{t('hero.tech_ai_desc')}</p>
                  </div>
                </div>
                
                <div className="tech-highlight">
                  <div className="tech-content">
                    <h4>{t('hero.tech_safety_title')}</h4>
                    <p>{t('hero.tech_safety_desc')}</p>
                  </div>
                </div>
              </div>
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