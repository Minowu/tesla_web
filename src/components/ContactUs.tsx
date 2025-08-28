import React from 'react';

const ContactUs: React.FC = () => {
  return (
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
                <p>+84 986 249 212</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>info@thadosoft.vn</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Địa chỉ</h3>
                <p>C25-C26, 28/5 Dương Khuê, P. Từ Liêm</p>
                <p>TP. Hà Nội, Việt Nam</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div className="contact-details">
                <h3>Giờ làm việc</h3>
                <p>Thứ 2 - Thứ 6: 8:00 - 17:00</p>
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
            <div className="stat-number">50+</div>
            <div className="stat-label">Dự án thành công</div>
          </div>
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Khách hàng tin tưởng</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
