// ============================================
// KARMANYA INFOTECH - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            let isValid = true;
            const errors = [];

            // Get form fields
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const mobile = document.getElementById('mobile');
            const organizationName = document.getElementById('organizationName');
            const organizationType = document.getElementById('organizationType');
            const serviceInterested = document.getElementById('serviceInterested');
            const message = document.getElementById('message');

            // Validate full name
            if (fullName.value.trim().length < 2) {
                errors.push('Full name must be at least 2 characters');
                fullName.classList.add('error');
                isValid = false;
            } else {
                fullName.classList.remove('error');
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                errors.push('Please enter a valid email address');
                email.classList.add('error');
                isValid = false;
            } else {
                email.classList.remove('error');
            }

            // Validate mobile
            const mobileRegex = /^[6-9]\d{9}$/;
            if (!mobileRegex.test(mobile.value.trim())) {
                errors.push('Please enter a valid 10-digit Indian mobile number');
                mobile.classList.add('error');
                isValid = false;
            } else {
                mobile.classList.remove('error');
            }

            // Validate organization name
            if (organizationName.value.trim().length < 2) {
                errors.push('Organization name must be at least 2 characters');
                organizationName.classList.add('error');
                isValid = false;
            } else {
                organizationName.classList.remove('error');
            }

            // Validate organization type
            if (!organizationType.value) {
                errors.push('Please select an organization type');
                organizationType.classList.add('error');
                isValid = false;
            } else {
                organizationType.classList.remove('error');
            }

            // Validate service interested
            if (!serviceInterested.value) {
                errors.push('Please select a service');
                serviceInterested.classList.add('error');
                isValid = false;
            } else {
                serviceInterested.classList.remove('error');
            }

            // Validate message
            if (message.value.trim().length < 10) {
                errors.push('Message must be at least 10 characters');
                message.classList.add('error');
                isValid = false;
            } else {
                message.classList.remove('error');
            }

            // If validation fails, prevent submission and show errors
            if (!isValid) {
                e.preventDefault();

                // Scroll to first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });

        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('error');
            });
        });
    }

    // ===== ABOUT PAGE TABS =====
    const mvTabs = document.querySelectorAll('.mv-tab');
    if (mvTabs.length > 0) {
        mvTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                mvTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                // Optional: visual feedback or content change if configured
                // currently the design shows content inside the tab, so just styling changes
            });
        });
    }

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .module-card, .benefit-card, .glass-value-card, .team-glass-card, .stat-premium-box, .module-pro-card, .stat-modern-card');
    animateElements.forEach((el, index) => {
        // Add staggered delay for grid items
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        el.classList.add('fade-up-element'); // Add base class for animation
        observer.observe(el);
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header'); // Changed from let lastScroll to just header const as lastScroll wasn't used effectively in the snippet replacmeent context, assuming standard logic.

    if (header) {
        window.addEventListener('scroll', function () {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
                header.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            } else {
                header.classList.remove('scrolled');
                header.style.boxShadow = "none";
            }
        });
    }

    // ===== LAZY LOADING IMAGES =====
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===== CONSOLE MESSAGE =====
    console.log('%c🚀 Karmanya Infotech Website', 'font-size: 20px; font-weight: bold; color: #1e40af;');
    console.log('%cBuilt with ❤️ by Karmanya Infotech Pvt. Ltd.', 'font-size: 14px; color: #f97316;');
    console.log('%cInterested in our services? Visit: karmanyainfotech.com', 'font-size: 12px; color: #6b7280;');
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
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

// Format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return match[1] + '-' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}
