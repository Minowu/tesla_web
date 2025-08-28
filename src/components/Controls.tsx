import React from 'react';
import { useAppStore } from '../store/appStore';

export const Controls: React.FC = () => {
  const { 
    isAutoRotate, 
    isWireframe, 
    toggleAutoRotate, 
    toggleWireframe,
    resetCamera 
  } = useAppStore();

  return (
    <div className="controls">
      <div className="controls-header">
        <h3>Điều khiển</h3>
      </div>
      
      <div className="controls-content">
        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              checked={isAutoRotate}
              onChange={toggleAutoRotate}
            />
            Tự động xoay
          </label>
        </div>
        
        <div className="control-group">
          <label className="control-label">
            <input
              type="checkbox"
              checked={isWireframe}
              onChange={toggleWireframe}
            />
            Chế độ khung dây
          </label>
        </div>
        
        <div className="control-group">
          <button 
            className="control-button"
            onClick={resetCamera}
          >
            Đặt lại camera
          </button>
        </div>
        
        <div className="control-instructions">
          <h4>Hướng dẫn điều khiển:</h4>
          <ul>
            <li>🖱️ Chuột trái: Xoay camera</li>
            <li>🖱️ Chuột phải: Di chuyển camera</li>
            <li>🖱️ Cuộn chuột: Zoom in/out</li>
            <li>👆 Chạm vào robot: Xem thông tin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 