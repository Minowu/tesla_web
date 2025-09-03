import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
// Solutions Data based on the image
const solutions = [
  {
    id: 'robot-system',
    title: 'HỆ THỐNG ROBOT',
    subtitle: 'Robot System',
    icon: '🤖',
    color: 'var(--primary)',
    description: 'Hệ thống robot công nghiệp tự động hóa với độ chính xác cao',
    features: ['Cánh tay robot công nghiệp', 'Xử lý vật thể tự động', 'Độ chính xác cao', 'Tích hợp AI']
  },
  {
    id: 'packing-system',
    title: 'HỆ THỐNG ĐÓNG GÓI',
    subtitle: 'Packing System',
    icon: '📦',
    color: 'var(--secondary)',
    description: 'Dây chuyền đóng gói tự động cho nhà máy sản xuất',
    features: ['Đóng gói tự động', 'Dây chuyền sản xuất', 'Kiểm soát chất lượng', 'Tối ưu hiệu suất']
  },
  {
    id: 'smart-warehouse',
    title: 'KHO HÀNG THÔNG MINH',
    subtitle: 'Smart Warehouse',
    icon: '🏭',
    color: 'var(--accent)',
    description: 'Hệ thống kho hàng tự động với AS/RS và robot vận chuyển',
    features: ['AS/RS tự động', 'Robot vận chuyển', 'Quản lý kho thông minh', 'Truy xuất nhanh']
  },
  {
    id: 'services',
    title: 'DỊCH VỤ LẮP ĐẶT & BẢO TRÌ',
    subtitle: 'Services',
    icon: '🔧',
    color: 'var(--primary)',
    description: 'Dịch vụ lắp đặt, bảo trì và hỗ trợ kỹ thuật chuyên nghiệp',
    features: ['Lắp đặt chuyên nghiệp', 'Bảo trì định kỳ', 'Hỗ trợ 24/7', 'Đào tạo nhân viên']
  },
  {
    id: 'ai-vision-robot',
    title: 'HỆ THỐNG ROBOT, CAMERA AI',
    subtitle: 'AI Vision, Robot System',
    icon: '👁️',
    color: 'var(--secondary)',
    description: 'Hệ thống thị giác máy tính tích hợp AI cho robot',
    features: ['AI Vision Processing', 'Computer Vision', 'Machine Learning', 'Real-time Analysis']
  },
  {
    id: 'smart-locker',
    title: 'TỦ ĐỒ THÔNG MINH',
    subtitle: 'Smart Locker',
    icon: '🗄️',
    color: 'var(--accent)',
    description: 'Hệ thống tủ khóa thông minh cho nhận/gửi bưu kiện tự động',
    features: ['Nhận/gửi tự động', 'Bảo mật cao', 'Quản lý thông minh', 'Tích hợp IoT']
  },
  {
    id: 'smart-factory',
    title: 'NHÀ MÁY THÔNG MINH',
    subtitle: 'Smart Factory',
    icon: '🏭',
    color: 'var(--primary)',
    description: 'Nhà máy tự động hóa cao với robot và máy móc thông minh',
    features: ['Tự động hóa toàn diện', 'Robot công nghiệp', 'Trung tâm điều khiển', 'IoT Integration']
  },
  {
    id: 'smart-building',
    title: 'TÒA NHÀ THÔNG MINH',
    subtitle: 'Smart Building',
    icon: '🏢',
    color: 'var(--secondary)',
    description: 'Hệ thống tòa nhà thông minh với camera an ninh và quản lý năng lượng',
    features: ['Camera an ninh', 'Điều khiển ánh sáng', 'Quản lý năng lượng', 'Hệ thống thông minh']
  }
];

const SolutionsHexagon: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const centralRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hexRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Animation refs và controls
  const headerRef = useRef(null);
  
  const headerInView = useInView(headerRef, { once: true });
  
  const headerControls = useAnimation();

  // Animation effects
  useEffect(() => {
    if (headerInView) {
      headerControls.start("visible");
    }
  }, [headerInView]);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  };

  const hexItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const hexGridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  useEffect(() => {
    function drawLines() {
      if (!containerRef.current || !centralRef.current || !svgRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const centralRect = centralRef.current.getBoundingClientRect();
    
    // Tính toán radius dựa trên kích thước thực tế của central logo
    // Lấy kích thước thực tế sau khi được scale bởi CSS
    const logoRadius = Math.min(centralRect.width, centralRect.height) / 2;
    
    // Tính vị trí trung tâm chính xác
    const cx = centralRect.left - containerRect.left + centralRect.width / 2;
    const cy = centralRect.top - containerRect.top + centralRect.height / 2; 

    // Clear old lines
    svgRef.current.innerHTML = '';

    // Add new lines
    hexRefs.current.forEach((hex, idx) => {
      if (!hex) return;
      const rect = hex.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      // Tính toán điểm bắt đầu từ rìa logo
      const dx = x - cx;
      const dy = y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const startX = cx + (dx / distance) * logoRadius;
        const startY = cy + (dy / distance) * logoRadius;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX.toString());
        line.setAttribute('y1', startY.toString());
        line.setAttribute('x2', x.toString());
        line.setAttribute('y2', y.toString());
        line.setAttribute('stroke', hex.style.getPropertyValue('--hex-color') || '#000');
        line.setAttribute('stroke-width', '2');
        svgRef.current?.appendChild(line);
      }
    });
  }

  drawLines();
  window.addEventListener('resize', drawLines);
  return () => window.removeEventListener('resize', drawLines);
}, [solutions]);

  return (
    <section className="solutions-hexagon">
      <div className="container">
        <motion.div 
          ref={headerRef}
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          animate={headerControls}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="section-title">
            Giải Pháp <span className="text-company">THADOROBOT</span>
          </h2>
          <p className="section-subtitle">
            Khám phá các hệ thống và dịch vụ thông minh giúp doanh nghiệp của bạn phát triển bền vững
          </p>
        </motion.div>

        <div className="hexagon-container" ref={containerRef}>
          <svg className="connection-lines" ref={svgRef}></svg>

          {/* Central Logo */}
          <div className="central-logo" ref={centralRef}>
            <div className="logo-circle">
              <img src="/assets/logo_white.png" alt="THADOROBOT" />
            </div>
          </div>

          {/* Hexagon Solutions */}
          <motion.div 
            className="hexagon-grid"
            variants={hexGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
          >
            {solutions.map((solution, index) => (
              <motion.div
                id={'hex-' + index}
                key={solution.id}
                ref={el => (hexRefs.current[index] = el)}
                className={`hexagon-item ${selectedSolution === solution.id ? 'active' : ''}`}
                onClick={() => setSelectedSolution(selectedSolution === solution.id ? null : solution.id)}
                variants={hexItemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  '--hex-color': solution.color,
                  '--hex-index': index 
                } as any}
              >
                <div className="hexagon-content">
                  <div className="hexagon-icon">{solution.icon}</div>
                  <div className="hexagon-text">
                    <h4>{solution.title}</h4>
                    <p>{solution.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>


        {/* Solution Details Modal */}
        {selectedSolution && (
          <div className="solution-modal">
            <div className="modal-content">
              <button 
                className="modal-close"
                onClick={() => setSelectedSolution(null)}
              >
                ×
              </button>
              
              {(() => {
                const solution = solutions.find(s => s.id === selectedSolution);
                if (!solution) return null;
                
                return (
                  <>
                    <div className="modal-header">
                      <div className="modal-icon" style={{ color: solution.color }}>
                        {solution.icon}
                      </div>
                      <div className="modal-title">
                        <h3>{solution.title}</h3>
                        <p>{solution.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="modal-body">
                      <p className="modal-description">{solution.description}</p>
                      
                      <div className="modal-features">
                        <h4>Tính năng chính</h4>
                        <ul>
                          {solution.features.map((feature, index) => (
                            <li key={index}>
                              <span className="feature-icon">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="modal-actions">
                      <button className="btn btn-primary">
                        <span>Khám phá chi tiết</span>
                        <span className="btn-icon">→</span>
                      </button>
                      <button className="btn btn-secondary">
                        <span>Liên hệ tư vấn</span>
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsHexagon;
