// ==================== NAVIGATION & HAMBURGER MENU ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking on a nav link (but not dropdown parent)
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close menu if clicking dropdown parent on mobile
        if (window.innerWidth <= 768 && link.parentElement.classList.contains('nav-item')) {
            return; // Let the mobile dropdown toggle handle this
        }
        
        if (window.innerWidth <= 768) {
            toggleMenu();
        }
    });
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// ==================== MOBILE DROPDOWN TOGGLE ====================
// Mobile dropdown toggle for "About Us"
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
if (navRight && window.innerWidth <= 768 && !navMenu.classList.contains('buttons-added')) {
    const registerBtn = navRight.querySelector('.register-btn');
    const loginBtn = navRight.querySelector('.login-btn');
    
    if (registerBtn && loginBtn) {
        navMenu.appendChild(registerBtn.cloneNode(true));
        navMenu.appendChild(loginBtn.cloneNode(true));
        navMenu.classList.add('buttons-added');
    }
}


// ==================== HERO SECTION TEXT ANIMATION ====================
const texts = [
    "Excellence & Innovation",
    "Professional Standards",
    "Global Recognition",
    "Industry Leadership"
];
let currentIndex = 0;
const changingText = document.getElementById('changingText');

function changeText() {
    if (changingText) {
        changingText.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            changingText.textContent = texts[currentIndex].toUpperCase();
            changingText.style.opacity = '1';
        }, 500);
    }
}

if (changingText) {
    changingText.style.opacity = '1';
    setInterval(changeText, 3000);
}

// ==================== HERO SECTION FADE IN ANIMATIONS ====================
window.addEventListener('load', () => {
    const heroH1 = document.querySelector('.hero-text h1');
    const heroH2 = document.querySelector('.hero-text h2');
    const heroP = document.querySelector('.hero-text p');
    const heroButtons = document.querySelectorAll('.hero-buttons button');

    // Add fade-in animation with staggered delays
    if (heroH1) {
        heroH1.style.opacity = '0';
        heroH1.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroH1.style.transition = 'all 0.8s ease';
            heroH1.style.opacity = '1';
            heroH1.style.transform = 'translateY(0)';
        }, 100);
    }

    if (heroH2) {
        heroH2.style.opacity = '0';
        heroH2.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroH2.style.transition = 'all 0.8s ease';
            heroH2.style.opacity = '1';
            heroH2.style.transform = 'translateY(0)';
        }, 300);
    }

    if (heroP) {
        heroP.style.opacity = '0';
        heroP.style.transform = 'translateY(30px)';
        setTimeout(() => {
            heroP.style.transition = 'all 0.8s ease';
            heroP.style.opacity = '1';
            heroP.style.transform = 'translateY(0)';
        }, 500);
    }

    heroButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(30px)';
        setTimeout(() => {
            button.style.transition = 'all 0.8s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 700 + (index * 150));
    });
});

// ==================== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ====================
const fadeObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, fadeObserverOptions);

// Apply fade-in effects to various elements
window.addEventListener('load', () => {
    // Quick Link Cards
    const quickLinkCards = document.querySelectorAll('.quick-link-card');
    quickLinkCards.forEach((card, index) => {
        card.classList.add('fade-in-element');
        card.style.animationDelay = `${index * 0.15}s`;
        fadeInObserver.observe(card);
    });

    // About Section - Sideways fade in
    const aboutImage = document.querySelector('.about-image');
    const aboutBadge = document.querySelector('.about-badge');
    const aboutContent = document.querySelector('.about-content');
    
    // Animate the badge separately with scale effect
    if (aboutBadge) {
        aboutBadge.style.opacity = '0';
        aboutBadge.style.transform = 'translateX(-40px) scale(0.9)';
        
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutBadge.style.transition = 'all 1s ease';
                    aboutBadge.style.opacity = '1';
                    aboutBadge.style.transform = 'translateX(0) scale(1)';
                    badgeObserver.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);
        
        badgeObserver.observe(aboutBadge);
    }
    
    // Animate image container
    if (aboutImage) {
        aboutImage.classList.add('fade-in-element', 'fade-in-left');
        fadeInObserver.observe(aboutImage);
    }
    
    // Animate content elements with stagger
    if (aboutContent) {
        // Select all child elements directly
        const aboutH2 = aboutContent.querySelector('h2');
        const aboutH3 = aboutContent.querySelector('h3');
        const aboutP = aboutContent.querySelector('p');
        const aboutBtn = aboutContent.querySelector('.btn-primary');
        
        const aboutElements = [aboutH2, aboutH3, aboutP, aboutBtn];
        
        // Set initial state for each element
        aboutElements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateX(40px)';
            }
        });
        
        // Trigger animation when about content is visible
        const aboutContentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutElements.forEach((element, index) => {
                        if (element) {
                            setTimeout(() => {
                                element.style.transition = 'all 0.8s ease';
                                element.style.opacity = '1';
                                element.style.transform = 'translateX(0)';
                            }, index * 150);
                        }
                    });
                    aboutContentObserver.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);
        
        aboutContentObserver.observe(aboutContent);
    }

    // Stats Section
    const statsTitle = document.querySelector('.stats-title');
    const statBoxes = document.querySelectorAll('.stat-box');
    if (statsTitle) {
        statsTitle.classList.add('fade-in-element');
        fadeInObserver.observe(statsTitle);
    }
    statBoxes.forEach((box, index) => {
        box.classList.add('fade-in-element');
        box.style.animationDelay = `${index * 0.1}s`;
        fadeInObserver.observe(box);
    });

    // OSP Section
    const ospTitle = document.querySelector('.osp-container h2');
    const ospVisual = document.querySelector('.osp-visual');
    const ospSteps = document.querySelectorAll('.osp-step');
    const ospBtn = document.querySelector('.osp-steps .cta-btn');
    
    if (ospTitle) {
        ospTitle.classList.add('fade-in-element');
        fadeInObserver.observe(ospTitle);
    }
    
    if (ospVisual) {
        ospVisual.classList.add('fade-in-element', 'fade-in-left');
        fadeInObserver.observe(ospVisual);
    }
    
    // Animate each OSP step individually from right
    ospSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(40px)';
        
        const ospStepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        step.style.transition = 'all 0.8s ease';
                        step.style.opacity = '1';
                        step.style.transform = 'translateX(0)';
                    }, index * 150);
                    ospStepObserver.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);
        
        ospStepObserver.observe(step);
    });
    
    // Animate CTA button
    if (ospBtn) {
        ospBtn.style.opacity = '0';
        ospBtn.style.transform = 'translateY(20px)';
        
        const ospBtnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        ospBtn.style.transition = 'all 0.8s ease';
                        ospBtn.style.opacity = '1';
                        ospBtn.style.transform = 'translateY(0)';
                    }, ospSteps.length * 150);
                    ospBtnObserver.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);
        
        ospBtnObserver.observe(ospBtn);
    }

    // Ecosystem Section
    const ecosystemTitle = document.querySelector('.ecosystem-title');
    const ecosystemSubtitle = document.querySelector('.ecosystem-subtitle');
    const ecosystemItems = document.querySelectorAll('.ecosystem-item');
    
    if (ecosystemTitle) {
        ecosystemTitle.classList.add('fade-in-element');
        fadeInObserver.observe(ecosystemTitle);
    }
    if (ecosystemSubtitle) {
        ecosystemSubtitle.classList.add('fade-in-element');
        fadeInObserver.observe(ecosystemSubtitle);
    }
    
    // Animate each ecosystem item individually
    ecosystemItems.forEach((item, index) => {
        const number = item.querySelector('.ecosystem-number');
        const content = item.querySelector('.ecosystem-content');
        
        // Set initial state
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        
        if (number) {
            number.style.opacity = '0';
            number.style.transform = 'scale(0.5)';
        }
        
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateX(20px)';
        }
        
        const ecosystemItemObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        // Animate the card
                        item.style.transition = 'all 0.8s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        
                        // Animate number with scale
                        if (number) {
                            setTimeout(() => {
                                number.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                                number.style.opacity = '1';
                                number.style.transform = 'scale(1)';
                            }, 200);
                        }
                        
                        // Animate content
                        if (content) {
                            setTimeout(() => {
                                content.style.transition = 'all 0.8s ease';
                                content.style.opacity = '1';
                                content.style.transform = 'translateX(0)';
                            }, 300);
                        }
                    }, index * 150);
                    ecosystemItemObserver.unobserve(entry.target);
                }
            });
        }, fadeObserverOptions);
        
        ecosystemItemObserver.observe(item);
    });

    // Contact Section
    const subscribeColumn = document.querySelector('.subscribe-column');
    const contactColumn = document.querySelector('.contact-column');
    if (subscribeColumn) {
        subscribeColumn.classList.add('fade-in-element', 'fade-in-left');
        fadeInObserver.observe(subscribeColumn);
    }
    if (contactColumn) {
        contactColumn.classList.add('fade-in-element', 'fade-in-right');
        fadeInObserver.observe(contactColumn);
    }
});

// ==================== COUNTER ANIMATION ====================
const statNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (counter) => {
    const text = counter.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
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
    
    const increment = numericValue / (duration / 16);
    let current = 0;
    let startTime = null;

    const updateCounter = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        // Easing function for smooth animation
        const easingProgress = Math.min(progress / duration, 1);
        const easedValue = easingProgress < 0.5
            ? 2 * easingProgress * easingProgress
            : 1 - Math.pow(-2 * easingProgress + 2, 2) / 2;
        
        current = numericValue * easedValue;
        
        if (progress < duration) {
            counter.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = numericValue + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        }
    };
    
    // Store original text and start from 0
    counter.setAttribute('data-original', text);
    counter.textContent = '0' + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
    requestAnimationFrame(updateCounter);
};

const counterObserverOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, counterObserverOptions);

statNumbers.forEach(counter => counterObserver.observe(counter));