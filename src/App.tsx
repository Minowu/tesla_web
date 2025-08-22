import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SolutionsShowcase from './components/SolutionsShowcase';
import SolutionsHexagon from './components/SolutionsHexagon';
import ServicesHub from './components/ServicesHub';
import ProductInfo from './components/ProductInfo';
import AboutSection from './components/AboutSection';
import BlogSection   from './components/BlogSection';
import BlogDetail from './components/BlogDetail';
import BlogCarousel from './components/BlogCarousel';
import TechnologySection from './components/TechnologySection';
import { LoadingScreen } from './components/LoadingScreen';
import { PerformanceMonitor } from './components/PerformanceMonitor';
import { ErrorBoundary } from './components/ErrorBoundary';
import Solutions3DViewer from './components/Solutions3DViewer';
import { useAppStore } from './store/appStore';
import './styles/main.css';
// dùng đường dẫn tĩnh cho logo để tránh lỗi TS khi import png

function App() {
  const { currentSection, setCurrentSection } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);

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
            
            <Route path="/bai-viet/:slug" element={<BlogDetail />} />
            <Route
              path="*"
              element={(
                <>
                  {currentSection === 'home' && (
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
                                onClick={() => setCurrentSection('contact')}
                              >
                                <span>📞</span>
                                Liên Hệ Ngay
                              </button>
                              <button className="btn btn-secondary">
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
                  )}
                  {currentSection === 'products' && (
                    <ProductInfo />
                  )}
                  {currentSection === 'solutions' && (
                    <Solutions3DViewer />
                  )}
                  {currentSection === 'technology' && (
                    <TechnologySection />
                  )}
                  {currentSection === 'about' && (
                    <AboutSection />
                  )}
                  {currentSection === 'blog' && (
                    <div className="container">
                      <div className="section-header">
                        <h1 className="section-title">Tất cả bài viết</h1>
                        <p className="section-subtitle">
                          Khám phá các bài viết về lập trình và công nghệ
                        </p>
                      </div>
                      <BlogSection />
                    </div>
                  )}
                  {currentSection === 'contact' && (
                    <div className="contact-section">
                      <div className="container">
                        <div className="section-header">
                          <h1 className="section-title">Liên Hệ</h1>
                          <p className="section-subtitle">
                            Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất
                          </p>
                        </div>
                        <div className="contact-content">
                          <div className="contact-info">
                            <div className="contact-item">
                              <div className="contact-icon">📞</div>
                              <div className="contact-details">
                                <h3>Điện thoại</h3>
                                <p>+84 28 7300 1234</p>
                                <p>+84 90 123 4567</p>
                              </div>
                            </div>
                            <div className="contact-item">
                              <div className="contact-icon">✉️</div>
                              <div className="contact-details">
                                <h3>Email</h3>
                                <p>info@thadorobot.com</p>
                                <p>support@thadorobot.com</p>
                              </div>
                            </div>
                            <div className="contact-item">
                              <div className="contact-icon">📍</div>
                              <div className="contact-details">
                                <h3>Địa chỉ</h3>
                                <p>123 Đường ABC, Quận 1</p>
                                <p>TP. Hồ Chí Minh, Việt Nam</p>
                              </div>
                            </div>
                            <div className="contact-item">
                              <div className="contact-icon">🕒</div>
                              <div className="contact-details">
                                <h3>Giờ làm việc</h3>
                                <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                                <p>Thứ 7: 8:00 - 12:00</p>
                              </div>
                            </div>
                          </div>
                          <div className="contact-form">
                            <h3>Gửi tin nhắn cho chúng tôi</h3>
                            <form>
                              <div className="form-group">
                                <input type="text" placeholder="Họ và tên" required />
                              </div>
                              <div className="form-group">
                                <input type="email" placeholder="Email" required />
                              </div>
                              <div className="form-group">
                                <input type="tel" placeholder="Số điện thoại" />
                              </div>
                              <div className="form-group">
                                <textarea placeholder="Nội dung tin nhắn" rows={4} required></textarea>
                              </div>
                              <button type="submit" className="btn btn-primary">
                                <span>📤</span>
                                <span>Gửi tin nhắn</span>
                              </button>
                            </form>
                          </div>
                        </div>
                        <div className="stats">
                          <div className="stat">
                            <div className="stat-number">24/7</div>
                            <div className="stat-label">Hỗ trợ khách hàng</div>
                          </div>
                          <div className="stat">
                            <div className="stat-number">100+</div>
                            <div className="stat-label">Dự án thành công</div>
                          </div>
                          <div className="stat">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Khách hàng tin tưởng</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App; 