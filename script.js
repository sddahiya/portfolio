// ===== Typewriter Effect =====
const typewriterTexts = [
    "Cybersecurity Enthusiast",
    "Network Security Specialist",
    "Red Hat Linux Administrator",
    "Building Secure Infrastructure"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
    const currentText = typewriterTexts[textIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

typeWriter();

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('active');
});

navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksEl.classList.remove('active');
    });
});

// ===== Scroll Reveal Animation =====
const fadeElements = document.querySelectorAll('.project-card, .skill-category, .stat-card, .contact-card');

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// ===== Particle Background =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.4 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
        ctx.fill();
    }
}

const particles = [];
const particleCount = Math.min(80, Math.floor(width * height / 15000));

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                const opacity = (1 - dist / 150) * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== 3D Card Tilt Effect on Project Cards =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation degrees (-10deg to 10deg)
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// ===== Interactive 3D Cyber Core (Three.js) =====
function init3DCyberCore() {
    const container = document.getElementById('hero-3d-container');
    if (!container || typeof THREE === 'undefined') return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold all 3D cyber nodes
    const cyberGroup = new THREE.Group();
    scene.add(cyberGroup);

    // 1. Inner Glowing Wireframe Sphere (Target/Node Core)
    const coreGeo = new THREE.IcosahedronGeometry(5.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
        transparent: true,
        opacity: 0.65
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    cyberGroup.add(coreMesh);

    // 2. Middle Dense Geometric Shield (Cyber Ring)
    const ringGeo = new THREE.TorusGeometry(8.5, 0.12, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.8
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    cyberGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ring2.material.color.setHex(0xa855f7);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    cyberGroup.add(ring2);

    // 3. Floating Network Nodes (Points around the sphere)
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        const radius = 6.5 + Math.random() * 4.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particlePositions[i + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ff88,
        size: 0.28,
        transparent: true,
        opacity: 0.85
    });
    const pointCloud = new THREE.Points(particleGeometry, particleMaterial);
    cyberGroup.add(pointCloud);

    // Mouse Interaction / Drag & Tilt
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - prevMouseX;
            const deltaY = e.clientY - prevMouseY;
            targetRotationY += deltaX * 0.008;
            targetRotationX += deltaY * 0.008;
            prevMouseX = e.clientX;
            prevMouseY = e.clientY;
        } else {
            // Subtle interactive tilt following mouse on container
            const rect = container.getBoundingClientRect();
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                const normX = (e.clientX - rect.left) / rect.width - 0.5;
                const normY = (e.clientY - rect.top) / rect.height - 0.5;
                targetRotationY = normX * 0.8;
                targetRotationX = normY * 0.8;
            }
        }
    });

    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            prevMouseX = e.touches[0].clientX;
            prevMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            const deltaX = e.touches[0].clientX - prevMouseX;
            const deltaY = e.touches[0].clientY - prevMouseY;
            targetRotationY += deltaX * 0.008;
            targetRotationX += deltaY * 0.008;
            prevMouseX = e.touches[0].clientX;
            prevMouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        if (!container) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
    });

    // Animation Loop
    let clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Constant organic 3D rotation
        cyberGroup.rotation.y += 0.004;
        ring1.rotation.z += 0.008;
        ring2.rotation.z -= 0.006;
        pointCloud.rotation.y -= 0.002;

        // Smooth damping interpolation toward target mouse/drag rotation
        cyberGroup.rotation.x += (targetRotationX - cyberGroup.rotation.x) * 0.05;
        cyberGroup.rotation.y += (targetRotationY - 0) * 0.02;

        // Subtle pulsing scale
        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
        coreMesh.scale.set(scale, scale, scale);

        renderer.render(scene, camera);
    }

    animate();
}

window.addEventListener('DOMContentLoaded', () => {
    init3DCyberCore();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init3DCyberCore();
}

console.log('%c🔒 Portfolio of Saurabh Dahiya — Cybersecurity Enthusiast', 'color: #00ff88; font-size: 14px; font-weight: bold;');
