// ===== SCENE MANAGER =====
import { RobotFactory } from '../components/RobotFactory.js';
import { EnvironmentBuilder } from '../components/EnvironmentBuilder.js';
import { CameraController } from '../components/CameraController.js';
import { LightingManager } from '../components/LightingManager.js';
import { PostProcessingManager } from '../components/PostProcessingManager.js';

export class SceneManager {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // Managers
        this.robotFactory = null;
        this.environmentBuilder = null;
        this.cameraController = null;
        this.lightingManager = null;
        this.postProcessingManager = null;
        
        // Scene objects
        this.robotGroup = null;
        this.environmentGroup = null;
        
        // State
        this.isInitialized = false;
        this.autoRotate = false;
        this.wireframeMode = false;
        this.isFullscreen = false;
        
        // Performance
        this.frameCount = 0;
        this.lastTime = 0;
        this.fps = 60;
        
        // Bind methods
        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }
    
    async init() {
        try {
            console.log('🎬 Initializing Scene Manager...');
            
            // Create scene
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog(0x0a0a0f, 10, 100);
            
            // Create camera
            this.camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            );
            this.camera.position.set(5, 3, 5);
            
            // Create renderer
            this.renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('three-canvas'),
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            
            this.setupRenderer();
            
            // Initialize managers
            this.robotFactory = new RobotFactory();
            this.environmentBuilder = new EnvironmentBuilder();
            this.cameraController = new CameraController(this.camera, this.renderer.domElement);
            this.lightingManager = new LightingManager(this.scene);
            this.postProcessingManager = new PostProcessingManager(this.renderer, this.scene, this.camera);
            
            // Setup scene
            await this.setupScene();
            
            // Setup controls
            this.setupControls();
            
            // Setup event listeners
            this.setupEventListeners();
            
            this.isInitialized = true;
            console.log('✅ Scene Manager initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize Scene Manager:', error);
            throw error;
        }
    }
    
    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
    }
    
    async setupScene() {
        // Create environment
        this.environmentGroup = new THREE.Group();
        await this.environmentBuilder.build(this.environmentGroup);
        this.scene.add(this.environmentGroup);
        
        // Create robots
        this.robotGroup = new THREE.Group();
        await this.robotFactory.createRobots(this.robotGroup);
        this.scene.add(this.robotGroup);
        
        // Setup lighting
        this.lightingManager.setup();
        
        // Setup post-processing
        await this.postProcessingManager.setup();
    }
    
    setupControls() {
        this.controls = this.cameraController.getControls();
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 20;
    }
    
    setupEventListeners() {
        // Mouse events for product selection
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        this.renderer.domElement.addEventListener('click', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            const intersects = raycaster.intersectObjects(this.robotGroup.children, true);
            
            if (intersects.length > 0) {
                const clickedObject = intersects[0].object;
                let robotName = clickedObject.name;
                
                // Find the parent robot group
                while (clickedObject.parent && !robotName) {
                    clickedObject = clickedObject.parent;
                    robotName = clickedObject.name;
                }
                
                if (robotName) {
                    window.app.showProduct(robotName);
                }
            }
        });
    }
    
    animate() {
        if (!this.isInitialized) return;
        
        // Update controls
        this.controls.update();
        
        // Auto rotation
        if (this.autoRotate) {
            this.robotGroup.rotation.y += 0.01;
        }
        
        // Animate robots
        this.robotGroup.children.forEach((robot, index) => {
            robot.position.y = Math.sin(Date.now() * 0.001 + index) * 0.1;
        });
        
        // Update post-processing
        this.postProcessingManager.update();
        
        // Render scene
        if (this.postProcessingManager.isEnabled()) {
            this.postProcessingManager.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
        
        // Update performance stats
        this.updatePerformanceStats();
    }
    
    updatePerformanceStats() {
        this.frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Update FPS counter
            const fpsCounter = document.getElementById('fps-counter');
            if (fpsCounter) {
                fpsCounter.textContent = `${this.fps} FPS`;
            }
            
            // Update scene stats
            const sceneStats = document.getElementById('scene-stats');
            if (sceneStats) {
                const objects = this.scene.children.length;
                const triangles = this.renderer.info.render.triangles;
                sceneStats.innerHTML = `
                    <span>Objects: ${objects}</span>
                    <span>Triangles: ${triangles.toLocaleString()}</span>
                `;
            }
        }
    }
    
    handleResize() {
        if (!this.isInitialized) return;
        
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        this.postProcessingManager.handleResize();
    }
    
    // Public API methods
    resetCamera() {
        this.camera.position.set(5, 3, 5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    toggleAutoRotate() {
        this.autoRotate = !this.autoRotate;
        const btn = document.getElementById('auto-rotate-btn');
        if (btn) {
            btn.classList.toggle('active', this.autoRotate);
        }
    }
    
    toggleWireframe() {
        this.wireframeMode = !this.wireframeMode;
        const btn = document.getElementById('wireframe-btn');
        if (btn) {
            btn.classList.toggle('active', this.wireframeMode);
        }
        
        this.robotGroup.traverse((child) => {
            if (child.isMesh) {
                child.material.wireframe = this.wireframeMode;
            }
        });
    }
    
    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        const btn = document.getElementById('fullscreen-btn');
        if (btn) {
            btn.classList.toggle('active', this.isFullscreen);
        }
        
        if (this.isFullscreen) {
            this.renderer.domElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
    
    focusOnProduct(productId) {
        const robot = this.robotGroup.children.find(child => child.name === productId);
        if (robot) {
            const targetPosition = robot.position.clone();
            targetPosition.y += 1;
            
            this.cameraController.animateTo(targetPosition, robot.position);
        }
    }
    
    focusOnCompany() {
        const targetPosition = new THREE.Vector3(0, 5, 10);
        const targetLookAt = new THREE.Vector3(0, 0, 0);
        this.cameraController.animateTo(targetPosition, targetLookAt);
    }
    
    focusOnContact() {
        const targetPosition = new THREE.Vector3(0, 2, -10);
        const targetLookAt = new THREE.Vector3(0, 0, 0);
        this.cameraController.animateTo(targetPosition, targetLookAt);
    }
    
    startDemo() {
        // Start automated demo sequence
        this.cameraController.startDemoSequence();
    }
    
    cleanup() {
        // Dispose of Three.js resources
        this.scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });
        
        this.renderer.dispose();
        this.postProcessingManager.cleanup();
    }
} 