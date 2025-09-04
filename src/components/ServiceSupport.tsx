import React from 'react';
import { useTranslation } from 'react-i18next';


const ServiceSupport: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('home_sections.services_support_title')}</h2>
          <p className="section-subtitle">
            {t('home_sections.services_support_subtitle')}
          </p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <img src="/assets/thinking.png" alt="Thinking" />
            <h3>{t('home_sections.services_cards.strategy_title')}</h3>
            <p>{t('home_sections.services_cards.strategy_desc')}</p>
          </div>
          <div className="service-card">
            <img src="/assets/develop.png" alt="Deployment" />
            <h3>{t('home_sections.services_cards.deployment_title')}</h3>
            <p>{t('home_sections.services_cards.deployment_desc')}</p>
          </div>
          <div className="service-card">
            <img src="/assets/training.png" alt="Training" />
            <h3>{t('home_sections.services_cards.training_title')}</h3>
            <p>{t('home_sections.services_cards.training_desc')}</p>
          </div>
          <div className="service-card">
            <img src="/assets/maintain.png" alt="Maintenance" />
            <h3>{t('home_sections.services_cards.maintenance_title')}</h3>
            <p>{t('home_sections.services_cards.maintenance_desc')}</p>
          </div>
          <div className="service-card">
            <img src="/assets/Twenty_Four_Seven.png" alt="24/7" />
            <h3>{t('home_sections.services_cards.support_title')}</h3>
            <p>{t('home_sections.services_cards.support_desc')}</p>
          </div>
          <div className="service-card">
            <img src="/assets/Continuous_Mode.png" alt="Continuous Mode" />
            <h3>{t('home_sections.services_cards.optimization_title')}</h3>
            <p>{t('home_sections.services_cards.optimization_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSupport;


