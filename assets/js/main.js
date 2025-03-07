/* ==========================================================================
   CLIX HOUSE - Core Functionality
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    // Core initialization
    initializeLanguageToggle();
    initializeDarkMode();
    initializeNavigation();
    initializeCustomCursor();
    initializePageTransitions();
    initializeScrollAnimations();
    initializeReturnToTop();
});

// Language Toggle 
function initializeLanguageToggle() {
    const htmlElement = document.documentElement;
    const languageButtons = document.querySelectorAll('.language-btn');
    const languageIndicator = document.querySelector('.language-indicator');
    
    // Set initial language or use browser preference
    const savedLanguage = localStorage.getItem('clixhouseLanguage') || 'en';
    htmlElement.setAttribute('lang', savedLanguage);
    
    // Set active state on the correct button
    languageButtons.forEach(button => {
        if (button.getAttribute('data-lang') === savedLanguage) {
            button.classList.add('active');
            if (languageIndicator) {
                const isSpanish = savedLanguage === 'es';
                languageIndicator.style.transform = isSpanish ? 'translateX(100%)' : 'translateX(0)';
            }
        }
    });
    
    // Add event listeners
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            htmlElement.setAttribute('lang', lang);
            localStorage.setItem('clixhouseLanguage', lang);
            
            // Update active button
            languageButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Move indicator
            if (languageIndicator) {
                if (lang === 'en') {
                    languageIndicator.style.transform = 'translateX(0)';
                } else {
                    languageIndicator.style.transform = 'translateX(100%)';
                }
            }
        });
    });
}

// Dark Mode Toggle
function initializeDarkMode() {
    const modeToggle = document.querySelector('.mode-toggle');
    const body = document.body;
    
    // Check for saved preference
    const savedMode = localStorage.getItem('clixhouseDarkMode');
    if (savedMode === 'true') {
        body.classList.add('dark-mode');
    }
    
    if (modeToggle) {
        modeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            localStorage.setItem('clixhouseDarkMode', body.classList.contains('dark-mode'));
        });
    }
}

// Navigation Functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    
    // Handle mobile nav toggle
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMobile.classList.toggle('active');
        });
    }
    
    // Mobile navigation links
    const navLinks = document.querySelectorAll('.nav-mobile-link, .nav-link');
    
    navLinks.forEach(link => {
        // Handle anchor links for smooth scrolling within the same page
        link.addEventListener('click', function(e) {
            if (link.hasAttribute('href')) {
                const href = link.getAttribute('href');
                
                // If it's an anchor link on the current page
                if (href.startsWith('#') && document.querySelector(href)) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        // Close mobile nav if open
                        if (navToggle && navMobile) {
                            navToggle.classList.remove('active');
                            navMobile.classList.remove('active');
                        }
                        
                        // Smooth scroll to target
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                // If it's a page transition link
                else if (href !== '#' && !href.startsWith('http')) {
                    e.preventDefault();
                    handlePageTransition(href);
                }
            }
        });
    });
    
    // Set active nav link based on current page
    setActiveNavLink();
}

// Mark the current page's nav link as active
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Home page special case
        if (currentPath === '/' || currentPath === '/index.html') {
            if (href === '/' || href === '/index.html' || href === '#') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
        // Other pages
        else if (href && currentPath.includes(href) && href !== '/' && href !== '#') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Custom Cursor
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
                cursorFollower.style.opacity = '1';
            }, 100);
        });
        
        document.addEventListener('mouseout', function() {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .work-item, .nav-link, .nav-mobile-link, .form-submit');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursorFollower.classList.add('cursor-hover');
            });
            
            el.addEventListener('mouseleave', function() {
                cursorFollower.classList.remove('cursor-hover');
            });
        });
    }
}

// Page Transitions
function initializePageTransitions() {
    const transitionElement = document.createElement('div');
    transitionElement.className = 'page-transition';
    document.body.appendChild(transitionElement);
    
    // Hide transition element after page load
    window.addEventListener('load', function() {
        setTimeout(() => {
            revealPageContent();
        }, 200);
    });
}

function handlePageTransition(targetUrl) {
    const transitionElement = document.querySelector('.page-transition');
    
    if (transitionElement) {
        // Activate transition
        transitionElement.classList.add('active');
        
        // Wait for animation then navigate
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 600);
    } else {
        // Fallback if transition element doesn't exist
        window.location.href = targetUrl;
    }
}

function revealPageContent() {
    // Reveal animations for hero section
    const taglineTexts = document.querySelectorAll('.hero-tagline-text');
    const heroDescription = document.querySelector('.hero-description');
    const heroButton = document.querySelector('.hero-button');
    
    if (taglineTexts.length > 0) {
        setTimeout(() => {
            taglineTexts.forEach((text, index) => {
                setTimeout(() => {
                    text.classList.add('revealed');
                }, index * 200);
            });
            
            setTimeout(() => {
                if (heroDescription) heroDescription.classList.add('revealed');
                
                setTimeout(() => {
                    if (heroButton) heroButton.classList.add('revealed');
                }, 200);
            }, taglineTexts.length * 200 + 100);
        }, 500);
    }
    
    // Initial animations for page-specific elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('revealed');
        }, 800 + (index * 100));
    });
}

// Scroll Animations
function initializeScrollAnimations() {
    // Intersection Observer options
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Section title reveals
    const sectionTitles = document.querySelectorAll('.text-reveal');
    
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                titleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });

    // Generic elements to reveal on scroll
    const revealElements = document.querySelectorAll('.stagger-item');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                elementObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    revealElements.forEach(item => {
        elementObserver.observe(item);
    });
    
    // Add parallax effect to images with the parallax class
    const parallaxImages = document.querySelectorAll('.parallax-image');
    
    if (parallaxImages.length > 0) {
        window.addEventListener('scroll', function() {
            parallaxImages.forEach(image => {
                const container = image.closest('.parallax-container');
                if (container) {
                    const containerTop = container.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    const offset = containerTop / windowHeight;
                    
                    // Apply the parallax effect
                    image.style.transform = `translateY(${offset * 50}px)`;
                }
            });
        });
    }
}

// Return to Top Button
function initializeReturnToTop() {
    const returnTop = document.querySelector('.return-top');
    
    if (returnTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > window.innerHeight) {
                returnTop.classList.add('visible');
            } else {
                returnTop.classList.remove('visible');
            }
        });
        
        returnTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}