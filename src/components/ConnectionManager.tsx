import React, { useEffect, useState } from 'react';

interface ConnectionManagerProps {
  children: React.ReactNode;
}

export const ConnectionManager: React.FC<ConnectionManagerProps> = ({ children }) => {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Handle connection errors
    const handleError = (event: ErrorEvent) => {
      if (event.error && event.error.message) {
        const errorMessage = event.error.message.toLowerCase();
        
        // Check if it's a connection-related error
        if (errorMessage.includes('connection') || 
            errorMessage.includes('receiving end') ||
            errorMessage.includes('websocket') ||
            errorMessage.includes('network') ||
            errorMessage.includes('canvas') ||
            errorMessage.includes('three') ||
            errorMessage.includes('r3f')) {
          
          console.warn('Connection error detected:', event.error.message);
          setConnectionStatus('error');
          
          // Auto-retry after 3 seconds
          setTimeout(() => {
            if (retryCount < 3) {
              setRetryCount(prev => prev + 1);
              setConnectionStatus('connected');
            }
          }, 3000);
          
          // Prevent the error from bubbling up
          event.preventDefault();
          return false;
        }
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && event.reason.message) {
        const errorMessage = event.reason.message.toLowerCase();
        
        // Check if it's a connection-related error
        if (errorMessage.includes('connection') || 
            errorMessage.includes('receiving end') ||
            errorMessage.includes('websocket') ||
            errorMessage.includes('network') ||
            errorMessage.includes('canvas') ||
            errorMessage.includes('three') ||
            errorMessage.includes('r3f')) {
          
          console.warn('Connection promise rejection detected:', event.reason.message);
          setConnectionStatus('error');
          
          // Auto-retry after 3 seconds
          setTimeout(() => {
            if (retryCount < 3) {
              setRetryCount(prev => prev + 1);
              setConnectionStatus('connected');
            }
          }, 3000);
          
          // Prevent the error from bubbling up
          event.preventDefault();
          return false;
        }
      }
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [retryCount]);

  // Show connection status indicator
  const renderConnectionStatus = () => {
    if (connectionStatus === 'error' && retryCount < 3) {
      return (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 107, 53, 0.9)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          zIndex: 10000,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <span>🔄 Đang thử kết nối lại... ({retryCount + 1}/3)</span>
        </div>
      );
    }
    
    if (connectionStatus === 'error' && retryCount >= 3) {
      return (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 0, 0, 0.9)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontSize: '0.9rem',
          zIndex: 10000,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <span>❌ Lỗi kết nối. Vui lòng tải lại trang.</span>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {renderConnectionStatus()}
      {children}
    </>
  );
};
