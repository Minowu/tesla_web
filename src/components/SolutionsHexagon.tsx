import React, { useState } from 'react';

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

  return (
    <section className="solutions-hexagon">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Giải Pháp <span className="text-gradient">THADOSOFT</span>
          </h2>
          <p className="section-subtitle">
            Khám phá các hệ thống và dịch vụ thông minh giúp doanh nghiệp của bạn phát triển bền vững
          </p>
        </div>

        <div className="hexagon-container">
          {/* Central Logo */}
          <div className="central-logo">
            <div className="logo-circle">
              <div className="logo-icon">⚡</div>
              <h3>THADOSOFT</h3>
            </div>
          </div>

          {/* Hexagon Solutions */}
          <div className="hexagon-grid">
            {solutions.map((solution, index) => (
              <div
                key={solution.id}
                className={`hexagon-item ${selectedSolution === solution.id ? 'active' : ''}`}
                style={{ 
                  '--hex-color': solution.color,
                  '--hex-index': index 
                } as React.CSSProperties}
                onClick={() => setSelectedSolution(selectedSolution === solution.id ? null : solution.id)}
              >
                <div className="hexagon-content">
                  <div className="hexagon-icon">{solution.icon}</div>
                  <div className="hexagon-text">
                    <h4>{solution.title}</h4>
                    <p>{solution.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
