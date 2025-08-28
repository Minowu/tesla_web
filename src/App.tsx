import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SolutionsShowcase from './components/SolutionsShowcase';
import SolutionsHexagon from './components/SolutionsHexagon';
import ServicesHub from './components/ServicesHub';
import ProductInfo from './components/ProductInfo';
import ProductDetail from './components/ProductDetail';
import AboutSection from './components/AboutSection';
import BlogSection   from './components/BlogSection';
import BlogDetail from './components/BlogDetail';
import BlogCarousel from './components/BlogCarousel';
import TechnologySection from './components/TechnologySection';
import ContactUs from './components/ContactUs';
import { LoadingScreen } from './components/LoadingScreen';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { ErrorBoundary } from './components/ErrorBoundary';
import Solutions3DViewer from './components/Solutions3DViewer';
import { useAppStore } from './store/appStore';
import './styles/main.css';
import { ReactLenis,useLenis } from 'lenis/react';
// dùng đường dẫn tĩnh cho logo để tránh lỗi TS khi import png

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation (đã dùng trực tiếp setCurrentSection tại nơi cần thiết)

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <ReactLenis root>
      <div className="app">
        <div className="logo-bg">
          <img src="/1.png" alt="Logo" />
        </div>
        {/* Ultra Modern Tech Background Effects */}
        <div className="particles-container">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="energy-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        <Navigation />
        
        <PerformanceMonitor />

        <main>
          <Routes>
            {/* Route cho Trang chủ */}
            <Route path="/home" element={(
              <div className="homepage">
                <HeroSection />
                <SolutionsHexagon />
                <SolutionsShowcase />
                <ServicesHub />
                {/* ===== ADDITIONAL SECTIONS TO FILL EMPTY SPACE ===== */}
                {/* Blog Carousel Section */}
                <section className="case-studies-section">
                  <div className="container">
                    <div className="section-header">
                      <h2 className="section-title">Dự Án Tiêu Biểu</h2>
                      <p className="section-subtitle">
                        Những dự án thành công đã được chúng tôi triển khai
                      </p>
                    </div>
                    <BlogCarousel />
                  </div>
                </section>
                {/* Services Section */}
                <section className="services-section">
                  <div className="container">
                    <div className="section-header">
                      <h2 className="section-title">Dịch Vụ Hỗ Trợ</h2>
                      <p className="section-subtitle">
                        Đội ngũ chuyên gia giàu kinh nghiệm sẵn sàng hỗ trợ 24/7
                      </p>
                    </div>
                    <div className="services-grid">
                      <div className="service-card">
                        <div className="service-icon">💡</div>
                        <h3>Tư Vấn Chiến Lược</h3>
                        <p>Đánh giá và đề xuất giải pháp tối ưu cho doanh nghiệp</p>
                      </div>
                      <div className="service-card">
                        <div className="service-icon">🚀</div>
                        <h3>Triển Khai Hệ Thống</h3>
                        <p>Lắp đặt và cấu hình hệ thống robot tự động hóa</p>
                      </div>
                      <div className="service-card">
                        <div className="service-icon">🎓</div>
                        <h3>Đào Tạo Nhân Sự</h3>
                        <p>Huấn luyện đội ngũ vận hành và bảo trì hệ thống</p>
                      </div>
                      <div className="service-card">
                        <div className="service-icon">🔧</div>
                        <h3>Bảo Trì Định Kỳ</h3>
                        <p>Kiểm tra và bảo trì hệ thống theo lịch trình</p>
                      </div>
                      <div className="service-card">
                        <div className="service-icon">📞</div>
                        <h3>Hỗ Trợ 24/7</h3>
                        <p>Đội ngũ kỹ thuật sẵn sàng hỗ trợ mọi lúc mọi nơi</p>
                      </div>
                      <div className="service-card">
                        <div className="service-icon">⚡</div>
                        <h3>Tối Ưu Hóa Liên Tục</h3>
                        <p>Cải tiến và nâng cấp hệ thống theo thời gian thực</p>
                      </div>
                    </div>
                  </div>
                </section>
                {/* Contact CTA Section */}
                <section className="contact-cta-section">
                  <div className="container">
                    <div className="cta-content">
                      <h2>Sẵn Sàng Chuyển Đổi Số?</h2>
                      <p>
                        Hãy liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí 
                        và bắt đầu hành trình chuyển đổi số cùng THADOROBOT
                      </p>
                      <div className="cta-buttons">
                        <button 
                          className="btn btn-primary"
                          onClick={() => navigate('/contactus')}
                        >
                          <span>📞</span>
                          Liên Hệ Ngay
                        </button>
                        <button className="btn btn-secondary" onClick={() => navigate('/contactus')}>
                          <span>📋</span>
                          Yêu Cầu Demo
                        </button>
                        <button className="btn btn-outline">
                          <span>📖</span>
                          Tài Liệu Kỹ Thuật
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )} />
            
            {/* Route cho Sản phẩm */}
            <Route path="/products" element={<ProductInfo />} />
            
            {/* Route cho chi tiết sản phẩm */}
            <Route path="/product/:productId" element={<ProductDetail />} />
            
            {/* Route cho Giải pháp */}
            <Route path="/solutions" element={<Solutions3DViewer />} />
            
            {/* Route cho Công nghệ */}
            <Route path="/technology" element={<TechnologySection />} />
            
            {/* Route cho Về chúng tôi */}
            <Route path="/about-us" element={<AboutSection />} />
            
            {/* Route cho Bài viết */}
            <Route path="/blog" element={(
              <div className="container">
                <div className="section-header">
                  <h1 className="section-title">Tất cả bài viết</h1>
                  <p className="section-subtitle">
                    Khám phá các bài viết về lập trình và công nghệ
                  </p>
                </div>
                <BlogSection />
              </div>
            )} />
            
            {/* Route cho chi tiết bài viết */}
            <Route path="/blog/:slug" element={<BlogDetail />} />
            
            {/* Route cho Liên hệ */}
            <Route path="/contactus" element={<ContactUs />} />
            
            {/* Route mặc định - redirect về /home */}
            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
            
          </Routes>
        </main>
      </div>
      </ReactLenis>
    </ErrorBoundary>
  );
}

export default App; 