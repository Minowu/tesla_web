import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

const Navigation: React.FC = () => {
  const { currentSection, setCurrentSection } = useAppStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Thêm state cho theme

  const menuItems = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'products', label: 'Sản phẩm', icon: '🤖' },
    { id: 'solutions', label: 'Giải pháp', icon: '💡' },
    { id: 'technology', label: 'Công nghệ', icon: '⚡' },
    { id: 'about', label: 'Về chúng tôi', icon: 'ℹ️' }
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
              onClick={() => setCurrentSection('contact')}
            >
              <span>📞</span>
              <span>Liên hệ</span>
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
                onClick={() => setCurrentSection('contact')}
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