import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import logoImage from '../assets/1.png';

const Navigation: React.FC = () => {
  const { currentSection, setCurrentSection } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Thêm state cho theme
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'home', label: 'TRANG CHỦ', icon: '🏠', path: '/home', isLink: true },
    { id: 'products', label: 'SẢN PHẨM', icon: '🤖', path: '/products', isLink: true },
    { id: 'solutions', label: 'GIẢI PHÁP', icon: '💡', path: '/solutions', isLink: true },
    { id: 'technology', label: 'CÔNG NGHỆ', icon: '⚡', path: '/technology', isLink: true },
    { id: 'about', label: 'VỀ CHÚNG TÔI', icon: 'ℹ️', path: '/about-us', isLink: true },
    { id: 'blog', label: 'BÀI VIẾT', icon: '💬', path: '/blog', isLink: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Thêm useEffect để load theme từ localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('thadorobot-theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  // Thêm useEffect để áp dụng theme vào body
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId as any);
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    setCurrentSection('home');
    navigate('/home');
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    setCurrentSection('contact');
    navigate('/contactus');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Thêm function để toggle theme
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('thadorobot-theme', newTheme ? 'dark' : 'light');
  };

  // Search functionality
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Chuyển đến solutions section để hiển thị kết quả tìm kiếm
      setCurrentSection('solutions');
      setSearchQuery('');
      setIsSearchExpanded(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchFocus = () => {
    setIsSearchExpanded(true);
  };

  const handleSearchBlur = () => {
    // Delay để người dùng có thể click vào nút search
    setTimeout(() => {
      setIsSearchExpanded(false);
    }, 200);
  };

  // Kiểm tra xem item có active không
  const isItemActive = (item: any) => {
    if (item.isLink) {
      return location.pathname === item.path;
    }
    return currentSection === item.id;
  };

  return (
    <>
      <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo" onClick={handleHomeClick}>
            <img src={logoImage} alt="THADOROBOT" />
            <h2 className="text-company">THADOROBOT</h2>
          </div>

          {/* Desktop Menu */}
          <ul className="nav-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                {item.isLink ? (
                  <Link
                    to={item.path}
                    className={`nav-link ${isItemActive(item) ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    className={`nav-link ${isItemActive(item) ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="nav-cta">
            <button
              className="cta-button"
              onClick={handleContactClick}
            >
              <span>LIÊN HỆ</span>
              
            </button>
          </div>
          
          {/* Navigation Controls */}
          <div className="nav-controls">
            {/* Language Toggle */}     
            <button className="control-button language-toggle" title="Chuyển đổi ngôn ngữ">
              <span>🇻🇳</span>
            </button>
            {/* Theme Toggle */}
            <button 
              className="control-button theme-toggle" 
              title={isDarkTheme ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
              onClick={toggleTheme}
            >
              <span>{isDarkTheme ? '🌙' : '☀️'}</span>
            </button>
            {/* Search Icon with Expandable Input */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm kiếm giải pháp..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className={`search-input ${isSearchExpanded ? 'expanded' : ''}`}
              />
              <button 
                className="control-button search-toggle" 
                title="Tìm kiếm"
                onClick={handleSearch}
              >
                <span>🔍</span>
              </button>
            </div>
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
            {/* Mobile Controls */}
            <div className="mobile-controls">
              <div className="search-container mobile">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="search-input mobile"
                />
                <button 
                  className="control-button search-toggle" 
                  title="Tìm kiếm"
                  onClick={handleSearch}
                >
                  <span>🔍</span>
                </button>
              </div>
              <button className="control-button language-toggle" title="Chuyển đổi ngôn ngữ">
                <span>🇻🇳</span>
              </button>
              <button 
                className="control-button theme-toggle" 
                title={isDarkTheme ? "Chuyển sang chế độ sáng" : "Chuyển sang chế độ tối"}
                onClick={toggleTheme}
              >
                <span>{isDarkTheme ? '🌙' : '☀️'}</span>
              </button>
            </div>
            
            <ul className="mobile-nav-menu">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.isLink ? (
                    <Link
                      to={item.path}
                      className={`mobile-nav-item ${isItemActive(item) ? 'active' : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      className={`mobile-nav-item ${isItemActive(item) ? 'active' : ''}`}
                      onClick={() => handleNavClick(item.id)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                className="cta-button"
                onClick={handleContactClick}
                style={{ width: '100%' }}
              >
                <span>📞</span>
                <span>Liên hệ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation; 