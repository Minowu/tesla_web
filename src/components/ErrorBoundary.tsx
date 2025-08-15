import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console but don't show to user if it's a connection error
    if (error.message.includes('connection') || error.message.includes('Receiving end')) {
      console.warn('Connection error detected, attempting to recover:', error.message);
      // Don't set error state for connection issues
      return;
    }
    
    // Handle R3F Canvas errors
    if (error.message.includes('Canvas is not part of the THREE namespace') || 
        error.message.includes('R3F') ||
        error.message.includes('THREE')) {
      console.warn('R3F Canvas error detected, attempting to recover:', error.message);
      // Don't set error state for R3F issues
      return;
    }
    
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ hasError: true, error, errorInfo });
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-family)',
          padding: '2rem'
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            borderRadius: '15px',
            padding: '3rem 2rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Đã xảy ra lỗi
            </h2>
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '2rem',
              lineHeight: '1.6'
            }}>
              Xin lỗi, có vấn đề với ứng dụng. Vui lòng thử lại hoặc tải lại trang.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--gradient-button)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={this.handleRetry}
              >
                Thử lại
              </button>
              <button 
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => window.location.reload()}
              >
                Tải lại trang
              </button>
            </div>
            {this.state.error && (
              <details style={{ 
                marginTop: '2rem', 
                textAlign: 'left',
                color: 'var(--text-muted)',
                fontSize: '0.9rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Chi tiết lỗi
                </summary>
                <pre style={{ 
                  background: 'rgba(0,0,0,0.3)', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '0.8rem'
                }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 