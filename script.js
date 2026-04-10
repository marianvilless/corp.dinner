// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Counter animation
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounter(counter), 10);
    } else {
        counter.innerText = target;
    }
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 1 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add some sparkle animation to hero
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    document.querySelector('.hero').appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

setInterval(createSparkle, 500);

// Add sparkle styles dynamically
const style = document.createElement('style');
style.textContent = `
    .sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #FFD700;
        border-radius: 50%;
        animation: sparkle-fall 3s linear infinite;
        pointer-events: none;
    }

    @keyframes sparkle-fall {
        0% {
            opacity: 1;
            transform: translateY(-10px);
        }
        100% {
            opacity: 0;
            transform: translateY(100vh);
        }
    }
`;
document.head.appendChild(style);

// Lightbox functionality
let currentImageIndex = 0;
let images = [];

function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    // Get all gallery images
    images = Array.from(document.querySelectorAll('.gallery-item img'));
    currentImageIndex = images.indexOf(element);
    
    lightboxImg.src = element.src;
    lightboxImg.alt = element.alt;
    lightbox.style.display = 'flex';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[currentImageIndex].src;
    lightboxImg.alt = images[currentImageIndex].alt;
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (document.getElementById('lightbox').style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});