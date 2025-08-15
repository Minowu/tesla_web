import React from 'react';

const ServicesHub: React.FC = () => {
  const services = [
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Phát triển các giải pháp AI và ML cho tự động hóa thông minh.',
      icon: '🧠',
      features: [
        'Computer Vision',
        'Natural Language Processing',
        'Predictive Analytics',
        'Deep Learning Models'
      ]
    },
    {
      id: 'iot',
      title: 'Internet of Things',
      description: 'Kết nối và giám sát thiết bị thông minh trong hệ sinh thái IoT.',
      icon: '🌐',
      features: [
        'Sensor Networks',
        'Real-time Monitoring',
        'Data Analytics',
        'Cloud Integration'
      ]
    },
    {
      id: 'robotics',
      title: 'Industrial Robotics',
      description: 'Giải pháp robot công nghiệp cho sản xuất tự động hóa.',
      icon: '🤖',
      features: [
        'Collaborative Robots',
        'Automated Assembly',
        'Quality Inspection',
        'Material Handling'
      ]
    },
    {
      id: 'automation',
      title: 'Process Automation',
      description: 'Tự động hóa quy trình sản xuất và kinh doanh.',
      icon: '⚙️',
      features: [
        'Workflow Automation',
        'Process Optimization',
        'Performance Monitoring',
        'Error Prevention'
      ]
    },
    {
      id: 'analytics',
      title: 'Data Analytics',
      description: 'Phân tích dữ liệu để tối ưu hóa hiệu suất và ra quyết định.',
      icon: '📊',
      features: [
        'Big Data Processing',
        'Business Intelligence',
        'Performance Metrics',
        'Predictive Modeling'
      ]
    },
    {
      id: 'maintenance',
      title: 'Predictive Maintenance',
      description: 'Bảo trì dự đoán để giảm thiểu thời gian ngừng máy.',
      icon: '🔧',
      features: [
        'Condition Monitoring',
        'Failure Prediction',
        'Maintenance Scheduling',
        'Cost Optimization'
      ]
    }
  ];

  return (
    <section className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Dịch vụ Công nghệ</h2>
          <p className="section-subtitle">
            Cung cấp các dịch vụ công nghệ tiên tiến để thúc đẩy chuyển đổi số
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHub; 