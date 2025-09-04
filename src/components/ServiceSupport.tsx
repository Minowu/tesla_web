import React from 'react';
import { useTranslation } from 'react-i18next';
import Continuous_Image from '/assets/Continuous_Mode.png';
import TwentyFourSeven_Image from '/assets/Twenty_Four_Seven.png';
import Maintenance_Image from '/assets/maintain.png';
import Training_Image from '/assets/training.png';
import Deployment_Image from '/assets/develop.png';
import Thinking_Image from '/assets/thinking.png';


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
            <img src={Thinking_Image} alt="Thinking" />
            <h3>{t('home_sections.services_cards.strategy_title')}</h3>
            <p>{t('home_sections.services_cards.strategy_desc')}</p>
          </div>
          <div className="service-card">
            <img src={Deployment_Image} alt="Deployment" />
            <h3>{t('home_sections.services_cards.deployment_title')}</h3>
            <p>{t('home_sections.services_cards.deployment_desc')}</p>
          </div>
          <div className="service-card">
            <img src={Training_Image} alt="Training" />
            <h3>{t('home_sections.services_cards.training_title')}</h3>
            <p>{t('home_sections.services_cards.training_desc')}</p>
          </div>
          <div className="service-card">
            <img src={Maintenance_Image} alt="Maintenance" />
            <h3>{t('home_sections.services_cards.maintenance_title')}</h3>
            <p>{t('home_sections.services_cards.maintenance_desc')}</p>
          </div>
          <div className="service-card">
            <img src={TwentyFourSeven_Image} alt="24/7" />
            <h3>{t('home_sections.services_cards.support_title')}</h3>
            <p>{t('home_sections.services_cards.support_desc')}</p>
          </div>
          <div className="service-card">
            <img src={Continuous_Image} alt="Continuous Mode" />
            <h3>{t('home_sections.services_cards.optimization_title')}</h3>
            <p>{t('home_sections.services_cards.optimization_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSupport;


