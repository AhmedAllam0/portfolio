// ========================================
// Portfolio JavaScript - Interactive Features
// ========================================

// ========== Initialize AOS Animation ========== 
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Initialize other features
    initParticles();
    initTyped();
    initGLightbox();
    initDarkMode();
});

// ========== Loading Screen ========== 
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1000);
});

// ========== Navbar Scroll Effect ========== 
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    // Update reading progress bar
    updateReadingProgress();
});

// ========== Reading Progress Bar ========== 
function updateReadingProgress() {
    const progressBar = document.getElementById('reading-progress');
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// ========== Mobile Menu Toggle ========== 
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
    const icon = this.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ========== Smooth Scroll for Navigation Links ========== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Update Active Nav Link ========== 
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== Portfolio Filter ========== 
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 10);
            } else {
                const category = item.getAttribute('data-category');
                
                if (category === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = 'block';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// ========== Skill Progress Animation ========== 
const skillSection = document.getElementById('skills');
let skillsAnimated = false;

function animateSkills() {
    if (skillsAnimated) return;
    
    const skillProgress = document.querySelectorAll('.skill-progress');
    
    skillProgress.forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0';
        
        setTimeout(() => {
            progress.style.width = width;
        }, 100);
    });
    
    skillsAnimated = true;
}

// Trigger animation when skills section is in viewport
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    skillsObserver.observe(skillSection);
}

// ========== Contact Form Handling with AJAX ========== 
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin ml-2"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // Simulate AJAX request (replace with actual endpoint)
    setTimeout(() => {
        // Success response simulation
        showMessage('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
        contactForm.reset();
        
        // Restore button
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // In production, use actual AJAX:
        /*
        fetch('your-backend-endpoint.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showMessage('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.', 'success');
                contactForm.reset();
            } else {
                showMessage('حدث خطأ في إرسال الرسالة. حاول مرة أخرى.', 'error');
            }
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            showMessage('حدث خطأ في إرسال الرسالة. حاول مرة أخرى.', 'error');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
        */
    }, 2000);
});

// ========== Form Validation ========== 
function validateForm(data) {
    // Name validation
    if (data.name.trim().length < 2) {
        showMessage('الرجاء إدخال اسم صحيح', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('الرجاء إدخال بريد إلكتروني صحيح', 'error');
        return false;
    }
    
    // Subject validation
    if (data.subject.trim().length < 3) {
        showMessage('الرجاء إدخال موضوع الرسالة', 'error');
        return false;
    }
    
    // Message validation
    if (data.message.trim().length < 10) {
        showMessage('الرجاء إدخال رسالة تحتوي على 10 أحرف على الأقل', 'error');
        return false;
    }
    
    return true;
}

// ========== Show Form Message ========== 
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    formMessage.classList.remove('hidden');
    
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
}

// ========== Newsletter Form ========== 
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('الرجاء إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Simulate subscription
    alert('شكراً لاشتراكك في النشرة البريدية!');
    this.reset();
    
    // In production, send to backend:
    /*
    fetch('newsletter-endpoint.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('شكراً لاشتراكك في النشرة البريدية!');
            this.reset();
        }
    });
    */
});

// ========== Scroll to Top Button ========== 
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== Counter Animation ========== 
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Trigger counter animation when stats are in viewport
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-card h4');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ========== Typing Effect for Hero Section ========== 
const typingText = document.querySelector('.animate-fade-in');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 50);
        }
    }
    
    setTimeout(typeText, 500);
}

// ========== Parallax Effect ========== 
window.addEventListener('scroll', function() {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.shapes-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========== Lazy Loading Images ========== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ========== Prevent Right Click on Images (Optional) ========== 
/*
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
});
*/

// ========== Console Message ========== 
console.log('%c🚀 Portfolio Website', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️', 'color: #8b5cf6; font-size: 16px;');
console.log('%cBuilt with: HTML5, CSS3, Tailwind CSS, JavaScript, AJAX', 'color: #ec4899; font-size: 14px;');

// ========== Performance Optimization ========== 
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========== Accessibility Improvements ========== 
// Add keyboard navigation for portfolio items
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.querySelector('.portfolio-btn').click();
        }
    });
});

// ========== Dark Mode Toggle (Optional Feature) ========== 
/*
const darkModeToggle = document.getElementById('dark-mode-toggle');
const htmlElement = document.documentElement;

darkModeToggle.addEventListener('click', function() {
    htmlElement.classList.toggle('dark');
    
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    
    this.querySelector('i').classList.toggle('fa-moon');
    this.querySelector('i').classList.toggle('fa-sun');
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    htmlElement.classList.add('dark');
}
*/

// ========== Analytics Tracking (Placeholder) ========== 
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    
    // In production, integrate with Google Analytics or similar:
    /*
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    */
}

// Track portfolio item clicks
document.querySelectorAll('.portfolio-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const projectName = this.closest('.portfolio-card').querySelector('h3').textContent;
        trackEvent('Portfolio', 'view_project', projectName);
    });
});

// Track form submissions
contactForm.addEventListener('submit', function() {
    trackEvent('Contact', 'form_submit', 'Contact Form');
});

// ========== Particles.js Configuration ========== 
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 400,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ========== Typed.js for Hero Section ========== 
function initTyped() {
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('#typed', {
            strings: [
                'مطور ويب',
                'مصمم واجهات',
                'مطور Full Stack',
                'مصمم UI/UX',
                'مبرمج محترف'
            ],
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// ========== GLightbox for Portfolio Gallery ========== 
function initGLightbox() {
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            closeButton: true,
            zoomable: true,
            draggable: true
        });
    }
}

// ========== Dark Mode Toggle ========== 
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        htmlElement.classList.add('dark');
        updateDarkModeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            htmlElement.classList.toggle('dark');
            const isDark = htmlElement.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            updateDarkModeIcon(isDark);
            
            // Add animation effect
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
}

function updateDarkModeIcon(isDark) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ========== Enhanced Counter Animation with Intersection Observer ========== 
const countersAnimated = new Set();

function createCounterObserver() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated.has(entry.target)) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                animateCounter(counter, target);
                countersAnimated.add(counter);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-card h4').forEach(counter => {
        counter.setAttribute('data-target', parseInt(counter.textContent));
        counterObserver.observe(counter);
    });
}

// Call after DOM loaded
setTimeout(createCounterObserver, 100);

// ========== Smooth Reveal on Scroll ========== 
function revealOnScroll() {
    const reveals = document.querySelectorAll('.service-card, .portfolio-item, .skill-category');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', debounce(revealOnScroll, 50));

// Initialize reveal styles
document.querySelectorAll('.service-card, .portfolio-item, .skill-category').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// ========== Copy Email to Clipboard ========== 
function copyEmail() {
    const email = 'info@portfolio.com';
    navigator.clipboard.writeText(email).then(() => {
        // Show success message
        const emailElement = document.getElementById('email-copy');
        const originalHTML = emailElement.innerHTML;
        emailElement.innerHTML = '<i class="fas fa-check text-green-500"></i> تم النسخ!';
        emailElement.classList.add('text-green-500');
        
        setTimeout(() => {
            emailElement.innerHTML = originalHTML;
            emailElement.classList.remove('text-green-500');
        }, 2000);
    }).catch(err => {
        console.error('فشل النسخ:', err);
    });
}

// ========== Easter Egg - Konami Code ========== 
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
        document.body.style.animation = '';
        alert('🎉 لقد اكتشفت الكود السري! أنت رائع! 🚀');
    }, 2000);
}

// ========== Performance Monitoring ========== 
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('%c⚡ Page Load Time: ' + (pageLoadTime / 1000).toFixed(2) + 's', 'color: #10b981; font-size: 14px;');
    });
}

// ========== Smooth Scroll Behavior Enhancement ========== 
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// ========================================
// 🎨 ADVANCED INTERACTIVE EFFECTS
// ========================================

// ========== Custom Cursor Effect ========== 
const cursor = document.querySelector('.custom-cursor');
const cursorDot = document.querySelector('.custom-cursor-dot');

if (cursor && cursorDot && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following with lag effect
    function animateCursor() {
        const cursorSpeed = 0.15;
        cursorX += (mouseX - cursorX) * cursorSpeed;
        cursorY += (mouseY - cursorY) * cursorSpeed;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        const dotSpeed = 0.25;
        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .portfolio-card, .service-card, .skill-category');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========== Mouse Trail Effect (Canvas) ========== 
const canvas = document.getElementById('canvas-trail');
if (canvas && window.innerWidth > 768) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    const maxParticles = 100;
    
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = `hsl(${Math.random() * 60 + 240}, 70%, 60%)`;
            this.life = 0;
            this.maxLife = 60;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.size *= 0.97;
            this.life++;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 1 - (this.life / this.maxLife);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    document.addEventListener('mousemove', (e) => {
        if (particlesArray.length < maxParticles) {
            particlesArray.push(new Particle(e.clientX, e.clientY));
        }
    });
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
            
            if (particlesArray[i].life >= particlesArray[i].maxLife || particlesArray[i].size < 0.3) {
                particlesArray.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========== Magnetic Button Effect ========== 
const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            const moveX = x * strength * 0.3;
            const moveY = y * strength * 0.3;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ========== Initialize Vanilla Tilt for 3D Effects ========== 
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
        perspective: 1000,
        transition: true,
        easing: "cubic-bezier(.03,.98,.52,.99)"
    });
}

// ========== Ripple Effect on Click ========== 
document.querySelectorAll('.btn, .portfolio-card, .service-card').forEach(element => {
    element.classList.add('ripple-effect');
    
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== Parallax Effect for Achievement Cards ========== 
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        document.querySelectorAll('.achievement-card').forEach((card, index) => {
            const speed = (index + 1) * 0.5;
            card.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });
}

// ========== Scroll Reveal Animation Enhancement ========== 
const scrollRevealElements = document.querySelectorAll('.portfolio-card, .service-card, .skill-category');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

scrollRevealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollObserver.observe(el);
});

// ========== Text Reveal Animation ========== 
const revealTextElements = document.querySelectorAll('.reveal-text');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 1s ease-out';
        }
    });
}, { threshold: 0.5 });

revealTextElements.forEach(el => revealObserver.observe(el));

// ========== Live Indicator Clock ========== 
function initLiveIndicator() {
    const timeElement = document.getElementById('live-time');
    const greetingElement = document.getElementById('live-greeting');
    const indicator = document.querySelector('.live-indicator');
    if (!timeElement || !greetingElement || !indicator) return;
    const formatter = new Intl.DateTimeFormat('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const updateClock = () => {
        const now = new Date();
        timeElement.textContent = formatter.format(now);
        greetingElement.textContent = getArabicGreeting(now.getHours());
    };
    updateClock();
    setInterval(updateClock, 30000);
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            updateClock();
        }
    });
}

function getArabicGreeting(hour) {
    if (hour < 6) return 'ليلة هادئة';
    if (hour < 12) return 'صباح الإلهام';
    if (hour < 17) return 'نهار إبداعي';
    if (hour < 21) return 'مساء متألق';
    return 'ليلة مبهرة';
}

// ========== Theme Lab Palette ========== 
function initThemeLab() {
    const themeLab = document.getElementById('theme-lab');
    const themeToggle = document.getElementById('theme-toggle');
    const themeDots = document.querySelectorAll('.theme-dot');
    const randomButton = document.getElementById('theme-random');
    if (!themeLab || !themeToggle || !themeDots.length) return;
    const THEME_STORAGE_KEY = 'preferredTheme';
    const availableThemes = ['default', 'ocean', 'sunset', 'forest', 'luxe'];
    const themedClasses = availableThemes
        .filter(theme => theme !== 'default')
        .map(theme => `theme-${theme}`);

    function applyTheme(themeName) {
        document.body.classList.remove(...themedClasses);
        if (themeName && themeName !== 'default' && themedClasses.includes(`theme-${themeName}`)) {
            document.body.classList.add(`theme-${themeName}`);
        }
        themeDots.forEach(dot => {
            const isActive = dot.dataset.theme === themeName;
            dot.classList.toggle('active', isActive);
        });
        localStorage.setItem(THEME_STORAGE_KEY, themeName);
        document.dispatchEvent(new CustomEvent('themechange', {
            detail: { theme: themeName }
        }));
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'default';
    const initialTheme = availableThemes.includes(storedTheme) ? storedTheme : 'default';
    applyTheme(initialTheme);

    themeToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        themeLab.classList.toggle('theme-lab--open');
    });

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const selectedTheme = dot.dataset.theme || 'default';
            applyTheme(selectedTheme);
            themeLab.classList.remove('theme-lab--open');
        });
    });

    if (randomButton) {
        randomButton.addEventListener('click', () => {
            const currentTheme = localStorage.getItem(THEME_STORAGE_KEY) || 'default';
            const pool = availableThemes.filter(theme => theme !== currentTheme);
            const surpriseTheme = pool[Math.floor(Math.random() * pool.length)] || 'default';
            applyTheme(surpriseTheme);
        });
    }

    document.addEventListener('click', (event) => {
        if (!themeLab.contains(event.target)) {
            themeLab.classList.remove('theme-lab--open');
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            themeLab.classList.remove('theme-lab--open');
        }
    });
}

// ========== Immersive Soundscape ========== 
function initSoundscape() {
    const hub = document.getElementById('audio-hub');
    const toggle = document.getElementById('audio-toggle');
    const status = document.getElementById('audio-status');
    const ambient = document.getElementById('ambient-audio');
    const chime = document.getElementById('ui-chime');
    if (!hub || !toggle || !status || !ambient) return;

    const SOUND_STORAGE_KEY = 'soundscapeEnabled';
    let enabled = localStorage.getItem(SOUND_STORAGE_KEY) === 'true';
    let userInteracted = false;

    const updateUI = () => {
        hub.classList.toggle('audio-hub--muted', !enabled);
        toggle.setAttribute('aria-pressed', enabled);
        status.textContent = enabled ? 'تتوهج الآن' : 'صامتة';
    };

    const attemptPlayAmbient = async () => {
        if (!enabled) return;
        ambient.volume = 0.6;
        try {
            await ambient.play();
        } catch (err) {
            console.warn('Ambient audio blocked until user interaction.', err);
        }
    };

    toggle.addEventListener('click', () => {
        enabled = !enabled;
        localStorage.setItem(SOUND_STORAGE_KEY, enabled);
        updateUI();
        if (enabled) {
            attemptPlayAmbient();
        } else {
            ambient.pause();
        }
    });

    document.addEventListener('pointerdown', () => {
        if (!userInteracted) {
            userInteracted = true;
            if (enabled) {
                attemptPlayAmbient();
            }
        }
    }, { once: true });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            ambient.pause();
        } else if (enabled) {
            attemptPlayAmbient();
        }
    });

    if (chime) {
        const playChime = () => {
            if (!enabled) return;
            chime.currentTime = 0;
            chime.volume = 0.7;
            chime.play().catch(() => {});
        };
        document.querySelectorAll('[data-sound="chime"]').forEach(element => {
            element.addEventListener('click', playChime);
        });
    }

    updateUI();
    if (enabled) {
        attemptPlayAmbient();
    } else {
        hub.classList.add('audio-hub--muted');
    }
}

// ========== Epic Galaxy Particle System ========== 
function initHologram() {
    if (typeof THREE === 'undefined') return;
    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 50K particle galaxy
    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const getThemeColor = () => {
        const styles = getComputedStyle(document.body);
        const primaryRgb = styles.getPropertyValue('--primary-color-rgb').trim();
        const secondaryRgb = styles.getPropertyValue('--secondary-color-rgb').trim();
        const primary = primaryRgb ? primaryRgb.split(',').map(n => parseInt(n) / 255) : [0.39, 0.4, 0.95];
        const secondary = secondaryRgb ? secondaryRgb.split(',').map(n => parseInt(n) / 255) : [0.54, 0.36, 0.96];
        return { primary, secondary };
    };

    let mode = 'galaxy';
    let autoRotate = true;

    const generateGalaxy = () => {
        const { primary, secondary } = getThemeColor();
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 5;
            const spinAngle = radius * 2;
            const branchAngle = (i % 3) * Math.PI * 2 / 3;
            
            if (mode === 'galaxy') {
                positions[i3] = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 0.5;
                positions[i3 + 1] = (Math.random() - 0.5) * 0.3;
                positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * 0.5;
            } else if (mode === 'sphere') {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos((Math.random() * 2) - 1);
                const r = Math.random() * 3;
                positions[i3] = r * Math.sin(phi) * Math.cos(theta);
                positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
                positions[i3 + 2] = r * Math.cos(phi);
            } else if (mode === 'helix') {
                const angle = i * 0.1;
                const y = (i / particleCount) * 10 - 5;
                positions[i3] = Math.cos(angle) * 2;
                positions[i3 + 1] = y;
                positions[i3 + 2] = Math.sin(angle) * 2;
            }

            const mixedColor = Math.random() > 0.5 ? primary : secondary;
            colors[i3] = mixedColor[0];
            colors[i3 + 1] = mixedColor[1];
            colors[i3 + 2] = mixedColor[2];
        }
    };

    generateGalaxy();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Controls
    document.querySelector('[data-action="rotate"]')?.addEventListener('click', () => {
        autoRotate = !autoRotate;
    });

    document.querySelector('[data-action="explode"]')?.addEventListener('click', () => {
        if (typeof anime !== 'undefined') {
            anime({
                targets: particles.scale,
                x: [1, 3, 1],
                y: [1, 3, 1],
                z: [1, 3, 1],
                duration: 2000,
                easing: 'easeInOutQuad'
            });
        }
    });

    document.querySelector('[data-action="morph"]')?.addEventListener('click', () => {
        const modes = ['galaxy', 'sphere', 'helix'];
        const currentIndex = modes.indexOf(mode);
        mode = modes[(currentIndex + 1) % modes.length];
        generateGalaxy();
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.color.needsUpdate = true;
    });

    // FPS Counter
    let lastTime = performance.now();
    let frames = 0;
    const fpsDisplay = document.getElementById('fps-count');
    const particleDisplay = document.getElementById('particle-count');
    if (particleDisplay) particleDisplay.textContent = particleCount.toLocaleString();

    // Resize
    const resizeRenderer = () => {
        const width = canvas.clientWidth || 800;
        const height = canvas.clientHeight || 450;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    resizeRenderer();
    window.addEventListener('resize', resizeRenderer);

    // Theme sync
    document.addEventListener('themechange', () => {
        generateGalaxy();
        geometry.attributes.color.needsUpdate = true;
    });

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        if (autoRotate) {
            particles.rotation.y += 0.001;
        }
        
        particles.rotation.x += mouseY * 0.0005;
        particles.rotation.y += mouseX * 0.0005;

        frames++;
        const currentTime = performance.now();
        if (currentTime >= lastTime + 1000) {
            if (fpsDisplay) fpsDisplay.textContent = frames;
            frames = 0;
            lastTime = currentTime;
        }

        renderer.render(scene, camera);
    };
    animate();
}

// ========== Cinematic Story with GSAP ========== 
function initStoryMode() {
    const chapters = document.querySelectorAll('.story-chapter');
    if (!chapters.length) return;

    // Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({ 
            duration: 1.2, 
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // GSAP ScrollTrigger animations
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);

        chapters.forEach((chapter) => {
            const number = chapter.querySelector('.story-chapter__number');
            const titleSpans = chapter.querySelectorAll('.story-chapter__title span');
            const desc = chapter.querySelector('.story-chapter__desc');
            const features = chapter.querySelectorAll('.story-feature');
            const particles = chapter.querySelector('.story-chapter__particles');

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: chapter,
                    start: 'top center',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse',
                    onEnter: () => chapter.classList.add('active'),
                    onLeave: () => chapter.classList.remove('active'),
                    onEnterBack: () => chapter.classList.add('active'),
                    onLeaveBack: () => chapter.classList.remove('active')
                }
            });

            tl.from(number, { scale: 0, opacity: 0, duration: 0.8, ease: 'power3.out' })
              .from(titleSpans, { y: 100, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
              .from(desc, { y: 50, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
              .from(features, { scale: 0, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' }, '-=0.3');

            if (particles) {
                gsap.to(particles, {
                    scrollTrigger: {
                        trigger: chapter,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    },
                    y: -100,
                    ease: 'none'
                });
            }
        });
    } else {
        // Fallback for IntersectionObserver
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('active', entry.isIntersecting);
            });
        }, { threshold: 0.4 });
        chapters.forEach(chapter => observer.observe(chapter));
    }

    // Anime.js micro-interactions
    if (typeof anime !== 'undefined') {
        document.querySelectorAll('.story-feature').forEach(feature => {
            feature.addEventListener('mouseenter', () => {
                anime({
                    targets: feature,
                    scale: 1.1,
                    duration: 300,
                    easing: 'spring(1, 80, 10, 0)'
                });
            });
            feature.addEventListener('mouseleave', () => {
                anime({
                    targets: feature,
                    scale: 1,
                    duration: 300,
                    easing: 'spring(1, 80, 10, 0)'
                });
            });
        });
    }
}

// ========== Initialize Everything ========== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚀 Portfolio Website ULTRA Enhanced!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%c✨ Advanced Features:', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    console.log('%c  ✓ Dark Mode Toggle', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Particles.js Background', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Typed.js Animations', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ GLightbox Gallery', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Reading Progress Bar', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Custom Cursor Effect', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ Mouse Trail Canvas', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ Magnetic Buttons', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ 3D Tilt Cards (18+)', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ Ripple Click Effect', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ Parallax Movement', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ Text Reveal Animations', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ Scroll Reveal Effects', 'color: #10b981; font-size: 14px;');
    console.log('%c  ✓ SEO Optimized', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cDeveloped with ❤️ & Magic ✨', 'color: #ec4899; font-size: 16px;');
    console.log('%cTip: Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #fbbf24; font-size: 12px;');
    
    initThemeLab();
    initSoundscape();
    initLiveIndicator();
    initHologram();
    initStoryMode();

    // Add loaded class for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
