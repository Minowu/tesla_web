import React from 'react';
import { useTranslation } from 'react-i18next';

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="contact-section">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">{t('contact.section_title')}</h1>
          <p className="section-subtitle">
            {t('contact.section_subtitle')}
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div className="contact-details">
                <h3>{t('contact.phone.title')}</h3>
                <p>{t('contact.phone.number')}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div className="contact-details">
                <h3>{t('contact.email.title')}</h3>
                <p>{t('contact.email.address')}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>{t('contact.address.title')}</h3>
                <p>{t('contact.address.line1')}</p>
                <p>{t('contact.address.line2')}</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <div className="contact-details">
                <h3>{t('contact.hours.title')}</h3>
                <p>{t('contact.hours.weekdays')}</p>
                <p>{t('contact.hours.saturday')}</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <h3>{t('contact.form.title')}</h3>
            <form>
              <div className="form-group">
                <input type="text" placeholder={t('contact.form.name_placeholder')} required />
              </div>
              <div className="form-group">
                <input type="email" placeholder={t('contact.form.email_placeholder')} required />
              </div>
              <div className="form-group">
                <input type="tel" placeholder={t('contact.form.phone_placeholder')} />
              </div>
              <div className="form-group">
                <textarea placeholder={t('contact.form.message_placeholder')} rows={4} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <span>📤</span>
                <span>{t('contact.form.submit_btn')}</span>
              </button>
            </form>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-number">24/7</div>
            <div className="stat-label">{t('contact.stats.support')}</div>
          </div>
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">{t('contact.stats.projects')}</div>
          </div>
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">{t('contact.stats.clients')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
