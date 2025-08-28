import React from 'react';
import { useAppStore } from '../store/appStore';

export const PerformanceMonitor: React.FC = () => {
  const { fps, isPerformanceMode } = useAppStore();

  return (
    <div className="performance-monitor">
      <div className="performance-header">
        <h4>Hiệu suất</h4>
      </div>
      
      <div className="performance-content">
        <div className="performance-item">
          <span className="performance-label">FPS:</span>
          <span className={`performance-value ${fps < 30 ? 'warning' : 'good'}`}>
            {fps}
          </span>
        </div>
        
        <div className="performance-item">
          <span className="performance-label">Chế độ:</span>
          <span className="performance-value">
            {isPerformanceMode ? 'Hiệu suất cao' : 'Chất lượng cao'}
          </span>
        </div>
      </div>
    </div>
  );
}; 