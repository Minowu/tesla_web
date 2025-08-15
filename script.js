// Three.js Scene Setup
let scene, camera, renderer, controls;
let robotGroup, environmentGroup;
let autoRotate = false;
let wireframeMode = false;
let currentProduct = 'amr';

// Product data
const products = {
    amr: {
        title: 'AMR 1500kg',
        description: 'Robot tự động di chuyển với tải trọng 1500kg, công nghệ SLAM tiên tiến',
        specs: {
            'Tải trọng': '1500kg',
            'Tốc độ': '2.0 m/s',
            'Pin': '8 giờ',
            'Độ chính xác': '±10mm'
        }
    },
    handlift: {
        title: 'Handlift 1500',
        description: 'Xe nâng tay tự động với khả năng nâng tải lên đến 1500kg',
        specs: {
            'Tải trọng': '1500kg',
            'Chiều cao nâng': '1.6m',
            'Tốc độ': '1.5 m/s',
            'Pin': '6 giờ'
        }
    },
    reach: {
        title: 'Reach Type AGF',
        description: 'Xe nâng reach truck tự động với khả năng tiếp cận hàng hóa ở độ cao',
        specs: {
            'Tải trọng': '1500kg',
            'Chiều cao nâng': '4.5m',
            'Tốc độ': '1.8 m/s',
            'Pin': '10 giờ'
        }
    },
    charger: {
        title: 'Trạm sạc tự động',
        description: 'Hệ thống sạc pin tự động cho robot với công nghệ wireless charging',
        specs: {
            'Công suất': '10kW',
            'Thời gian sạc': '2 giờ',
            'Hiệu suất': '95%',
            'Tương thích': 'Tất cả robot'
        }
    }
};

// Initialize the application
function init() {
    setupScene();
    createEnvironment();
    createRobots();
    setupLights();
    setupControls();
    animate();
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 3000);
}

function setupScene() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f0f23, 10, 100);
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 3, 5);
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('three-canvas'),
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 2;
    controls.maxDistance = 20;
}

function createEnvironment() {
    environmentGroup = new THREE.Group();
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x1a1a2e,
        transparent: true,
        opacity: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    environmentGroup.add(floor);
    
    // Grid
    const gridHelper = new THREE.GridHelper(20, 20, 0x00d4ff, 0x0099cc);
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    environmentGroup.add(gridHelper);
    
    // Walls
    const wallMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x16213e,
        transparent: true,
        opacity: 0.6
    });
    
    // Back wall
    const backWall = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        wallMaterial
    );
    backWall.position.set(0, 5, -10);
    environmentGroup.add(backWall);
    
    // Side walls
    const leftWall = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        wallMaterial
    );
    leftWall.position.set(-10, 5, 0);
    leftWall.rotation.y = Math.PI / 2;
    environmentGroup.add(leftWall);
    
    const rightWall = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 10),
        wallMaterial
    );
    rightWall.position.set(10, 5, 0);
    rightWall.rotation.y = -Math.PI / 2;
    environmentGroup.add(rightWall);
    
    scene.add(environmentGroup);
}

function createRobots() {
    robotGroup = new THREE.Group();
    
    // AMR Robot
    createAMRRobot();
    
    // Handlift Robot
    createHandliftRobot();
    
    // Reach Truck
    createReachTruck();
    
    // Charging Station
    createChargingStation();
    
    scene.add(robotGroup);
}

function createAMRRobot() {
    const amrGroup = new THREE.Group();
    amrGroup.name = 'amr';
    amrGroup.position.set(-3, 0, 0);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(1.5, 0.3, 2);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x00d4ff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    amrGroup.add(base);
    
    // Body
    const bodyGeometry = new THREE.BoxGeometry(1.2, 0.8, 1.5);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x0099cc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.55;
    body.castShadow = true;
    amrGroup.add(body);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const wheelPositions = [
        [-0.6, 0.2, -0.8],
        [0.6, 0.2, -0.8],
        [-0.6, 0.2, 0.8],
        [0.6, 0.2, 0.8]
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(...pos);
        wheel.rotation.z = Math.PI / 2;
        wheel.castShadow = true;
        amrGroup.add(wheel);
    });
    
    // Sensors
    const sensorGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const sensorMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    
    const sensorPositions = [
        [0, 0.8, -0.7],
        [0, 0.8, 0.7],
        [-0.6, 0.8, 0],
        [0.6, 0.8, 0]
    ];
    
    sensorPositions.forEach(pos => {
        const sensor = new THREE.Mesh(sensorGeometry, sensorMaterial);
        sensor.position.set(...pos);
        amrGroup.add(sensor);
    });
    
    robotGroup.add(amrGroup);
}

function createHandliftRobot() {
    const handliftGroup = new THREE.Group();
    handliftGroup.name = 'handlift';
    handliftGroup.position.set(3, 0, 0);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(1.2, 0.4, 2.5);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x00d4ff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    handliftGroup.add(base);
    
    // Mast
    const mastGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
    const mastMaterial = new THREE.MeshLambertMaterial({ color: 0x0099cc });
    const mast = new THREE.Mesh(mastGeometry, mastMaterial);
    mast.position.set(0, 1.2, 0);
    mast.castShadow = true;
    handliftGroup.add(mast);
    
    // Forks
    const forkGeometry = new THREE.BoxGeometry(0.1, 0.1, 1.5);
    const forkMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
    
    const leftFork = new THREE.Mesh(forkGeometry, forkMaterial);
    leftFork.position.set(-0.3, 0.5, 0);
    leftFork.castShadow = true;
    handliftGroup.add(leftFork);
    
    const rightFork = new THREE.Mesh(forkGeometry, forkMaterial);
    rightFork.position.set(0.3, 0.5, 0);
    rightFork.castShadow = true;
    handliftGroup.add(rightFork);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 8);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const wheelPositions = [
        [-0.4, 0.25, -1],
        [0.4, 0.25, -1],
        [-0.4, 0.25, 1],
        [0.4, 0.25, 1]
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(...pos);
        wheel.rotation.z = Math.PI / 2;
        wheel.castShadow = true;
        handliftGroup.add(wheel);
    });
    
    robotGroup.add(handliftGroup);
}

function createReachTruck() {
    const reachGroup = new THREE.Group();
    reachGroup.name = 'reach';
    reachGroup.position.set(0, 0, -3);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(1.8, 0.5, 3);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x00d4ff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    reachGroup.add(base);
    
    // Mast
    const mastGeometry = new THREE.BoxGeometry(0.3, 4, 0.3);
    const mastMaterial = new THREE.MeshLambertMaterial({ color: 0x0099cc });
    const mast = new THREE.Mesh(mastGeometry, mastMaterial);
    mast.position.set(0, 2.25, 0);
    mast.castShadow = true;
    reachGroup.add(mast);
    
    // Forks
    const forkGeometry = new THREE.BoxGeometry(0.1, 0.1, 2);
    const forkMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
    
    const leftFork = new THREE.Mesh(forkGeometry, forkMaterial);
    leftFork.position.set(-0.4, 1.5, 0);
    leftFork.castShadow = true;
    reachGroup.add(leftFork);
    
    const rightFork = new THREE.Mesh(forkGeometry, forkMaterial);
    rightFork.position.set(0.4, 1.5, 0);
    rightFork.castShadow = true;
    reachGroup.add(rightFork);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 8);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const wheelPositions = [
        [-0.6, 0.3, -1.2],
        [0.6, 0.3, -1.2],
        [-0.6, 0.3, 1.2],
        [0.6, 0.3, 1.2]
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(...pos);
        wheel.rotation.z = Math.PI / 2;
        wheel.castShadow = true;
        reachGroup.add(wheel);
    });
    
    robotGroup.add(reachGroup);
}

function createChargingStation() {
    const chargerGroup = new THREE.Group();
    chargerGroup.name = 'charger';
    chargerGroup.position.set(0, 0, 3);
    
    // Base
    const baseGeometry = new THREE.BoxGeometry(2, 0.3, 1.5);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x00d4ff });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.castShadow = true;
    chargerGroup.add(base);
    
    // Station body
    const stationGeometry = new THREE.BoxGeometry(1.5, 1.5, 1);
    const stationMaterial = new THREE.MeshLambertMaterial({ color: 0x0099cc });
    const station = new THREE.Mesh(stationGeometry, stationMaterial);
    station.position.y = 0.9;
    station.castShadow = true;
    chargerGroup.add(station);
    
    // Charging pad
    const padGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.1, 8);
    const padMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const pad = new THREE.Mesh(padGeometry, padMaterial);
    pad.position.y = 0.05;
    pad.castShadow = true;
    chargerGroup.add(pad);
    
    // LED indicators
    const ledGeometry = new THREE.SphereGeometry(0.05, 8, 8);
    const ledMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    
    const ledPositions = [
        [-0.5, 1.6, 0],
        [0.5, 1.6, 0],
        [0, 1.6, 0.4],
        [0, 1.6, -0.4]
    ];
    
    ledPositions.forEach(pos => {
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(...pos);
        chargerGroup.add(led);
    });
    
    robotGroup.add(chargerGroup);
}

function setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    scene.add(directionalLight);
    
    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x00d4ff, 0.5, 10);
    pointLight1.position.set(-5, 5, 0);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0099cc, 0.5, 10);
    pointLight2.position.set(5, 5, 0);
    scene.add(pointLight2);
}

function setupControls() {
    // Window resize
    window.addEventListener('resize', onWindowResize);
    
    // Mouse events for product selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(robotGroup.children, true);
        
        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            let robotName = clickedObject.name;
            
            // Find the parent robot group
            while (clickedObject.parent && !robotName) {
                clickedObject = clickedObject.parent;
                robotName = clickedObject.name;
            }
            
            if (robotName && products[robotName]) {
                showProduct(robotName);
            }
        }
    }
    
    renderer.domElement.addEventListener('click', onMouseClick);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Auto rotation
    if (autoRotate) {
        robotGroup.rotation.y += 0.01;
    }
    
    // Animate robots
    robotGroup.children.forEach((robot, index) => {
        robot.position.y = Math.sin(Date.now() * 0.001 + index) * 0.1;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// UI Functions
function showProduct(productName) {
    currentProduct = productName;
    const product = products[productName];
    
    if (product) {
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('product-description').textContent = product.description;
        
        const specsContainer = document.querySelector('.product-specs');
        specsContainer.innerHTML = '';
        
        Object.entries(product.specs).forEach(([label, value]) => {
            const specDiv = document.createElement('div');
            specDiv.className = 'spec';
            specDiv.innerHTML = `
                <span class="spec-label">${label}:</span>
                <span class="spec-value">${value}</span>
            `;
            specsContainer.appendChild(specDiv);
        });
        
        document.getElementById('product-info').classList.add('visible');
        
        // Focus camera on selected robot
        const robot = robotGroup.children.find(child => child.name === productName);
        if (robot) {
            const targetPosition = robot.position.clone();
            targetPosition.y += 1;
            
            // Animate camera to robot
            const startPosition = camera.position.clone();
            const duration = 1000;
            const startTime = Date.now();
            
            function animateCamera() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                
                camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
                controls.target.lerp(robot.position, easeProgress);
                
                if (progress < 1) {
                    requestAnimationFrame(animateCamera);
                }
            }
            
            animateCamera();
        }
    }
}

function exploreProducts() {
    document.querySelector('.product-gallery').classList.add('visible');
    document.querySelector('.hero-section').style.opacity = '0';
}

function resetCamera() {
    camera.position.set(5, 3, 5);
    controls.target.set(0, 0, 0);
    controls.update();
}

function toggleAutoRotate() {
    autoRotate = !autoRotate;
    const btn = event.target;
    btn.classList.toggle('active', autoRotate);
}

function toggleWireframe() {
    wireframeMode = !wireframeMode;
    const btn = event.target;
    btn.classList.toggle('active', wireframeMode);
    
    robotGroup.traverse((child) => {
        if (child.isMesh) {
            child.material.wireframe = wireframeMode;
        }
    });
}

// Initialize when page loads
window.addEventListener('load', init); 