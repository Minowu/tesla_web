import React, { useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

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

  // Animation refs và controls
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });
  
  const headerControls = useAnimation();
  const gridControls = useAnimation();

  // Animation effects
  React.useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerInView, headerControls]);

  React.useEffect(() => {
    if (gridInView) {
      gridControls.start("visible");
    }
  }, [gridInView, gridControls]);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="services">
      <div className="container">
        <motion.div 
          ref={headerRef}
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-title">Dịch vụ Công nghệ</h2>
          <p className="section-subtitle">
            Cung cấp các dịch vụ công nghệ tiên tiến để thúc đẩy chuyển đổi số
          </p>
        </motion.div>

        <motion.div 
          ref={gridRef}
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={gridControls}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className="service-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHub; 