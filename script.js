// Performance optimized particle animation
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1; // Reduced particle size
        this.speedX = Math.random() * 1 - 0.5; // Reduced speed
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() < 0.5 ? '#ff00ff80' : '#00ffff80'; // Added transparency
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05; // Slower size reduction
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particle animation with performance optimizations
function initParticles() {
    const particlesContainer = document.querySelector('.neon-particles');
    if (!particlesContainer) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    let particles = [];
    let animationFrameId;
    let lastTime = 0;
    const fps = 30; // Limit FPS for better performance
    const fpsInterval = 1000 / fps;

    function resizeCanvas() {
        canvas.width = particlesContainer.offsetWidth;
        canvas.height = particlesContainer.offsetHeight;
    }

    function createParticles(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Limit number of particles
        if (particles.length < 100) {
            for (let i = 0; i < 3; i++) {
                particles.push(new Particle(x, y));
            }
        }
    }

    function animate(currentTime) {
        animationFrameId = requestAnimationFrame(animate);

        // FPS limiting
        const elapsed = currentTime - lastTime;
        if (elapsed < fpsInterval) return;
        lastTime = currentTime - (elapsed % fpsInterval);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Use for...of for better performance
        for (const particle of particles) {
            particle.update();
        }

        // Remove small particles in batch
        particles = particles.filter(particle => particle.size > 0.2);

        // Draw remaining particles
        for (const particle of particles) {
            particle.draw(ctx);
        }
    }

    // Throttled event listener for resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 250);
    });

    // Throttled event listener for mousemove
    let lastMove = 0;
    canvas.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMove > 50) { // 20fps for particle creation
            createParticles(e);
            lastMove = now;
        }
    });
    
    particlesContainer.appendChild(canvas);
    resizeCanvas();
    animate(0);

    return () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        window.removeEventListener('resize', resizeCanvas);
        canvas.removeEventListener('mousemove', createParticles);
        cancelAnimationFrame(animationFrameId);
    };
}

// Destination data
const destinations = [
    {
        title: "Neo Tokyo",
        description: "Experience the heart of cyberpunk culture in this neon-lit metropolis where tradition meets cutting-edge technology.",
        image: "https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=800"
    },
    {
        title: "Shanghai 2049",
        description: "Explore the vertical forests and quantum computing districts of tomorrow's most advanced Asian metropolis.",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800"
    },
    {
        title: "Dubai Oasis",
        description: "Witness how climate control technology transformed the desert into a thriving cyber-ecological paradise.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"
    },
    {
        title: "Singapore Smart City",
        description: "Discover the perfect fusion of nature and AI in this garden city of the future.",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800"
    },
    {
        title: "Los Angeles 2049",
        description: "Step into the future of entertainment where reality and digital dreams become one.",
        image: "https://images.unsplash.com/photo-1515896769750-31548aa180ed?w=800"
    },
    {
        title: "Seoul Digital District",
        description: "K-pop meets K-tech in this vibrant digital wonderland. Experience the future of entertainment and culture.",
        image: "https://images.unsplash.com/photo-1617048931430-5eb626d81e71?w=800"
    },
    {
        title: "Berlin Underground",
        description: "Explore the tech-savvy underground culture in Europe's most progressive city. Virtual raves and digital art galleries await.",
        image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800"
    },
    {
        title: "London Neo Victorian",
        description: "Where steampunk meets cyberpunk. Victorian architecture enhanced with holographic projections and AI-guided tours.",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800"
    },
    {
        title: "Moscow Cyberdome",
        description: "Experience winter like never before under the world's largest climate-controlled dome. Arctic adventures meet virtual reality.",
        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800"
    },
    {
        title: "San Francisco AI Valley",
        description: "Silicon Valley evolved. Where artificial intelligence and human creativity spark the next tech revolution.",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800"
    },
    {
        title: "Mumbai Neon Nights",
        description: "Traditional Indian culture enhanced by cutting-edge technology. Experience Bollywood in augmented reality.",
        image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800"
    },
    {
        title: "Sydney Smart Harbor",
        description: "The iconic harbor reimagined with floating entertainment platforms and interactive light shows.",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800"
    }
];

// Function to populate destinations
function populateDestinations() {
    const container = document.getElementById('destinationCards');
    if (!container) return;

    container.innerHTML = '';
    
    destinations.forEach(dest => {
        const title = dest.title.toLowerCase().replace(/\s+/g, '-');
        const html = `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${dest.image}" alt="${dest.title}">
                </div>
                <div class="destination-info">
                    <h3 class="destination-title">${dest.title}</h3>
                    <p class="destination-description">${dest.description}</p>
                    <a href="destinations/${title}.html" class="explore-btn">Explore</a>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        initParticles();
        populateDestinations();
    });
});
