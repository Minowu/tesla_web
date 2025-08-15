// ===== MAIN APPLICATION =====
import { SceneManager } from './scenes/SceneManager.js';
import { UIManager } from './components/UIManager.js';
import { ProductManager } from './components/ProductManager.js';
import { LoadingManager } from './utils/LoadingManager.js';
import { PerformanceMonitor } from './utils/PerformanceMonitor.js';

class ThadorobotApp {
    constructor() {
        this.sceneManager = null;
        this.uiManager = null;
        this.productManager = null;
        this.loadingManager = null;
        this.performanceMonitor = null;
        
        this.isInitialized = false;
        this.currentProduct = null;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.animate = this.animate.bind(this);
    }
    
    async init() {
        try {
            console.log('🚀 Initializing Thadorobot 3D Application...');
            
            // Initialize managers
            this.loadingManager = new LoadingManager();
            this.performanceMonitor = new PerformanceMonitor();
            this.uiManager = new UIManager();
            this.productManager = new ProductManager();
            this.sceneManager = new SceneManager();
            
            // Setup loading
            this.loadingManager.updateProgress(10, 'Initializing managers...');
            
            // Initialize UI
            await this.uiManager.init();
            this.loadingManager.updateProgress(30, 'UI initialized...');
            
            // Initialize 3D scene
            await this.sceneManager.init();
            this.loadingManager.updateProgress(60, '3D scene loaded...');
            
            // Initialize product data
            await this.productManager.init();
            this.loadingManager.updateProgress(80, 'Product data loaded...');
            
            // Setup event listeners
            this.setupEventListeners();
            this.loadingManager.updateProgress(90, 'Event listeners setup...');
            
            // Start animation loop
            this.animate();
            this.loadingManager.updateProgress(100, 'Application ready!');
            
            // Hide loading screen
            setTimeout(() => {
                this.loadingManager.hide();
                this.isInitialized = true;
                console.log('✅ Thadorobot 3D Application initialized successfully!');
            }, 1000);
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.loadingManager.showError('Failed to initialize application');
        }
    }
    
    setupEventListeners() {
        // Window events
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
        
        // Navigation events
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                this.navigateToSection(section);
            });
        });
        
        // Mobile navigation
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    handleResize() {
        if (this.sceneManager) {
            this.sceneManager.handleResize();
        }
        if (this.uiManager) {
            this.uiManager.handleResize();
        }
    }
    
    animate() {
        requestAnimationFrame(this.animate);
        
        // Update 3D scene
        if (this.sceneManager) {
            this.sceneManager.animate();
        }
        
        // Update performance monitor
        if (this.performanceMonitor) {
            this.performanceMonitor.update();
        }
        
        // Update UI animations
        if (this.uiManager) {
            this.uiManager.animate();
        }
    }
    
    navigateToSection(section) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`)?.classList.add('active');
        
        // Handle section-specific logic
        switch (section) {
            case 'home':
                this.sceneManager?.resetCamera();
                break;
            case 'products':
                this.showProductGallery();
                break;
            case 'about':
                this.sceneManager?.focusOnCompany();
                break;
            case 'contact':
                this.sceneManager?.focusOnContact();
                break;
        }
    }
    
    showProductGallery() {
        const gallery = document.getElementById('product-gallery');
        if (gallery) {
            gallery.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Public API methods for HTML onclick handlers
    exploreProducts() {
        this.navigateToSection('products');
    }
    
    showDemo() {
        if (this.sceneManager) {
            this.sceneManager.startDemo();
        }
    }
    
    resetCamera() {
        if (this.sceneManager) {
            this.sceneManager.resetCamera();
        }
    }
    
    toggleAutoRotate() {
        if (this.sceneManager) {
            this.sceneManager.toggleAutoRotate();
        }
    }
    
    toggleWireframe() {
        if (this.sceneManager) {
            this.sceneManager.toggleWireframe();
        }
    }
    
    toggleFullscreen() {
        if (this.sceneManager) {
            this.sceneManager.toggleFullscreen();
        }
    }
    
    showProduct(productId) {
        if (this.productManager) {
            this.productManager.showProduct(productId);
        }
        if (this.sceneManager) {
            this.sceneManager.focusOnProduct(productId);
        }
    }
    
    hideProductInfo() {
        if (this.productManager) {
            this.productManager.hideProduct();
        }
    }
    
    requestQuote() {
        // Open quote request modal or redirect
        window.open('mailto:info@thadorobot.com?subject=Yêu cầu báo giá', '_blank');
    }
    
    downloadBrochure() {
        // Trigger brochure download
        const link = document.createElement('a');
        link.href = 'assets/documents/thadorobot-brochure.pdf';
        link.download = 'Thadorobot-Brochure.pdf';
        link.click();
    }
    
    cleanup() {
        // Cleanup resources
        if (this.sceneManager) {
            this.sceneManager.cleanup();
        }
        if (this.performanceMonitor) {
            this.performanceMonitor.cleanup();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.handleResize);
    }
}

// ===== GLOBAL APP INSTANCE =====
window.app = new ThadorobotApp();

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.app.init();
});

// ===== EXPORT FOR MODULES =====
export { ThadorobotApp }; 