import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/appStore';

const AboutSection: React.FC = () => {
  const { setCurrentSection } = useAppStore();
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { number: '15+', label: 'Năm kinh nghiệm', icon: '⏱️' },
    { number: '500+', label: 'Dự án thành công', icon: '🏆' },
    { number: '50+', label: 'Khách hàng tin tưởng', icon: '🤝' },
    { number: '99%', label: 'Tỷ lệ hài lòng', icon: '⭐' }
  ];

  const milestones = [
    {
      year: '2009',
      title: 'Thành lập công ty',
      description: 'Thadorobot được thành lập với sứ mệnh đưa công nghệ robot vào Việt Nam'
    },
    {
      year: '2012',
      title: 'Dự án đầu tiên',
      description: 'Triển khai thành công hệ thống AGV đầu tiên cho nhà máy sản xuất'
    },
    {
      year: '2015',
      title: 'Mở rộng thị trường',
      description: 'Mở rộng hoạt động ra các tỉnh thành và bắt đầu xuất khẩu'
    },
    {
      year: '2018',
      title: 'Công nghệ AI',
      description: 'Tích hợp AI và Machine Learning vào các sản phẩm robot'
    },
    {
      year: '2021',
      title: 'Industry 4.0',
      description: 'Trở thành đối tác chiến lược trong cuộc cách mạng công nghiệp 4.0'
    },
    {
      year: '2024',
      title: 'Tương lai',
      description: 'Tiếp tục đổi mới và dẫn đầu trong lĩnh vực tự động hóa'
    }
  ];

  const team = [
    {
      name: 'Nguyễn Văn A',
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
    {
      name: 'Phạm Thị D',
      position: 'Head of Sales',
      avatar: '👩‍💼',
      description: 'Chuyên gia tư vấn giải pháp tự động hóa cho doanh nghiệp'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Sứ mệnh',
      description: 'Đưa công nghệ robot tiên tiến vào Việt Nam, giúp doanh nghiệp tăng hiệu quả sản xuất và cạnh tranh toàn cầu.'
    },
    {
      icon: '👁️',
      title: 'Tầm nhìn',
      description: 'Trở thành công ty hàng đầu Đông Nam Á về giải pháp tự động hóa và robot thông minh.'
    },
    {
      icon: '💎',
      title: 'Giá trị cốt lõi',
      description: 'Đổi mới sáng tạo, chất lượng cao, dịch vụ tận tâm, và phát triển bền vững.'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Về Thadorobot</h2>
          <p className="section-subtitle">
            Hơn 15 năm kinh nghiệm trong lĩnh vực tự động hóa và robot công nghiệp
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
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h4 className="timeline-title">{milestone.title}</h4>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
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