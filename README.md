# 🤖 Thadorobot - Website 3D Hiện đại với React Three Fiber

Website 3D tương tác hiện đại showcase sản phẩm robot công nghiệp Thadorobot, được xây dựng với **React Three Fiber** và các công nghệ tiên tiến nhất theo chuẩn quốc tế.

## ✨ Công nghệ Hiện đại được sử dụng

### 🎯 Core Framework
- **React 18.2+** - UI Framework hiện đại
- **TypeScript 5.0+** - Type safety & Developer experience
- **Vite 5.0+** - Build tool & dev server cực nhanh

### 🌟 3D Graphics & Animation
- **React Three Fiber 8.15+** - React renderer cho Three.js
- **Three.js 0.158+** - 3D graphics engine (thay vì r128 cũ)
- **@react-three/drei 9.88+** - Useful helpers cho R3F
- **@react-three/postprocessing 2.15+** - Post-processing effects
- **@react-three/gltfjsx 6.0+** - GLTF/GLB model loader
- **Framer Motion 10.16+** - UI animations & 3D motion
- **GSAP 3.12+** - Advanced animations

### 🎨 Modern UI/UX
- **CSS Custom Properties** - Modern CSS với design system
- **Framer Motion** - Smooth animations & transitions
- **Responsive Design** - Mobile-first approach

### 📊 State Management & Data
- **Zustand 4.4+** - Lightweight state management
- **React Router DOM 6.8+** - Client-side routing

### 🔧 Development Tools
- **ESLint** - Code linting với TypeScript support
- **Prettier** - Code formatting
- **TypeScript** - Type safety

## 🏗️ Cấu trúc dự án hiện đại & Clean Code

```
Thadorobot/
├── src/
│   ├── components/           # React Components (Modular)
│   │   ├── Scene3D.tsx      # Main 3D scene với R3F
│   │   ├── RobotModels.tsx  # 3D robot models (Clean & Reusable)
│   │   ├── Lighting.tsx     # Professional lighting system
│   │   ├── Environment3D.tsx # 3D environment & effects
│   │   ├── CameraController.tsx # Advanced camera controls
│   │   ├── Navigation.tsx   # Modern navigation
│   │   ├── HeroSection.tsx  # Landing section
│   │   ├── ProductInfo.tsx  # Product details panel
│   │   ├── Controls.tsx     # 3D scene controls
│   │   ├── LoadingScreen.tsx # Loading animation
│   │   ├── PerformanceMonitor.tsx # Performance tracking
│   │   └── ErrorBoundary.tsx # Error handling
│   ├── hooks/               # Custom React hooks
│   │   └── useFPS.ts        # Performance monitoring hook
│   ├── store/               # Zustand stores
│   │   └── appStore.ts      # Centralized state management
│   ├── styles/              # Styling
│   │   └── components.css   # Modern CSS with design system
│   ├── App.tsx              # Main App component
│   ├── main.tsx             # React entry point
│   └── index.html           # HTML template
├── public/                  # Public assets
├── dist/                    # Build output
├── tsconfig.json           # TypeScript config
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies & scripts
└── README.md               # This file
```

## 🚀 Cách sử dụng

### Yêu cầu hệ thống
- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Cài đặt & Chạy
```bash
# Clone repository
git clone https://github.com/thadorobot/3d-website.git
cd thadorobot-3d-website

# Install dependencies
npm install

# Development server
npm run dev

# Build production
npm run build

# Preview production
npm run preview
```

### Scripts có sẵn
```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run format       # Prettier format
npm run type-check   # TypeScript type checking
npm run analyze      # Bundle analysis
```

## 🎨 Tính năng 3D Hiện đại

### 🌟 React Three Fiber Features
- **Declarative 3D** - Viết 3D như React components
- **Automatic cleanup** - Memory management tự động
- **Performance optimization** - Built-in optimizations
- **TypeScript support** - Full type safety

### 🎭 Advanced Animations
```tsx
// Framer Motion 3D
<motion.group
  initial={{ scale: 0, rotation: [0, 0, 0] }}
  animate={{ scale: 1, rotation: [0, Math.PI * 2, 0] }}
  transition={{ duration: 2, ease: "easeOut" }}
>
  <RobotModel />
</motion.group>

// GSAP animations
useEffect(() => {
  gsap.to(cameraRef.current.position, {
    x: targetPosition.x,
    y: targetPosition.y,
    z: targetPosition.z,
    duration: 2,
    ease: "power2.out"
  });
}, [targetPosition]);
```

### 🎨 Post-processing Effects
```tsx
<EffectComposer>
  <Bloom 
    intensity={0.5} 
    luminanceThreshold={0.8}
    luminanceSmoothing={0.9}
  />
  <DepthOfField 
    focusDistance={0}
    focalLength={0.02}
    bokehScale={2}
  />
  <SSAO 
    radius={0.4}
    intensity={50}
    luminanceInfluence={0.4}
  />
</EffectComposer>
```

### 📱 Responsive 3D
```tsx
// Device detection
const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(max-width: 1024px)');

// Adaptive quality
const quality = isMobile ? 'low' : isTablet ? 'medium' : 'high';
const shadowMapSize = isMobile ? 512 : 2048;
```

## 🔧 State Management với Zustand

```tsx
// App state
const { currentProduct, isAutoRotate, setCurrentProduct } = useAppStore();

// Product data
const { products, getProduct } = useProductStore();

// Performance monitoring
const { fps, setFPS } = useAppStore();
```

## 📊 Performance Optimization

### 🚀 Built-in Optimizations
- **Code splitting** - Automatic chunk separation
- **Tree shaking** - Unused code elimination
- **Lazy loading** - On-demand component loading
- **Asset optimization** - Image compression & format conversion

### 🎯 3D Performance
- **Level of Detail (LOD)** - Adaptive model complexity
- **Frustum culling** - Only render visible objects
- **Instancing** - Efficient multiple objects
- **Texture compression** - Optimized texture loading

### 📈 Performance Monitoring
```tsx
// Real-time FPS monitoring
useFrame((state) => {
  const fps = 1 / state.clock.getDelta();
  setFPS(Math.round(fps));
});

// Memory usage tracking
useEffect(() => {
  const interval = setInterval(() => {
    const memory = performance.memory;
    console.log('Memory usage:', {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit
    });
  }, 1000);
  
  return () => clearInterval(interval);
}, []);
```

## 🎨 Design System

### 🎨 Color Palette
```css
:root {
  --primary: #00d4ff;
  --primary-dark: #0099cc;
  --secondary: #ff6b35;
  --accent: #4ecdc4;
  --bg-primary: #0a0a0f;
  --bg-secondary: #1a1a2e;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.8);
}
```

### 📱 Responsive Breakpoints
```css
/* Mobile First */
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

## 🔒 Security & Best Practices

### 🛡️ Security Features
- **Content Security Policy** - XSS protection
- **HTTPS Only** - Secure connections
- **Input validation** - Sanitized user inputs
- **Dependency scanning** - Regular security audits

### 📋 Code Quality
- **TypeScript strict mode** - Type safety
- **ESLint rules** - Code quality enforcement
- **Prettier formatting** - Consistent code style
- **Modular architecture** - Clean & maintainable code

## 🌐 Deployment

### 🚀 Production Build
```bash
npm run build
```

### 📦 Deployment Options
- **Vercel** - Zero-config deployment
- **Netlify** - Drag & drop deployment
- **AWS S3 + CloudFront** - CDN deployment
- **Docker** - Containerized deployment

### 🔧 Environment Variables
```bash
# .env.production
VITE_API_URL=https://api.thadorobot.com
VITE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=sentry_dsn_here
```

## 📈 Analytics & Monitoring

### 📊 Built-in Tracking
- **Performance metrics** - FPS, load times, memory usage
- **User interactions** - Clicks, navigation, 3D interactions
- **Error tracking** - Automatic error reporting
- **Device analytics** - Browser, OS, screen size

### 🔗 Integration Ready
- **Google Analytics 4** - GA4 support
- **Sentry** - Error monitoring
- **Hotjar** - Heatmaps & recordings
- **Custom events** - Business metrics

## 🤝 Contributing

### 🛠️ Development Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes & test
4. Run linting: `npm run lint`
5. Run type check: `npm run type-check`
6. Commit: `git commit -m 'feat: add new feature'`
7. Push: `git push origin feature/new-feature`
8. Create Pull Request

### 📋 Code Standards
- **Conventional Commits** - Standard commit messages
- **TypeScript strict** - Full type safety
- **ESLint rules** - Code quality
- **Prettier** - Consistent formatting
- **Modular components** - Clean & reusable code

## 📞 Support & Contact

### 📧 Contact Information
- **Website**: [thadorobot.com](https://thadorobot.com)
- **Email**: info@thadorobot.com
- **Phone**: +84 xxx xxx xxx
- **GitHub**: [github.com/thadorobot](https://github.com/thadorobot)

### 📚 Documentation
- **API Docs**: `/docs/api.md`
- **Component Library**: `/docs/components.md`
- **3D Models**: `/docs/models.md`
- **Deployment Guide**: `/docs/deployment.md`

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Thadorobot** - Tương lai của tự động hóa 🚀

*Built with ❤️ using React Three Fiber & modern web technologies*

---

## 🎯 So sánh với phiên bản cũ

| Tính năng | Phiên bản cũ | Phiên bản mới |
|-----------|-------------|---------------|
| **Framework** | Vanilla JS | React 18 + TypeScript |
| **3D Engine** | Three.js r128 | Three.js 0.158 + React Three Fiber |
| **State Management** | Global variables | Zustand + Centralized store |
| **Build Tool** | CDN + Live Server | Vite 5.0 + Hot Reload |
| **Styling** | CSS thuần | Modern CSS với design system |
| **Animations** | CSS animations | Framer Motion + GSAP |
| **3D Models** | Geometry cơ bản | GLTF/GLB models |
| **Effects** | Basic lighting | Post-processing (Bloom, DOF, SSAO) |
| **Performance** | Manual optimization | Built-in optimizations |
| **Type Safety** | JavaScript | TypeScript strict mode |
| **Code Quality** | Manual review | ESLint + Prettier |
| **Architecture** | Monolithic | Modular components |
| **Deployment** | Static files | Modern CI/CD pipeline |
| **Error Handling** | Basic | Error boundaries |
| **Performance Monitoring** | None | Real-time FPS & memory tracking |

## 🌟 Tính năng mới được thêm

### 🎨 UI/UX Improvements
- **Modern Hero Section** - Landing page với animations
- **Interactive Product Info** - Panel thông tin sản phẩm
- **Professional Controls** - Điều khiển 3D chuyên nghiệp
- **Loading Screen** - Animation loading hiện đại
- **Performance Monitor** - Theo dõi hiệu suất real-time

### 🔧 Technical Improvements
- **Modular Architecture** - Components tách biệt, dễ bảo trì
- **Type Safety** - TypeScript cho tất cả components
- **Error Boundaries** - Xử lý lỗi gracefully
- **Performance Hooks** - Custom hooks cho monitoring
- **Responsive Design** - Mobile-first approach

### 🎯 3D Enhancements
- **Professional Lighting** - Hệ thống ánh sáng chuyên nghiệp
- **Environment Effects** - Môi trường 3D với clouds, stars
- **Camera Controls** - Điều khiển camera nâng cao
- **Model Optimization** - Tối ưu hóa 3D models
- **Post-processing** - Visual effects chuyên nghiệp 