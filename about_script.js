// ==================== NAVIGATION & HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && link.parentElement.classList.contains('nav-item')) {
            return;
        }
        
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Mobile dropdown toggle
if (window.innerWidth <= 768) {
    const navItem = document.querySelector('.nav-item');
    if (navItem) {
        const navItemLink = navItem.querySelector('a');
        navItemLink.addEventListener('click', function(e) {
            e.preventDefault();
            navItem.classList.toggle('mobile-active');
        });
    }
}

// Clone right buttons into mobile menu
const navRight = document.querySelector('.nav-right');
if (navRight && window.innerWidth <= 768) {
    const registerBtn = navRight.querySelector('.register-btn');
    const loginBtn = navRight.querySelector('.login-btn');
    if (registerBtn && loginBtn) {
        const registerClone = registerBtn.cloneNode(true);
        const loginClone = loginBtn.cloneNode(true);
        navMenu.appendChild(registerClone);
        navMenu.appendChild(loginClone);
    }
}

// ==================== MISSION STATS COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const text = counter.textContent;
    const hasPlus = text.includes('+');
    const numericValue = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    // Dynamic duration based on magnitude
    let duration;
    if (numericValue >= 1000) {
        duration = 2500; // Faster for thousands
    } else if (numericValue >= 100) {
        duration = 2000; // Medium for hundreds
    } else if (numericValue >= 50) {
        duration = 1800; // Slower for smaller numbers
    } else {
        duration = 1500; // Slowest for very small numbers
    }
    
    let startTime = null;

    const updateCounter = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        // Easing function for smooth animation
        const easingProgress = Math.min(progress / duration, 1);
        const easedValue = easingProgress < 0.5
            ? 2 * easingProgress * easingProgress
            : 1 - Math.pow(-2 * easingProgress + 2, 2) / 2;
        
        const current = numericValue * easedValue;
        
        if (progress < duration) {
            counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = numericValue + (hasPlus ? '+' : '');
        }
    };
    
    // Store original text and start from 0
    counter.setAttribute('data-original', text);
    counter.textContent = '0' + (hasPlus ? '+' : '');
    requestAnimationFrame(updateCounter);
};

// ==================== VISION CARDS FADE IN ANIMATION ====================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

window.addEventListener('load', () => {
    // Counter Animation Observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(counter => counterObserver.observe(counter));

    // Vision Cards Fade In - Individual observation
    const visionPoints = document.querySelectorAll('.vision-point');
    
    visionPoints.forEach((point, index) => {
        point.style.opacity = '0';
        point.style.transform = 'translateX(40px)';
        
        const pointObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        point.style.transition = 'all 0.8s ease';
                        point.style.opacity = '1';
                        point.style.transform = 'translateX(0)';
                    }, index * 200);
                    pointObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        pointObserver.observe(point);
    });
});