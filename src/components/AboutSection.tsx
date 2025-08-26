import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import LogoCarousel from './LogoCarousel';
import TimelineAnimation from './TimelineAnimation';  

const AboutSection: React.FC = () => {
  const { setCurrentSection } = useAppStore();
  const [activeTab, setActiveTab] = useState('mission');

  // Hàm tạo màu sắc cho timeline dựa trên năm
  const getTimelineColor = (year: string): string => {
    const colors = [
      '#4F46E5', // Indigo
      '#7C3AED', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#06B6D4'  // Cyan
    ] as const;
    const yearNum = parseInt(year);
    if (isNaN(yearNum)) return colors[0];
    const yearIndex = yearNum - 2009; // Bắt đầu từ 2009
    const colorIndex = Math.abs(yearIndex) % colors.length;
    return colors[colorIndex] || colors[0];
  };

  const stats = [
    { number: '5+', label: 'Năm kinh nghiệm', icon: '⏱️' },
    { number: '50+', label: 'Dự án thành công', icon: '🏆' },
    { number: '50+', label: 'Khách hàng tin tưởng', icon: '🤝' },
    { number: '99%', label: 'Tỷ lệ hài lòng', icon: '⭐' }
  ];


  const team = [
    {
      name: 'Nguyễn Văn S',
      position: 'CEO & Founder',
      avatar: '👨‍💼',
      description: 'Chuyên gia robot với 20+ năm kinh nghiệm trong lĩnh vực tự động hóa'
    },
    {
      name: 'Trần Thị B',
      position: 'CTO',
      avatar: '👩‍💻',
      description: 'Tiến sĩ AI/ML, chuyên gia về trí tuệ nhân tạo và machine learning'
    },
    {
      name: 'Lê Văn C',
      position: 'Head of R&D',
      avatar: '👨‍🔬',
      description: 'Chuyên gia nghiên cứu và phát triển sản phẩm robot công nghiệp'
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Sứ mệnh',
      description: 'Sáng tạo và phát triển công nghệ để mang lại tương lai tốt đẹp, ấm no và hạnh phúc hơn cho xã hội.'
    },
    {
      icon: '👁️',
      title: 'Tầm nhìn',
      description: 'Trở thành công ty hàng đầu Đông Nam Á về lĩnh vực Robot và Nhà máy thông minh.'
    },
    {
      icon: '💎',
      title: 'Giá trị cốt lõi',
      description: 'Đổi mới sáng tạo, phát triển bền vững để phục vụ con người và xã hội.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Thành lập công ty',
      description: 'Thadorobot được thành lập với sứ mệnh đưa công nghệ robot vào Việt Nam'
    },
    {
      year: '2021',
      title: 'Dự án đầu tiên',
      description: 'Triển khai thành công hệ thống AGV đầu tiên cho nhà máy sản xuất'
    },
    {
      year: '2022',
      title: 'Mở rộng thị trường',
      description: 'Mở rộng hoạt động ra các tỉnh thành và bắt đầu xuất khẩu'
    },
    {
      year: '2023',
      title: 'Công nghệ AI',
      description: 'Tích hợp AI và Machine Learning vào các sản phẩm robot'
    },
    {
      year: '2024',
      title: 'Industry 4.0',
      description: 'Trở thành đối tác chiến lược trong cuộc cách mạng công nghiệp 4.0'
    },
    {
      year: '2025',
      title: 'Tương lai',
      description: 'Tiếp tục đổi mới và dẫn đầu trong lĩnh vực tự động hóa'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Về <span style={{color: 'var(--primary)'}} className="text-company">Thadorobot</span></h2>
          <p className="section-subtitle">
          là một doanh nghiệp hàng đầu tại Việt Nam, chuyên cung cấp các giải pháp công nghệ tiên tiến trong lĩnh vực Robot và Nhà máy thông minh. Chúng tôi hoạt động mạnh mẽ trong các lĩnh vực chủ chốt như Hệ thống đóng gói tự động (APS), Giải pháp tự động hóa nhà máy (FAS), và Giải pháp quản lý kho thông minh (SWS)
          </p>
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((stat, index) => (
            <div key={index} className="about-stat">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="about-values">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{value.icon}</div>
              <h3 className="value-title">{value.title}</h3>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
          
        {/* Timeline */}
        <div className="about-timeline">
          <h3 className="timeline-title">Hành trình phát triển</h3>
          <TimelineAnimation 
            data={milestones.map(milestone => ({
              year: milestone.year,
              title: milestone.title,
              description: milestone.description,
              color: getTimelineColor(milestone.year)
            }))}
          />
        </div>

        {/* Team */}
        <div className="about-team">
          <h3 className="team-title">Đội ngũ lãnh đạo</h3>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.avatar}</div>
                <h4 className="member-name">{member.name}</h4>
                <p className="member-position">{member.position}</p>
                <p className="member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
        <LogoCarousel />
        {/* CTA */}
        <div className="about-cta">
          <div className="cta-content">
            <h3>Sẵn sàng hợp tác?</h3>
            <p>Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setCurrentSection('contact')}
              >
                <span>📞</span>
                <span>Liên hệ ngay</span>
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

export default AboutSection; 