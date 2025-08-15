import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

const Navigation: React.FC = () => {
  const { currentSection, setCurrentSection } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'products', label: 'Sản phẩm', icon: '🤖' },
    { id: 'solutions', label: 'Giải pháp', icon: '💡' },
    { id: 'technology', label: 'Công nghệ', icon: '⚡' },
    { id: 'about', label: 'Về chúng tôi', icon: 'ℹ️' },
    { id: 'contact', label: 'Liên hệ', icon: '📞' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId as any);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo" onClick={() => handleNavClick('home')}>
            <img src="/1.png" alt="THADOROBOT" />
            <h2>THADOROBOT</h2>
          </div>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${currentSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="nav-cta">
            <button
              className="cta-button"
              onClick={() => handleNavClick('contact')}
            >
              <span>🚀</span>
              <span>Bắt đầu ngay</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={toggleMobileMenu}
          >
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
            <ul className="mobile-nav-menu">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`mobile-nav-item ${currentSection === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className="cta-button"
                onClick={() => handleNavClick('contact')}
                style={{ width: '100%' }}
              >
                <span>🚀</span>
                <span>Bắt đầu ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation; 