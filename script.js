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

// ========== Initialize Everything ========== 
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚀 Portfolio Website Enhanced!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
    console.log('%c✨ Features:', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
    console.log('%c  ✓ Dark Mode Toggle', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Particles.js Background', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Typed.js Animations', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ GLightbox Gallery', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Reading Progress Bar', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ Enhanced Animations', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c  ✓ SEO Optimized', 'color: #8b5cf6; font-size: 14px;');
    console.log('%cDeveloped with ❤️', 'color: #ec4899; font-size: 16px;');
    console.log('%cTip: Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #fbbf24; font-size: 12px;');
});
